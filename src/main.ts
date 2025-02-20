import { checkCompat } from "./browser-support";
import { doTimes, noiseSourcesNeeded } from "./css-manager";
import { classCounts, generateStyles } from "./dynamic-styles";
import { musicLibrary } from "./music-library";
import { attachPlayer } from "./player";
import "./style.css";
import { setShape, setSpeed, startAnimation } from "./three";

checkCompat();

generateStyles();

const player = document.querySelector("#audio") as HTMLMediaElement;
attachPlayer(player);
const context = new AudioContext();
const source = context.createMediaElementSource(player);

const analyzer = new AnalyserNode(context, { fftSize: 64 });
analyzer.maxDecibels = -6;
analyzer.minDecibels = -40;
function createFilter() {
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 80;
  filter.Q.value = 1;
  return filter;
}

const filter = createFilter();
source.connect(filter);
source.connect(context.destination);
// filter.connect(context.destination);
filter.connect(analyzer);
let currentBoost = 1;
for (const [_key, song] of Object.entries(musicLibrary)) {
  const li = document.createElement("li");
  li.className = "hover:trans";
  const button = document.createElement("button");
  button.textContent = `> ${song.name}`;
  button.onclick = () => {
    currentBoost = song.boost ?? 1;
    player.src = song.link;
    player.play();
    context.resume();
  };
  li.appendChild(button);
  document.querySelector(".player .list")!.appendChild(li);
}

export let f = 0;
export let smoothF = 0;

function update() {
  const data = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(data);
  f = (Math.max(...data) / 255) ** 3 * currentBoost;
  smoothF = Math.max((smoothF * 9 + f) / 10, 0.0001);

  document.body.style.setProperty("--f", f.toString());
  document.body.style.setProperty("--smooth-f", smoothF.toString());
  const noise = () => Math.random() * f;
  const halfnoise = () => (Math.random() * f - Math.random() * f) / 2;
  const genNoise = (n: number) =>
    document.body.style.setProperty(`--noise${n}`, noise().toString());
  const genHalfNoise = (n: number) =>
    document.body.style.setProperty(`--halfnoise${n}`, halfnoise().toString());

  doTimes(noiseSourcesNeeded.half, genHalfNoise);
  doTimes(noiseSourcesNeeded.full, genNoise);

  requestAnimationFrame(update);
}
update();

// doesn't have children, except for text nodes
document.querySelectorAll("*:not(:has(*))").forEach((el, i) => {
  // if svg path, skip
  if (el.tagName === "path") {
    return;
  }
  // check if already has shakeN class
  if ([...el.classList].some((c) => c.includes("shake"))) {
    return;
  }
  const noiseN = (i % classCounts.shake) + 1;
  el.classList.add(`shake${noiseN}`);
});

// epileptic mode
(document.querySelector("#epileptic") as HTMLInputElement).onchange = (e) => {
  document.body.classList.toggle(
    "i-am-epileptic",
    (e.target as HTMLInputElement).checked
  );
};

// attach a key listener to pause on space
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }
});

document.querySelectorAll("button[data-shape]").forEach((el) => {
  el.addEventListener("click", () => {
    // @ts-ignore
    setShape(el.getAttribute("data-shape"));
  });
});

document.querySelector("#speed")!.addEventListener("input", (e) => {
  let v = (e.target as HTMLInputElement).valueAsNumber;
  v = v ** 2;
  setSpeed(v);
});

startAnimation(
  () => f,
  () => smoothF
);

const playpause = document.getElementById("playpause") as HTMLButtonElement;
const seek = document.getElementById("seek") as HTMLInputElement;
const currentTime = document.getElementById("current-time") as HTMLSpanElement;
const totalTime = document.getElementById("total-time") as HTMLSpanElement;

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const str = `${minutes}:${String(seconds).padStart(2, "0")}`;
  return str.includes("NaN") ? "-" : str;
}

export function attachPlayer(player: HTMLAudioElement) {
  function update() {
    currentTime.textContent = formatTime(player.currentTime);
    totalTime.textContent = formatTime(player.duration);
    seek.value = player.currentTime.toString();
    playpause.textContent = player.paused ? "▷" : "l l";

    requestAnimationFrame(update);
  }

  playpause.onclick = () => {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  };

  seek.oninput = () => {
    player.currentTime = Number(seek.value);
  };

  player.ontimeupdate = () => {
    seek.value = player.currentTime.toString();
    currentTime.textContent = formatTime(player.currentTime);
  };

  player.onloadedmetadata = () => {
    seek.max = player.duration.toString();
    totalTime.textContent = formatTime(player.duration);
  };

  update();
}

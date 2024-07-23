const styleElement = document.getElementById("css-manager") as HTMLStyleElement;
styleElement.innerHTML = "";

export const noiseSourcesNeeded = {
  half: 1,
  full: 2,
};

export function createShakeClass(n: number) {
  noiseSourcesNeeded.half++;
  styleElement.innerHTML += `
    .shake${n} {
        transform: translate(
            calc(25px * var(--halfnoise${n})),
            calc(25px * var(--halfnoise${n + 1}))
        )
        scale(calc(1 - var(--f) * 0.1));
    }
    `;
}

export const doTimes = (n: number, fn: (n: number) => unknown) => {
  for (let i = 1; i <= n; i++) {
    fn(i);
  }
};

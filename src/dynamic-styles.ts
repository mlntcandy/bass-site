import { createShakeClass, doTimes } from "./css-manager";

export const classCounts = {
  shake: 8,
};

export function generateStyles() {
  doTimes(classCounts.shake, createShakeClass);
}

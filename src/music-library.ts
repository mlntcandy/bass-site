import chilltrapbeat from "../music/chilltrapbeat.mp3";
import fnsbaby_nightcore from "../music/fnsbaby_nightcore.mp3";
import zal from "../music/zal.mp3";
import philip_morris from "../music/philip_morris.mp3";
import penis from "../music/penis.mp3";
import heroIn from "../music/hero_in.mp3";
import belyash from "../music/belyash.mp3";
import soulhurt from "../music/soulhurt.mp3";

export const musicLibrary: {
  [key: string]: {
    name: string;
    link: string;
    boost?: number;
  };
} = {
  chilltrapbeat: {
    name: 'Chill Trap Beat (Makin\' a Bass - Big Black Alex "Zhiguli" Remix)',
    link: chilltrapbeat,
  },
  fnsbaby_nightcore: {
    name: "FNS Baby (Nightcore Ver.)",
    link: fnsbaby_nightcore,
  },
  zal: { name: "Zal", link: zal, boost: 1.5 },
  philip_morris: {
    name: "Philip Morris Cigarettes Watermelon Flavored",
    link: philip_morris,
  },
  penis: { name: "Penis", link: penis },
  heroIn: { name: "Hero In", link: heroIn },
  belyash: { name: "Belyash Tearout Dubstep", link: belyash, boost: 1.5 },
  soulhurt: {
    name: "Soul Hurt (Evil Demon Phonk Metal Trap Shit)",
    link: soulhurt,
    boost: 1.7,
  },
};

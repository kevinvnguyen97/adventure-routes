import type { JSX } from "react";
import {
  LuMusic,
  LuSandwich,
  LuVolleyball,
  LuLaugh,
  LuFilm,
} from "react-icons/lu";

type DefaultActivity = {
  icon: JSX.Element;
  text: string;
};
export const defaultActivities: DefaultActivity[] = [
  { icon: <LuMusic />, text: "Music" },
  { icon: <LuSandwich />, text: "Food/Drink" },
  { icon: <LuVolleyball />, text: "Sports" },
  { icon: <LuLaugh />, text: "Comedy" },
  { icon: <LuFilm />, text: "Movies" },
];

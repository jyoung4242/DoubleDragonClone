// resources.ts
import { ImageSource, Loader, Sprite, SpriteSheet } from "excalibur";
import tutorialLevel from "./Assets/level1DD.png"; // replace this
import playerWalk from "./Assets/player Walk SS.png"; // replace this
import playerPunch from "./Assets/playerPunch.png";
import playerLadder from "./Assets/playerLadder.png";
import redbarrel from "./Assets/redbarrel.png";

export const Resources = {
  tutorialLevel: new ImageSource(tutorialLevel),
  playerWalk: new ImageSource(playerWalk),
  playerPunch: new ImageSource(playerPunch),
  playerLadder: new ImageSource(playerLadder),
  redbarrel: new ImageSource(redbarrel),
};

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}

// main.ts
import "./style.css";
import { GamepadManager } from "./Lib/Gamepad";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, Color } from "excalibur";
import { model, template } from "./UI/UI";
import { KeyboardManager } from "./Lib/Keyboard";
import { TutorialSection1 } from "./Scenes/TutorialSection1";

import { loader } from "./resources";

await UI.create(document.body, model, template).attached;

const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  backgroundColor: Color.Gray,
  pixelArt: true,
  scenes: { tutScene1: { scene: TutorialSection1 } },
});

const gamepad = new GamepadManager(game, 0.4);
const keyboard = new KeyboardManager(game, 0.4);

await game.start(loader);
game.goToScene("tutScene1", { sceneActivationData: { gpad: gamepad, kman: keyboard } });

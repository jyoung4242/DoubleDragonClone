// main.ts
import "./style.css";
import { GamepadManager, GamepadSignal } from "./Lib/Gamepad";
import { ExFSM, ExState, FSMResult } from "./Lib/ExFSM";

import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, Keys } from "excalibur";
import { model, template } from "./UI/UI";
import { KeyboardManager, KeyboardSignal } from "./Lib/Keyboard";

await UI.create(document.body, model, template).attached;

const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
});

await game.start();
const gamepad = new GamepadManager(game, 0.4);
const keyboard = new KeyboardManager(game);

GamepadSignal.listen((event: CustomEvent) => {
  // event.detail.params contains [gamepadIndex, type, ...data]
  const [gpIndex, type, ...data] = event.detail.params;

  if (type === "buttonPressed") {
    const [buttonIndex] = data;
    console.log(`Gamepad ${gpIndex}: Button ${buttonIndex} pressed`);
  } else if (type === "buttonHeld") {
    const [buttonIndex] = data;
    // Optional: handle continuous holding
    console.log(`Gamepad ${gpIndex}: Button ${buttonIndex} held`);
  } else if (type === "buttonReleased") {
    const [buttonIndex] = data;
    console.log(`Gamepad ${gpIndex}: Button ${buttonIndex} released`);
  } else if (type === "leftStick" || type === "rightStick") {
    const [dir] = data;
    console.log(`Gamepad ${gpIndex}: ${type} direction=${dir}`);
  }
});

game.onPreUpdate = (engine: Engine, elapsed: number) => {
  gamepad.update(elapsed);
  keyboard.update(elapsed);
};

KeyboardSignal.listen((data: CustomEvent) => {
  const [type, key] = data.detail.params;
  console.log(type, key);
});

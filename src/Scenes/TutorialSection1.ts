import { Axis, Engine, Scene, SceneActivationContext, vec } from "excalibur";
import { Player } from "../Actors/Player";
import { TutorialLevel } from "../Actors/TutorialLevel";
import { GamepadManager } from "../Lib/Gamepad";
import { KeyboardManager } from "../Lib/Keyboard";

export class TutorialSection1 extends Scene {
  gpad: GamepadManager | undefined;
  kman: KeyboardManager | undefined;
  map: TutorialLevel;
  constructor() {
    super();
    this.map = new TutorialLevel();
    this.add(this.map);
    this.add(new Player());
  }

  onActivate(context: SceneActivationContext<{ gpad: GamepadManager; kman: KeyboardManager }>): void {
    this.gpad = context.data!.gpad;
    this.kman = context.data!.kman;
    this.camera.zoom = 2.5;
    this.camera.strategy.lockToActorAxis(this.map, Axis.Y);
    this.camera.pos = vec(125, 0);
  }

  onInitialize(engine: Engine): void {}

  onPreUpdate(engine: Engine, elapsed: number): void {
    if (!this.gpad || !this.kman) return;
    this.gpad.update(elapsed);
    this.kman.update(elapsed);
  }
}

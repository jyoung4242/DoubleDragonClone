import {
  Actor,
  Sprite,
  SpriteSheet,
  Vector,
  Animation,
  AnimationStrategy,
  vec,
  Engine,
  CollisionType,
  Collider,
  CollisionContact,
  Side,
} from "excalibur";
import { Resources } from "../resources";
import { AnimationComponent } from "../Components/AnimationComponent";
import { Signal } from "../Lib/Signals";
import { ExFSM } from "../Lib/ExFSM";
import { playerCollider } from "../ColliderGroups";

//#region Player Animations

const playerWalkSS = SpriteSheet.fromImageSource({
  image: Resources.playerWalk,
  grid: {
    rows: 1,
    columns: 3,
    spriteWidth: 36,
    spriteHeight: 48,
  },
});

const playerPunchSS = SpriteSheet.fromImageSource({
  image: Resources.playerPunch,
  grid: {
    rows: 2,
    columns: 4,
    spriteWidth: 36,
    spriteHeight: 48,
  },
});

const playerLadderSS = SpriteSheet.fromImageSource({
  image: Resources.playerLadder,
  grid: {
    rows: 1,
    columns: 2,
    spriteWidth: 36,
    spriteHeight: 48,
  },
});

const ladderAnimation = new Animation({
  frames: [
    {
      graphic: playerLadderSS.getSprite(0, 0),
      duration: 100,
    },
    {
      graphic: playerLadderSS.getSprite(1, 0),
      duration: 100,
    },
  ],
  strategy: AnimationStrategy.Loop,
});

const walkAnimation = new Animation({
  frames: [
    {
      graphic: playerWalkSS.getSprite(0, 0),
      duration: 100,
    },
    {
      graphic: playerWalkSS.getSprite(1, 0),
      duration: 100,
    },
    {
      graphic: playerWalkSS.getSprite(2, 0),
      duration: 100,
    },
  ],
  strategy: AnimationStrategy.Loop,
});

const idleAnimation = new Animation({
  frames: [
    {
      graphic: playerWalkSS.getSprite(0, 0),
      duration: 100,
    },
  ],
  strategy: AnimationStrategy.Loop,
});

const punch1AnimationRight = new Animation({
  frames: [
    {
      graphic: playerPunchSS.getSprite(0, 0),
      duration: 100,
    },
    {
      graphic: playerPunchSS.getSprite(1, 0),
      duration: 100,
    },
  ],
  strategy: AnimationStrategy.Freeze,
});

const punch1AnimationLeft = punch1AnimationRight.clone();
punch1AnimationLeft.flipHorizontal = true;

const punch2AnimationRight = new Animation({
  frames: [
    {
      graphic: playerPunchSS.getSprite(2, 0),
      duration: 100,
    },
    {
      graphic: playerPunchSS.getSprite(3, 0),
      duration: 100,
    },
  ],
  strategy: AnimationStrategy.Freeze,
});

const punch2AnimationLeft = punch2AnimationRight.clone();
punch2AnimationLeft.flipHorizontal = true;

const upperCutRightAnimation = new Animation({
  frames: [
    {
      graphic: playerPunchSS.getSprite(0, 1),
      duration: 100,
    },
    {
      graphic: playerPunchSS.getSprite(1, 1),
      duration: 100,
    },
    {
      graphic: playerPunchSS.getSprite(2, 1),
      duration: 400,
    },
  ],
  strategy: AnimationStrategy.Freeze,
});

const upperCutLeftAnimation = upperCutRightAnimation.clone();
upperCutLeftAnimation.flipHorizontal = true;

const leftIdleAnimation = idleAnimation.clone();
leftIdleAnimation.flipHorizontal = true;

const leftWalkAnimation = walkAnimation.clone();
leftWalkAnimation.flipHorizontal = true;

//#endregion Player Animations

export class Player extends Actor {
  colliders: Collider[] = [];
  direction: "Left" | "Right" = "Right";
  speed: number = 65;
  GamePadSignal = new Signal("gamepad");
  ac: AnimationComponent<
    | "idleRight"
    | "walkRight"
    | "idleLeft"
    | "walkLeft"
    | "punch1Right"
    | "punch2Right"
    | "punch1Left"
    | "punch2Left"
    | "upperCutRight"
    | "upperCutLeft"
    | "ladder"
  >;

  fsm: ExFSM = new ExFSM();

  //PlayerState
  private isAttacking: boolean = false;
  private comboStep: number = 0;
  private comboTimer: number = 0;
  private comboWindow: number = 400;
  private stepTimer: number = 0;

  // durations for each punch step
  private punch1Duration = 250;
  private punch2Duration = 250;
  private uppercutDuration = 350;

  constructor() {
    super({
      name: "Player",
      width: 24,
      height: 48,
      z: 1,
      anchor: Vector.Half,
      pos: vec(371, 20),
      collisionType: CollisionType.Active,
      collisionGroup: playerCollider,
    });

    this.ac = new AnimationComponent({
      idleRight: idleAnimation,
      walkRight: walkAnimation,
      idleLeft: leftIdleAnimation,
      walkLeft: leftWalkAnimation,
      punch1Right: punch1AnimationRight,
      punch2Right: punch2AnimationRight,
      punch1Left: punch1AnimationLeft,
      punch2Left: punch2AnimationLeft,
      upperCutRight: upperCutRightAnimation,
      upperCutLeft: upperCutLeftAnimation,
      ladder: ladderAnimation,
    });

    this.addComponent(this.ac);
    this.ac.set("idleRight");

    this.GamePadSignal.listen((event: CustomEvent) => {
      const [gpIndex, type, ...data] = event.detail.params;

      if (type === "buttonPressed") {
        this.isAttacking = true;
        if (data[0] === 0) {
          this.handlePunch();
        }
      } else if (type === "buttonHeld") {
        console.log(`Gamepad ${gpIndex}: Button ${data[0]} held`);
      } else if (type === "buttonReleased") {
        console.log(`Gamepad ${gpIndex}: Button ${data[0]} released`);
      } else if (type === "leftStick") {
        // Only lock out movement if punch animation still playing

        if (this.fsm.get().value!.name.startsWith("attack")) {
          this.vel = vec(0, 0); // lock out during attack
          return;
        }
        const direction = data[0];

        switch (direction) {
          case "up":
            this.vel.y = -this.speed;
            this.vel.x = 0;
            if (this.fsm.get().value!.name === "ladderClimb") this.ac.set("ladder");
            else this.ac.set(`walk${this.direction}`);
            break;
          case "down":
            this.vel.y = this.speed;
            this.vel.x = 0;
            if (this.fsm.get().value!.name === "ladderClimb") this.ac.set("ladder");
            else this.ac.set(`walk${this.direction}`);
            break;
          case "left":
            this.direction = "Left";
            this.vel.x = -this.speed;
            this.vel.y = 0;
            this.ac.set(`walk${this.direction}`);
            break;
          case "right":
            this.direction = "Right";
            this.vel.x = this.speed;
            this.vel.y = 0;
            if (this.fsm.get().value!.name === "ladderClimb") this.ac.set("ladder");
            else this.ac.set(`walk${this.direction}`);
            break;
          case "upLeft":
            this.direction = "Left";
            this.vel.x = -this.speed;
            this.vel.y = -this.speed;
            if (this.fsm.get().value!.name === "ladderClimb") this.ac.set("ladder");
            else this.ac.set(`walk${this.direction}`);
            break;
          case "upRight":
            this.direction = "Right";
            this.vel.x = this.speed;
            this.vel.y = -this.speed;
            if (this.fsm.get().value!.name === "ladderClimb") this.ac.set("ladder");
            else this.ac.set(`walk${this.direction}`);
            break;
          case "downLeft":
            this.direction = "Left";
            this.vel.x = -this.speed;
            this.vel.y = this.speed;
            if (this.fsm.get().value!.name === "ladderClimb") this.ac.set("ladder");
            else this.ac.set(`walk${this.direction}`);
            break;
          case "downRight":
            this.direction = "Right";
            this.vel.x = this.speed;
            this.vel.y = this.speed;
            this.ac.set(`walk${this.direction}`);
            break;
          case "idle":
            this.ac.set(`idle${this.direction}`);
            this.vel = vec(0, 0);
            break;
        }
      }
    });

    this.fsm.register("idle", "walk", "attackStep1", "attackStep2", "attackStep3", "recovery", "ladderClimb");
    this.fsm.set("idle");
  }

  private handlePunch() {
    switch (this.fsm.get().value!.name) {
      case "idle":
      case "walk":
        this.fsm.set("attackStep1");
        this.playAttack("punch1", this.punch1Duration, "attackStep2");
        break;

      case "attackStep1":
        if (this.comboTimer > 0) {
          this.fsm.set("attackStep2");
          this.playAttack("punch2", this.punch2Duration, "attackStep3");
        }
        break;

      case "attackStep2":
        if (this.comboTimer > 0) {
          this.fsm.set("attackStep3");
          this.playAttack("upperCut", this.uppercutDuration, "idle");
        }
        break;
    }

    this.comboTimer = this.comboWindow; // refresh window
  }

  private playAttack(name: "idle" | "punch1" | "punch2" | "upperCut", duration: number, next: string) {
    this.ac.set(`${name}${this.direction}`);
    this.vel = vec(0, 0); // lock movement instantly
    this.isAttacking = true; // flag for other systems if needed

    this.stepTimer = duration;
    setTimeout(() => {
      this.isAttacking = false;
      this.fsm.set(next); // go to next state or back to idle
      if (this.fsm.get().value!.name === "idle") {
        this.ac.set(`idle${this.direction}`);
      }
    }, duration);
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    engine.currentScene.camera.pos.x = this.pos.x;

    //#region collider management

    //#endregion collider management

    //#region Player Combo Management

    // tick down combo window
    if (this.fsm.get().value!.name == "ladderClimb") return;
    if (this.comboTimer > 0) {
      this.comboTimer -= elapsed;
      if (this.comboTimer <= 0) {
        // ⬅️ RESET FSM if combo expired
        if (
          this.fsm.get().value!.name === "attackStep1" ||
          this.fsm.get().value!.name === "attackStep2" ||
          this.fsm.get().value!.name === "attackStep3"
        ) {
          this.fsm.set("idle");
          this.ac.set(`idle${this.direction}`);
          this.isAttacking = false;
          this.comboStep = 0;
          this.stepTimer = 0;
          this.vel = vec(0, 0); // clean lockout reset
        }
      }
    }

    // tick down punch animation timer
    if (this.stepTimer > 0) {
      this.stepTimer -= elapsed;
      if (this.stepTimer <= 0) {
        // animation finished → only return to idle if NOT waiting for next combo input
        if (this.comboTimer <= 0) {
          this.fsm.set("idle");
          this.ac.set(`idle${this.direction}`);
          this.isAttacking = false;
        }
      }
    }

    //#endregion Player Combo Management
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (other.owner.hasTag("ladder")) {
      console.log("collided with ladder");
      this.fsm.set("ladderClimb");
      this.ac.set("ladder");
    }
  }

  onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
    if (other.owner.hasTag("ladder")) {
      console.log("end collision with ladder");
      this.fsm.set("idle");
      this.ac.set(`idle${this.direction}`);
    }
  }
}

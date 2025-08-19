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
import { pickupEngagementCollider, playerCollider } from "../ColliderGroups";
import { RedBarrel } from "./redBarrel";
import { InteractionActor, InteractionComponent } from "../Components/interactionComponent";
import { YSortComponent } from "../Components/Ysort";

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

const idleLadderAnimation = new Animation({
  frames: [
    {
      graphic: playerLadderSS.getSprite(0, 0),
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

const kneeRightAnimation = new Animation({
  frames: [
    {
      graphic: playerPunchSS.getSprite(3, 1),
      duration: 400,
    },
    {
      graphic: playerWalkSS.getSprite(0, 0),
      duration: 100,
    },
  ],
  strategy: AnimationStrategy.Freeze,
});

const kneeLeftAnimation = kneeRightAnimation.clone();
kneeLeftAnimation.flipHorizontal = true;

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
  //#region Player State

  canEngagePickupRight: boolean = true;
  canEngagePickupLeft: boolean = true;
  targetPickupLeft: Actor | null = null;
  targetPickupRight: Actor | null = null;
  isInteracting: boolean = false;
  isJoystickActive: boolean = false;
  isClimbingLadder: boolean = false;
  JoyStickState: "up" | "left" | "idle" | "right" | "down" | "upLeft" | "upRight" | "downLeft" | "downRight" = "idle";
  oldJoyStickState: "up" | "left" | "idle" | "right" | "down" | "upLeft" | "upRight" | "downLeft" | "downRight" = "idle";

  colliders: Collider[] = [];
  direction: "Left" | "Right" = "Right";
  speed: number = 65;
  GamePadSignal = new Signal("gamepad");
  interactionComponent: InteractionComponent;
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
    | "kneeLeft"
    | "kneeRight"
    | "ladderIdle"
  >;
  ysort: YSortComponent;

  fsm: ExFSM = new ExFSM();
  oldFSMstate: "idle" | "walk" | "attackStep1" | "attackStep2" | "attackStep3" | "recovery" | "ladderClimb" | "knee" = "idle";

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
  detectionChild: InteractionActor = new InteractionActor(vec(36, 15), vec(0, -15));
  //#endregion Player State

  constructor() {
    super({
      name: "Player",
      width: 20,
      height: 10,
      z: 1,
      anchor: vec(0.5, 1),
      pos: vec(500, 60),
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
      kneeLeft: kneeLeftAnimation,
      kneeRight: kneeRightAnimation,
      ladderIdle: idleLadderAnimation,
    });

    this.interactionComponent = new InteractionComponent({ fields: [{ field: this.detectionChild, tags: ["barrel"] }] });

    this.addComponent(this.ac);
    this.addComponent(this.interactionComponent);
    this.ysort = new YSortComponent();
    this.addComponent(this.ysort);

    this.ac.set("idleRight");

    this.GamePadSignal.listen((event: CustomEvent) => {
      const [gpIndex, type, ...data] = event.detail.params;

      if (type === "buttonPressed") {
        this.isAttacking = true;
        if (data[0] === 0) {
          this.handlePunch();
        } else if (data[0] === 1) {
          if (this.interactionComponent.fields[0].canInteract) {
            this.isInteracting = true;
            this.ac.set(`knee${this.direction}`);
            this.fsm.set("knee");
            setTimeout(() => {
              this.ac.set(`idle${this.direction}`);
              this.isInteracting = false;
              this.fsm.set("idle");
            }, 250);
            // get target
            let target = this.interactionComponent.fields[0].field.targets[0] as Actor;
            if (target instanceof RedBarrel) {
              (target as RedBarrel).kicked(this.direction);
            }
          }
        } else console.log(`Gamepad ${gpIndex}: Button ${data[0]} pressed`);
      } else if (type === "buttonHeld") {
        // console.log(`Gamepad ${gpIndex}: Button ${data[0]} held`);
      } else if (type === "buttonReleased") {
        // console.log(`Gamepad ${gpIndex}: Button ${data[0]} released`);
      } else if (type === "leftStick") {
        // Only lock out movement if punch animation still playing
        const direction = data[0];
        this.JoyStickState = direction;

        switch (direction) {
          case "up":
          case "down":
            this.fsm.set("walk");
            break;
          case "left":
          case "upLeft":
          case "downLeft":
            this.direction = "Left";
            this.fsm.set("walk");
            break;
          case "right":
          case "upRight":
          case "downRight":
            this.direction = "Right";
            this.fsm.set("walk");
            break;
          case "idle":
            this.fsm.set("idle");
            break;
        }
        if (direction == "idle") this.isJoystickActive = false;
        else this.isJoystickActive = true;
      }
    });

    this.fsm.register("idle", "walk", "attackStep1", "attackStep2", "attackStep3", "recovery", "ladderClimb", "knee");
    this.fsm.set("idle");
  }

  private handlePunch() {
    let currentState = this.fsm.get().value!.name;
    switch (currentState) {
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
    this.stepTimer = duration;
    setTimeout(() => {
      this.fsm.set(next); // go to next state or back to idle
    }, duration);
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    engine.currentScene.camera.pos.x = this.pos.x;
    let currentState = this.fsm.get().value!.name;

    //*******************************************
    //manage velocity
    //*******************************************
    if (
      this.isJoystickActive &&
      currentState !== "attackStep1" &&
      currentState !== "attackStep2" &&
      currentState !== "attackStep3" &&
      currentState != "knee"
    ) {
      switch (this.JoyStickState) {
        case "up":
          this.vel = vec(0, -this.speed);
          break;
        case "down":
          this.vel = vec(0, this.speed);
          break;
        case "left":
          this.vel = vec(-this.speed, 0);
          break;
        case "right":
          this.vel = vec(this.speed, 0);
          break;
        case "upLeft":
          this.vel = vec(-this.speed, -this.speed);
          break;
        case "upRight":
          this.vel = vec(this.speed, -this.speed);
          break;
        case "downLeft":
          this.vel = vec(-this.speed, this.speed);
          break;
        case "downRight":
          this.vel = vec(this.speed, this.speed);
          break;
        case "idle":
          this.vel = vec(0, 0);
          break;
      }
    } else {
      this.vel = vec(0, 0);
    }

    //*******************************************
    //manage animations
    //*******************************************
    if (this.oldFSMstate != currentState || this.oldJoyStickState != this.JoyStickState) {
      this.oldJoyStickState = this.JoyStickState;
      this.oldFSMstate = currentState as
        | "idle"
        | "walk"
        | "attackStep1"
        | "attackStep2"
        | "attackStep3"
        | "recovery"
        | "ladderClimb"
        | "knee";

      if (currentState != "attackStep1" && currentState != "attackStep2" && currentState != "attackStep3" && currentState != "knee") {
        const ladders = engine.currentScene.entities.filter(e => e.hasTag("ladder") && e instanceof Actor) as Actor[];

        console.log(ladders);
        debugger;
        console.log(this.collider.get()?.touching(ladders[0].collider.get()!));
        console.log(this.collider.get()?.touching(ladders[1].collider.get()!));

        if (this.isJoystickActive) {
          // poll for ladder collision

          console.log("joystick active", currentState, this.isClimbingLadder);
          switch (this.JoyStickState) {
            case "up":
            case "left":
            case "right":
            case "down":
            case "upLeft":
            case "upRight":
            case "downLeft":
            case "downRight":
              if (this.isClimbingLadder) this.ac.set("ladder");
              else this.ac.set(`walk${this.direction}`);
              break;
            case "idle":
              if (this.isClimbingLadder) this.ac.set("ladder");
              else this.ac.set(`idle${this.direction}`);
          }
        } else {
          console.log("in idle", currentState, this.isClimbingLadder);

          if (this.isClimbingLadder) this.ac.set("ladderIdle");
          else this.ac.set(`idle${this.direction}`);
        }
      }
    }

    //*******************************************
    // tick down combo window
    //*******************************************

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
          // this.ac.set(`idle${this.direction}`);
          this.comboStep = 0;
          this.stepTimer = 0;
          this.vel = vec(0, 0); // clean lockout reset
        }
      }
    }

    //*******************************************
    // tick down punch animation timer
    //*******************************************

    if (this.stepTimer > 0) {
      this.stepTimer -= elapsed;
      if (this.stepTimer <= 0) {
        // animation finished → only return to idle if NOT waiting for next combo input
        if (this.comboTimer <= 0) {
          this.fsm.set("idle");
        }
      }
    }
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (other.owner.hasTag("ladder")) {
      console.log("setting ladder flag");

      this.isClimbingLadder = true;
    }
  }

  onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
    if (other.owner.hasTag("ladder")) {
      this.isClimbingLadder = false;
    }
  }
}

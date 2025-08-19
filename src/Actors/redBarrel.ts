import { Actor, Vector, vec, CollisionType, Engine } from "excalibur";
import { pickupcollider, playerCollider } from "../ColliderGroups";
import { Resources } from "../resources";
import { YSortComponent } from "../Components/Ysort";

export class RedBarrel extends Actor {
  isFlying: boolean = false;
  startingY: number = 0;
  kickSpeed: number = 100;
  spinSpeed: number = 20;
  direction: "Left" | "Right" = "Right";
  constructor(pos: Vector) {
    super({
      name: "RedBarrel",
      width: 12,
      height: 8,
      z: 4,
      anchor: Vector.Half,
      pos,
      collisionType: CollisionType.Passive,
      collisionGroup: pickupcollider,
    });
    this.addTag("pickup");
    this.addTag("barrel");
    this.graphics.use(Resources.redbarrel.toSprite());
    this.addComponent(new YSortComponent());
  }

  kicked(side: "Left" | "Right") {
    this.isFlying = true;
    this.startingY = this.pos.y;
    this.body.collisionType = CollisionType.Active;

    if (side === "Left") {
      this.vel = vec(-this.kickSpeed * 2.4, -this.kickSpeed);
      this.angularVelocity = this.spinSpeed;
    } else {
      this.vel = vec(this.kickSpeed * 2.4, -this.kickSpeed);
      this.angularVelocity = -this.spinSpeed;
    }
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    if (this.isFlying) {
      //slowly reduce y velocity to simulate gravity
      this.vel.y += 10;
      this.pos.y -= 1;
    }
  }

  onPostUpdate(engine: Engine, elapsed: number): void {
    if (this.isFlying && this.pos.y >= this.startingY) {
      this.isFlying = false;
      this.pos.y = this.startingY;
      this.vel.y = 0;
      this.vel.x = 0;
      this.rotation = 0;
      this.angularVelocity = 0;
      this.body.collisionType = CollisionType.Passive;
    }
  }
}

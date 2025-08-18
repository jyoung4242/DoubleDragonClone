import { Actor, CollisionType, CompositeCollider, EdgeCollider, Engine, Shape, SpriteSheet, vec, Vector } from "excalibur";
import { Resources } from "../resources";
import { ladderCollider, mapCollider } from "../ColliderGroups";

let tutorialLevelSS = SpriteSheet.fromImageSource({
  image: Resources.tutorialLevel,
  grid: {
    rows: 1,
    columns: 1,
    spriteWidth: 1024,
    spriteHeight: 192,
  },
});

export class TutorialLevel extends Actor {
  constructor() {
    const floorCollider = Shape.Box(1280, 10, Vector.Zero, vec(0, 192 / 2));
    const leftWallCollider = Shape.Box(5, 192, Vector.Zero, vec(-8, -192 / 2));
    const top1Collider = Shape.Box(360, 5, Vector.Zero, vec(0, -10));
    const top2Collider = Shape.Box(75, 33, Vector.Zero, vec(389, -38));
    const top3Collider = Shape.Box(10, 5, Vector.Zero, vec(500, -10));
    const top4Collider = Shape.Box(200, 5, Vector.Zero, vec(520, -40));
    const top5Collider = Shape.Box(75, 5, Vector.Zero, vec(765, -10));
    const top6Collider = Shape.Box(120, 5, Vector.Zero, vec(855, 10));
    const edge1Collider = new EdgeCollider({ begin: vec(510, -10), end: vec(550, -50) });
    const edge2Collider = new EdgeCollider({ begin: vec(720, -50), end: vec(760, -10) });
    const edge3Collider = new EdgeCollider({ begin: vec(840, -10), end: vec(855, 15) });
    const edge4Collider = new EdgeCollider({ begin: vec(980, 10), end: vec(1060, 192 / 2) });
    const ladder1Collider = Shape.Box(5, 80, Vector.Zero, vec(355, -100));
    const ladder2Collider = Shape.Box(5, 80, Vector.Zero, vec(495, -100));
    const ladderTopCollider = Shape.Box(125, 5, Vector.Zero, vec(355, -91));

    const compositeCollider = new CompositeCollider([
      floorCollider,
      leftWallCollider,
      top1Collider,
      top2Collider,
      top3Collider,
      edge1Collider,
      top4Collider,
      edge2Collider,
      top5Collider,
      edge3Collider,
      top6Collider,
      edge4Collider,
      ladder1Collider,
      ladderTopCollider,
      ladder2Collider,
    ]);
    super({
      name: "tutorialLevel",
      z: -1,
      pos: vec(0, 0),
      anchor: vec(0.0, 0.5),
      collider: compositeCollider,
      collisionType: CollisionType.Fixed,
      collisionGroup: mapCollider,
    });
    this.addTag("map");

    const ladder1 = new ladderChild(vec(370, -22));
    const ladder2 = new ladderChild(vec(480, -22));
    this.addChild(ladder1);
    this.addChild(ladder2);
  }

  onInitialize(engine: Engine): void {
    this.graphics.use(tutorialLevelSS.getSprite(0, 0));
  }
}

class ladderChild extends Actor {
  name = "ladder";
  constructor(pos: Vector) {
    super({ width: 25, height: 30, pos, collisionType: CollisionType.Passive, collisionGroup: ladderCollider });
    this.addTag("ladder");
  }
}

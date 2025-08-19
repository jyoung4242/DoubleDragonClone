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
    const floorCollider = Shape.Box(1050, 10, Vector.Zero, vec(0, 192 / 2 - 2));
    const leftWallCollider = Shape.Box(5, 192, Vector.Zero, vec(-8, -192 / 2));
    const top1Collider = Shape.Box(360, 5, Vector.Zero, vec(0, 32));
    const top2Collider = Shape.Box(75, 75, Vector.Zero, vec(389, -38));
    const top3Collider = Shape.Box(10, 5, Vector.Zero, vec(500, -10));
    const top4Collider = Shape.Box(195, 5, Vector.Zero, vec(540, 0));
    const top5Collider = Shape.Box(80, 5, Vector.Zero, vec(765, 30));
    const top6Collider = Shape.Box(115, 5, Vector.Zero, vec(865, 43));
    const edge1Collider = new EdgeCollider({ begin: vec(515, 35), end: vec(548, 7) });
    const edge2Collider = new EdgeCollider({ begin: vec(740, 5), end: vec(768, 35) });
    const edge3Collider = new EdgeCollider({ begin: vec(850, 35), end: vec(865, 48) });
    const edge4Collider = new EdgeCollider({ begin: vec(978, 48), end: vec(1030, 192 / 2) });
    const ladder1Collider = Shape.Box(5, 80, Vector.Zero, vec(355, -45));
    const ladder2Collider = Shape.Box(20, 80, Vector.Zero, vec(495, -45));
    const ladderTopCollider = Shape.Box(125, 5, Vector.Zero, vec(365, -55));

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
      z: -1000,
      pos: vec(0, 0),
      anchor: vec(0.0, 0.5),
      collider: compositeCollider,
      collisionType: CollisionType.Fixed,
      collisionGroup: mapCollider,
    });
    this.addTag("map");

    const ladder1 = new ladderChild(vec(370, 0));
    const ladder2 = new ladderChild(vec(480, 0));
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
    super({ width: 25, height: 75, pos, collisionType: CollisionType.Passive, collisionGroup: ladderCollider });
    this.addTag("ladder");
  }
}

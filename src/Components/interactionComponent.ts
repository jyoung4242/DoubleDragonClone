import { Component, Actor, Engine, CollisionType, Vector, Collider, CollisionContact, Side, Entity, ActorEvents } from "excalibur";
import { Signal } from "../Lib/Signals";
import { pickupEngagementCollider } from "../ColliderGroups";

export interface FeildConfig {
  tags: string[];
  field: InteractionActor;
}

export class InteractionActor extends Actor {
  targets: Actor[] = [];
  tagsToFind: string[] = [];

  constructor(size: Vector, pos: Vector) {
    super({
      width: size.x,
      height: size.y,
      pos,
      name: "interaction",
      collisionType: CollisionType.Passive,
      collisionGroup: pickupEngagementCollider,
      anchor: Vector.Half,
    });
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    const owner = other.owner as Actor;
    if (owner.hasTag("pickup")) {
      //look for target string tag
      //   console.log(owner.tags);

      const found = this.tagsToFind.find(tag => {
        // console.log(tag);
        // console.log(owner.tags);

        return owner.hasTag(tag);
      });
      if (!found) return;
      this.targets.push(owner);
    }
  }

  onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
    const owner = other.owner as Actor;
    if (owner.hasTag("pickup")) {
      //look for target string tag
      const found = this.tagsToFind.find(tag => owner.hasTag(tag));
      if (!found) return;
      this.targets.splice(this.targets.indexOf(owner), 1);
    }
  }
}

interface interactionDataField {
  tags: string[];
  field: InteractionActor;
  canInteract: boolean;
}

export interface iInteractionComponent {
  fields: FeildConfig[];
}

export class InteractionComponent extends Component {
  interactionSignal = new Signal("interaction");
  fields: interactionDataField[] = [];
  constructor(config: iInteractionComponent) {
    super();
    config.fields.forEach(field => {
      let fieldActor = field.field as InteractionActor;
      fieldActor.tagsToFind = [...field.tags];
      this.fields.push({ tags: [...field.tags], field: fieldActor, canInteract: false });
    });
  }

  onAdd(owner: Entity): void {
    this.owner = owner;
    this.owner.on("preupdate", this.update.bind(this));
    this.fields.forEach(field => {
      this.owner?.addChild(field.field);
    });
  }

  onRemove(previousOwner: Entity): void {
    this.owner!.off("preupdate", this.update.bind(this));
  }

  update(event: ActorEvents["preupdate"]) {
    //engine: Engine, delta: number
    //deconstruct event
    const { engine, elapsed } = event;

    this.fields.forEach(field => {
      //only responde to first target in index array

      if (field.field.targets.length > 0) {
        field.canInteract = true;
        this.emit(field.field, field.field.targets[0]);
      } else {
        field.canInteract = false;
      }
    });
  }

  emit(field: Actor, target: Actor) {
    this.interactionSignal.send(["interaction", field, target]);
  }
}

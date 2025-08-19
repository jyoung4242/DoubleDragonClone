import { Component, Actor, Entity, ActorEvents, Subscription } from "excalibur";

export class YSortComponent extends Component {
  private _listener?: Subscription;
  private _actor?: Actor;
  bottom: number = 0;

  onAdd(owner: Entity): void {
    if (!(owner instanceof Actor)) {
      throw new Error("YSortComponent can only be added to an Actor");
    }
    this._actor = owner; // typed as Actor now

    this._listener = this._actor.on("preupdate", this.update.bind(this));
    this.bottom = this._actor.pos.y + this._actor.height * (1 - this._actor.anchor.y);
  }

  onRemove(previousOwner: Entity): void {
    if (this._listener) {
      this._listener.close();
    }
  }

  update(event: ActorEvents["preupdate"]) {
    let { engine, elapsed } = event;

    if (this._actor) {
      this.bottom = this._actor.pos.y + this._actor.height * (1 - this._actor.anchor.y);
      this._actor.z = this.bottom;
    }
  }
}

import { CollisionGroup } from "excalibur";

export const playerCollider = new CollisionGroup("player", 0b00001, 0b00110);
export const mapCollider = new CollisionGroup("map", 0b00010, 0b00001);
export const ladderCollider = new CollisionGroup("ladder", 0b00100, 0b00001);

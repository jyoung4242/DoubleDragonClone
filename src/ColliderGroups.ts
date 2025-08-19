import { CollisionGroup } from "excalibur";

export const playerCollider = new CollisionGroup("player", 0b00001, 0b01110);
export const mapCollider = new CollisionGroup("map", 0b00010, 0b01001);
export const ladderCollider = new CollisionGroup("ladder", 0b00100, 0b00001);
export const pickupcollider = new CollisionGroup("pickup", 0b01000, 0b10010);
export const pickupEngagementCollider = new CollisionGroup("pickupEngagement", 0b10000, 0b01000);

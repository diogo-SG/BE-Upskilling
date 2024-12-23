import BaseEntity from "../entities/baseEntity";

export type EntitySansId<T extends BaseEntity> = Omit<T, "id">;

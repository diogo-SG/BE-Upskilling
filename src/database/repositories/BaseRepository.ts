import { DataSource, DeepPartial, EntityTarget, FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import dataSource from "../dataSource";
import BaseEntity from "../entities/BaseEntity";
import { PaginatedQueryResponse } from "../types/types";

abstract class BaseRepository<T extends BaseEntity> {
  private dataSource: DataSource;
  private entity: EntityTarget<T>;
  public repository: Repository<T>;

  constructor(entity: EntityTarget<T>, baseDataSource: DataSource = dataSource) {
    this.dataSource = baseDataSource ?? dataSource;
    this.entity = entity;
    this.repository = this.dataSource.getRepository(this.entity);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const newEntry = await this.repository.save(data);
    return newEntry;
  }

  async findAll(limit?: number): Promise<T[]> {
    const entries = await this.repository.find({
      take: limit ? limit : 100,
    });
    return entries;
  }

  async findAllPaginated(
    page?: number,
    limit?: number,
    sortField?: string,
    sortOrder?: "ASC" | "DESC"
  ): Promise<PaginatedQueryResponse<T> | null> {
    if (!sortField) sortField = "id";
    if (!sortOrder) sortOrder = "ASC";
    if (!limit) limit = 10;
    if (!page) page = 1;

    // type assertion necessary for making this accessible to all repositories
    const order = {
      [sortField]: sortOrder,
    } as FindOptionsOrder<T>;

    const [entries, total] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order,
    });
    return { entries, total, page, limit };
  }

  async findAllBy(filter: FindOptionsWhere<T>, limit?: number): Promise<T[]> {
    const entries = await this.repository.find({
      where: filter,
      take: limit,
    });
    return entries;
  }

  async findOneById(id: number): Promise<T | null> {
    const entry = await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
    return entry;
  }

  async update(data: DeepPartial<T>): Promise<T> {
    if (!data.id) {
      throw new Error("Entity ID must be provided");
    }

    const existingEntry = await this.repository.findOneBy({ id: data.id } as FindOptionsWhere<T>);

    if (!existingEntry) {
      throw new Error("Entity not found");
    }

    const updatedEntry = { ...existingEntry, ...data, id: Number(data.id), updated_at: new Date() };

    // id can be a string if code elsewhere is not careful to make sure it's a number
    // so we need to cast it just to make sure
    const savedEntry = await this.repository.save({ ...updatedEntry, id: Number(data.id) });

    return savedEntry;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async createMultiple(data: DeepPartial<T>[]): Promise<T[]> {
    const newEntries = await this.repository.save(data);
    return newEntries;
  }

  async editMultiple(data: DeepPartial<T>[]): Promise<T[]> {
    const dataWithNumberIds = data.map((entry) => {
      return { ...entry, id: Number(entry.id) };
    });
    const editedEntries = await this.repository.save(dataWithNumberIds);
    return editedEntries;
  }

  getKeys(): string[] {
    const keys = Object.keys(this.repository.metadata.propertiesMap);
    return keys;
  }
}

export default BaseRepository;

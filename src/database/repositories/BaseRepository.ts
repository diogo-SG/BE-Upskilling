import { DataSource, DeepPartial, EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import dataSource from "../dataSource";
import BaseEntity from "../entities/BaseEntity";

abstract class BaseRepository<T extends BaseEntity> {
  private dataSource: DataSource;
  private entity: EntityTarget<T>;
  public repository: Repository<T>;

  constructor(entity: EntityTarget<T>, baseDataSource: DataSource = dataSource) {
    this.dataSource = dataSource;
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
    const updatedEntry = await this.repository.save(data);
    return updatedEntry;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export default BaseRepository;

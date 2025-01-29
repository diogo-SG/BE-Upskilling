import { DataSource } from "typeorm";
import SessionEntity from "../../../entities/users/sessions/SessionEntity";
import BaseRepository from "../../BaseRepository";

class SessionRepository extends BaseRepository<SessionEntity> {
  constructor(dataSource?: DataSource) {
    super(SessionEntity, dataSource);
  }
}

export default SessionRepository;

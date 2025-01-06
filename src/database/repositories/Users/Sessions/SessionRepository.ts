import SessionEntity from "../../../entities/users/sessions/SessionEntity";
import BaseRepository from "../../BaseRepository";

class SessionRepository extends BaseRepository<SessionEntity> {
  constructor() {
    super(SessionEntity);
  }
}

export default SessionRepository;

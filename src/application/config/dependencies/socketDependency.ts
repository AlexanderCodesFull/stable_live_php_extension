import { HandleError } from "../../errors/HandleError";
import { SocketRepository } from "../../repositories/SocketRepository";
import { SocketService } from "../../services/SocketService";

const error = HandleError.getInstance("Socket Server Error");
const repository = SocketRepository.getInstance();
const socketService = SocketService.getInstance(repository, error);

export { socketService };

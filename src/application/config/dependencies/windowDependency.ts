import { HandleError } from "../../errors/HandleError";
import { WindowRepository } from "../../repositories/WindowRepository";
import { WindowService } from "../../services/WindowService";

const error = HandleError.getInstance("Window Error");
const repository = WindowRepository.getInstance();
const winService = WindowService.getInstance(repository, error);

export { winService };

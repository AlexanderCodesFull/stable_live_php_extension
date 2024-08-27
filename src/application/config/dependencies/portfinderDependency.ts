import { HandleError } from "../../errors/HandleError";
import { PortfinderRepository } from "../../repositories/PortfinderRepository";
import { PortfinderService } from "../../services/PortfinderService";

const error = HandleError.getInstance("Portfinder Error");
const repository = PortfinderRepository.getInstance();
const portfinderService = PortfinderService.getInstance(repository, error);

export { portfinderService };

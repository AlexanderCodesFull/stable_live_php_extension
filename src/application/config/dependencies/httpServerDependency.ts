import { HandleError } from "../../errors/HandleError";
import { HttpServerRepository } from "../../repositories/HttpServerRepository";
import { HttpServerService } from "../../services/HttpServerService";

const error = HandleError.getInstance("Http Server Error");
const repository = HttpServerRepository.getInstance();
const httpServerService = HttpServerService.getInstance(repository, error);

export { httpServerService };

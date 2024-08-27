import { HandleError } from "../../errors/HandleError";
import { WorkspaceRepository } from "../../repositories/WorkspaceRepository";
import { WorkspaceService } from "../../services/WorkspaceService";

const error = HandleError.getInstance("Workspace Error");
const repository = WorkspaceRepository.getInstance();
const wspaceService = WorkspaceService.getInstance(repository, error);

export { wspaceService };

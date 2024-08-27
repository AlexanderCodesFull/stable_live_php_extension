import { HandleError } from "../../errors/HandleError";
import { FileWatchRepository } from "../../repositories/FileWatchRepository";
import { FileWatchService } from "../../services/FileWatchService";

const error = HandleError.getInstance("File Watcher Error");
const repository = FileWatchRepository.getInstance();
const fileWatchService = FileWatchService.getInstance(repository, error);

export { fileWatchService };

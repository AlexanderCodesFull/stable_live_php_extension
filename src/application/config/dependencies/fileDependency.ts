import { FileController } from "../../controllers/FileController";
import { HandleError } from "../../errors/HandleError";
import { FileRepository } from "../../repositories/FileRepository";
import { FileService } from "../../services/FileService";
import { FileUseCase } from "../../usecases/FileUseCase";

const error = HandleError.getInstance("File Error");
const repository = FileRepository.getInstance();
const service = FileService.getInstance(repository, error);
const fileusecase = FileUseCase.getInstance(service, error);
const filecontroller = FileController.getInstance(fileusecase, error);

export { filecontroller };

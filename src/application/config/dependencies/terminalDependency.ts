import { HandleError } from "../../errors/HandleError";
import { TerminalRepository } from "../../repositories/TerminalRepository";
import { TerminalService } from "../../services/TerminalService";

const error = HandleError.getInstance("Terminal Error");
const repository = TerminalRepository.getInstance();
const terminalService = TerminalService.getInstance(repository, error);

export { terminalService };

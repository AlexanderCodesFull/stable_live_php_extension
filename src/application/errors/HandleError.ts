export interface IHandleError {
  show(message: string): void;
}

export class HandleError extends Error implements IHandleError {
  private static readonly instance: HandleError;

  constructor(name: string) {
    super();
    this.name = ` : : ${name} : :`;
  }

  show(message: string): HandleError {
    this.message = `${this.name} ${message}`;
    return this;
  }

  static getInstance(name: string): HandleError {
    if (!HandleError.instance) return new HandleError(name);
    return this.instance;
  }
}

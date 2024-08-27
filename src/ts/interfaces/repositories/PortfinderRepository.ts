export interface IPortfinderRepository {
  resolvePort(): Promise<number>;
}

export class ResponseError extends Error {
  code?: number = undefined;
  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }
}
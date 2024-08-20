export class TimeoutError extends Error {
  constructor(message: string, public readonly retryAfter: Date) {
    super(message);
    this.name = "TimeoutError";
  }
}

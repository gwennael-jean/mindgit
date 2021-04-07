export abstract class Result {
}

export abstract class HandlerService<Type extends Result> {
  abstract handle(stdout: string): Type;
}

export abstract class Result {
}

export abstract class HandlerServiceInterface<Type extends Result> {
  abstract handle(stdout: string): Type;
}

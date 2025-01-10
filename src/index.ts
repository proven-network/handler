type JSONSerializable =
  | string
  | number
  | boolean
  | null
  | Uint8Array
  | JSONSerializable[]
  | { [key: string]: JSONSerializable };

export function runWithOptions<
  A extends JSONSerializable[],
  R extends JSONSerializable | Promise<JSONSerializable> | void | Promise<void>,
>(
  fn: (...args: A) => R,
  options?: {
    allowedOrigins?: string[];
    memory?: number;
    timeout?: number;
  }
): (...args: A) => R {
  return fn;
}

type ExtractPathVariables<Path extends string> =
  Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractPathVariables<`/${Rest}`>]: string }
    : Path extends `${infer _Start}:${infer Param}`
      ? { [K in Param]: string }
      : Record<string, never>;

interface HttpRequest<Path extends string = string> {
  pathVariables: ExtractPathVariables<Path>;
}

export function runOnHttp<
  Path extends string,
  R extends JSONSerializable | Promise<JSONSerializable>,
>(
  fn: (request: HttpRequest<Path>) => R,
  options: {
    memory?: number;
    path: Path;
    timeout?: number;
  }
): (request: HttpRequest<Path>) => R {
  return fn;
}

import { CommittedTransactionInfo } from "@radixdlt/babylon-gateway-api-sdk";

type JSONSerializable =
  | string
  | number
  | boolean
  | null
  | Uint8Array
  | JSONSerializable[]
  | { [key: string]: JSONSerializable };

interface RpcHandlerOptions {
  allowedOrigins?: string[];
  memory?: number;
  timeout?: number;
}

export function runWithOptions<
  A extends JSONSerializable[],
  R extends JSONSerializable | Promise<JSONSerializable> | void | Promise<void>,
>(fn: (...args: A) => R, options: RpcHandlerOptions): (...args: A) => R {
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

interface HttpHandlerOptions<P extends string> {
  allowedOrigins?: string[];
  memory?: number;
  path: P;
  timeout?: number;
}

export function runOnHttp<
  P extends string,
  R extends JSONSerializable | Promise<JSONSerializable>,
>(
  fn: (request: HttpRequest<P>) => R,
  options: HttpHandlerOptions<P>
): (request: HttpRequest<P>) => R {
  return fn;
}

interface RadixEventHandlerOptions {
  allowedOrigins?: string[];
  eventEmitter?: string;
  eventName?: string;
  memory?: number;
  timeout?: number;
}

export function runOnRadixEvent<
  R extends JSONSerializable | Promise<JSONSerializable>,
>(
  fn: (transaction: CommittedTransactionInfo) => R,
  options?: RadixEventHandlerOptions
): (transaction: CommittedTransactionInfo) => R {
  return fn;
}

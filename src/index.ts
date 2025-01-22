import { CommittedTransactionInfo } from "@radixdlt/babylon-gateway-api-sdk";
import { SqlRows } from "@proven-network/sql";

type Input =
  | string
  | number
  | boolean
  | null
  | Uint8Array
  | Output[]
  | { [key: string]: Output };

type Output =
  | string
  | number
  | boolean
  | null
  | SqlRows<Record<string, null | number | string | Uint8Array>>
  | Uint8Array
  | Output[]
  | { [key: string]: Output };

export interface RpcHandlerOptions {
  allowedOrigins?: string[];
  memory?: number;
  timeout?: number;
}

export function runWithOptions<
  I extends Input[],
  O extends Input | Promise<Input> | void | Promise<void>,
>(fn: (...args: I) => O, options: RpcHandlerOptions): (...args: I) => O {
  return fn;
}

type ExtractPathVariables<Path extends string> =
  Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractPathVariables<`/${Rest}`>]: string }
    : Path extends `${infer _Start}:${infer Param}`
      ? { [K in Param]: string }
      : Record<string, never>;

interface HttpRequest<Path extends string = string> {
  body?: Uint8Array;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  pathVariables: ExtractPathVariables<Path>;
}

export interface HttpHandlerOptions<P extends string> {
  allowedOrigins?: string[];
  memory?: number;
  path: P;
  timeout?: number;
}

export function runOnHttp<
  P extends string,
  O extends Input | Promise<Input> | void | Promise<void>,
>(
  fn: (request: HttpRequest<P>) => O,
  options: HttpHandlerOptions<P>
): (request: HttpRequest<P>) => O {
  return fn;
}

export interface RadixEventHandlerOptions {
  allowedOrigins?: string[];
  eventEmitter?: string;
  eventName?: string;
  memory?: number;
  timeout?: number;
}

export function runOnRadixEvent(
  fn: (transaction: CommittedTransactionInfo) => void | Promise<void>,
  options?: RadixEventHandlerOptions
): void {
  return;
}

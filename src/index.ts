import { CommittedTransactionInfo } from "@radixdlt/babylon-gateway-api-sdk";
import { SqlRows } from "@proven-network/sql";

type Input =
  | string
  | number
  | boolean
  | null
  | Uint8Array
  | Input[]
  | { [key: string]: Input };

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

export function run<
  I extends Input[],
  O extends Output | Promise<Output> | void | Promise<void>,
>(fn: (...args: I) => O): (...args: I) => O {
  return fn;
}

export function runWithOptions<
  I extends Input[],
  O extends Output | Promise<Output> | void | Promise<void>,
>(options: RpcHandlerOptions, fn: (...args: I) => O): (...args: I) => O {
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
  queryVariables: Record<string, string>;
}

export interface HttpHandlerOptions<P extends string> {
  allowedOrigins?: string[];
  memory?: number;
  path: P;
  timeout?: number;
}

export function runOnHttp<
  P extends string,
  O extends Output | Promise<Output> | void | Promise<void>,
>(
  options: HttpHandlerOptions<P>,
  fn: (request: HttpRequest<P>) => O
): (request: HttpRequest<P>) => O {
  return fn;
}

export type RadixEventHandlerOptions =
  | {
      allowedOrigins?: string[];
      eventEmitter?: string;
      eventName: string;
      memory?: number;
      timeout?: number;
    }
  | {
      allowedOrigins?: string[];
      eventEmitter: string;
      eventName?: string;
      memory?: number;
      timeout?: number;
    };

export function runOnRadixEvent(
  options: RadixEventHandlerOptions,
  fn: (transaction: CommittedTransactionInfo) => void | Promise<void>
): void {
  return;
}

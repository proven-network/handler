# Handler Types for Proven Application Code

This package allows customization of exported functions in Proven application code.

## Installation

Install this package as a dev dependency:

```bash
npm install --save-dev @proven-network/handler
```

or

```bash
yarn add -D @proven-network/handler
```

## Usage

### RPC Handlers

```typescript
import { runWithOptions } from "@proven-network/handler";

// Simple RPC handler
// No need to use `runWithOptions` if you don't need to customize the handler
// Defaults to 32MB memory and 5000ms timeout
export const add = (a: number, b: number) => {
  return a + b;
};

// RPC handler with options
export const subtract = runWithOptions(
  (a: number, b: number) => {
    return a - b;
  },
  {
    allowedOrigins: ["https://example.com"],
    memory: 128,
    timeout: 30000,
  }
);
```

### HTTP Handlers

```typescript
import { runOnHttp } from "@proven-network/handler";

// Simple HTTP handler with path parameters
export const getUser = runOnHttp(
  (request) => {
    const { userId } = request.pathVariables;
    return { id: userId, name: "John Doe" };
  },
  {
    path: "/users/:userId",
  }
);

// HTTP handler with additional options
export const createUser = runOnHttp(
  (request) => {
    const { orgId } = request.pathVariables;
    return { success: true };
  },
  {
    path: "/organizations/:orgId/users",
    memory: 256,
    timeout: 2000,
  }
);
```

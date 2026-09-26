type RuntimeEnv = Record<string, unknown>;

export type ServerEnv = {
  NODE_ENV: string;
};

let cachedEnv: ServerEnv | undefined;

export function getServerEnv(runtimeEnv?: unknown): ServerEnv {
  if (cachedEnv) return cachedEnv;

  const source = isRuntimeEnv(runtimeEnv) ? runtimeEnv : {};
  cachedEnv = {
    NODE_ENV: readEnv("NODE_ENV", source) ?? "development",
  };

  return cachedEnv;
}

export function requireServerEnv(name: string, runtimeEnv?: unknown): string {
  const source = isRuntimeEnv(runtimeEnv) ? runtimeEnv : {};
  const value = readEnv(name, source);
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }
  return value;
}

function readEnv(name: string, runtimeEnv: RuntimeEnv): string | undefined {
  const runtimeValue = runtimeEnv[name];
  if (typeof runtimeValue === "string" && runtimeValue.length > 0) return runtimeValue;

  const processEnv = globalThis.process?.env as Record<string, string | undefined> | undefined;
  return processEnv?.[name];
}

function isRuntimeEnv(value: unknown): value is RuntimeEnv {
  return value != null && typeof value === "object";
}

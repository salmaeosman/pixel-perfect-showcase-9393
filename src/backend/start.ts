import { createStart } from "@tanstack/react-start";

import { csrfMiddleware, errorMiddleware } from "./security";

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));

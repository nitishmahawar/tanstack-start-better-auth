import { auth } from "@/lib/auth";
import { ORPCError, os } from "@orpc/server";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const authed = os.use(async ({ next }) => {
  const data = await auth.api.getSession({ headers: getRequestHeaders() });

  if (!data?.user) {
    throw new ORPCError("UNAUTHORIZED", { message: "Unauthorized" });
  }

  return next({ context: { user: data.user } });
});

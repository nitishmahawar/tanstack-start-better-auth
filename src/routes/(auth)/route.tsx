import { Spinner } from "@/components/ui/spinner";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/",
      });
    }
  },
  pendingComponent: () => {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}

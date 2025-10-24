import { Navbar } from "@/components/navbar";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  ssr: false,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data?.user) {
      throw redirect({
        to: "/sign-in",
      });
    }
  },
});

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
    </div>
  );
}

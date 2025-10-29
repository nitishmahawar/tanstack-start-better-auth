import { Navbar } from "@/components/navbar";
import { ProfileCard } from "@/components/profile-card";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/sign-in",
      });
    }

    return {
      user: context.user,
    };
  },
});

function App() {
  const { user } = useRouteContext({ from: "/" });

  console.log(user);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-4 flex items-center justify-center flex-1">
        <ProfileCard />
      </div>
    </div>
  );
}

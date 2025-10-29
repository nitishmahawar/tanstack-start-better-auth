import { Navbar } from "@/components/navbar";
import { ProfileCard } from "@/components/profile-card";
import { TodoForm } from "@/components/todo-form";
import { Todos } from "@/components/todos";
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
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 py-6 flex items-center justify-center flex-col flex-1 space-y-6">
        <TodoForm />
        <Todos />
      </div>
    </div>
  );
}

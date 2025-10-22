import { Header } from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen">
      <Header />
    </div>
  );
}

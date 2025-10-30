import { CreateNoteDialog } from "@/components/create-note-dialog";
import { Navbar } from "@/components/navbar";
import { NotesList } from "@/components/notes-list";
import { Button } from "@/components/ui/button";
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
      <div className="py-4 px-4 sm:px-6 md:px-8 lg:px-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Notes</h2>
          <CreateNoteDialog>
            <Button>Create New Note</Button>
          </CreateNoteDialog>
        </div>
        <NotesList />
      </div>
    </div>
  );
}

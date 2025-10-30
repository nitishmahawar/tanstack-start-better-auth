import { Plus, StickyNote } from "lucide-react";

import { Button } from "./ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { CreateNoteDialog } from "./create-note-dialog";

export const EmptyNotes = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <StickyNote className="h-12 w-12" />
        </EmptyMedia>
        <EmptyTitle>No Notes Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any notes yet. Get started by creating your
          first note to organize your thoughts and ideas.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateNoteDialog>
          <Button>
            <Plus className="h-4 w-4" />
            Create Note
          </Button>
        </CreateNoteDialog>
      </EmptyContent>
    </Empty>
  );
};

import { Note } from "@prisma/client";
import React, { FC } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { NoteActionsMenu } from "./note-actions-menu";
import { format } from "date-fns";

interface NoteCardProps {
  note: Note;
}

export const NoteCard: FC<NoteCardProps> = ({ note }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>{note.content}</CardDescription>
        <CardAction>
          <NoteActionsMenu note={note} />
        </CardAction>

        <div className="pt-1">
          <p className="text-xs text-muted-foreground">
            {format(note.createdAt, "PPpp")}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
};

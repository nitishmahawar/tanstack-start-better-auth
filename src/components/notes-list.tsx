import { orpc } from "@/orpc/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NotesSkeleton } from "./notes-skeleton";
import { EmptyNotes } from "./empty-notes";
import { NoteCard } from "./note-card";

export const NotesList = () => {
  const { data, isLoading, isError, error } = useQuery(
    orpc.notes.getAll.queryOptions({})
  );

  if (isLoading) {
    return <NotesSkeleton />;
  }

  if (data?.length === 0 || !data) {
    return <EmptyNotes />;
  }
  return (
    <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

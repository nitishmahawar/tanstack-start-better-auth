import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardHeader, CardAction } from "./ui/card";

export const NotesSkeleton = () => {
  return (
    <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <CardAction>
              <Skeleton className="h-8 w-8 rounded-md" />
            </CardAction>
            <div className="pt-1">
              <Skeleton className="h-3 w-24" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

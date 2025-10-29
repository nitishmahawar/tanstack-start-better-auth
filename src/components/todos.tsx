import { TodoCard } from "@/components/todo-card";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckSquare, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/orpc/client";

export const Todos = () => {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery(orpc.todos.getAll.queryOptions({}));

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 w-full max-w-lg">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full">
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-6 w-full max-w-lg">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading todos</AlertTitle>
          <AlertDescription>
            {error?.message || "Failed to load todos. Please try again."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-lg">
      {todos?.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CheckSquare className="h-12 w-12 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>No todos yet</EmptyTitle>
            <EmptyDescription>
              Create your first todo to get started with task management.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="w-full max-w-lg flex">
          <ItemGroup className="gap-4 w-full">
            {todos?.map((todo) => (
              <div key={todo.id}>
                <TodoCard todo={todo} />
              </div>
            ))}
          </ItemGroup>
        </div>
      )}
    </div>
  );
};

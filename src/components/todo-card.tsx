import React from "react";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemActions,
  ItemDescription,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/orpc/client";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { EditTodoDialog } from "./edit-todo-dialog";

interface TodoCardProps {
  todo: Todo;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation(
    orpc.todos.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.todos.getAll.key() });
        toast.success("Todo deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  
  const handleDelete = () => {
    mutate({ id: todo.id });
  };

  return (
    <Item variant="outline" className="group w-full max-w-2xl">
      <ItemContent>
        <ItemTitle className="text-base">{todo.text}</ItemTitle>
        <ItemDescription className="text-xs text-muted-foreground mt-1">
          Created {formatDate(todo.createdAt.toString())}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="opacity-0 group-hover:opacity-100 transition-opacity">
        <EditTodoDialog todo={todo} />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isPending}
          className="h-8 w-8 text-destructive hover:text-destructive"
        >
          {isPending ? <Spinner /> : <Trash2 className="h-3 w-3" />}
        </Button>
      </ItemActions>
    </Item>
  );
};

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/orpc/client";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

const todoSchema = z.object({
  text: z.string().min(1, "Todo text is required").trim(),
});

type TodoFormData = z.infer<typeof todoSchema>;

export const TodoForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      text: "",
    },
  });

  const { mutate, isPending } = useMutation(
    orpc.todos.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: orpc.todos.getAll.key() });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const onSubmit = (data: TodoFormData) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} placeholder="Add a new todo..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          size="icon"
        >
          {isPending ? <Spinner /> : <Plus className="h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
};

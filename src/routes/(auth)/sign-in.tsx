import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Google } from "@/components/icons/google";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
});

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

function RouteComponent() {
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (data: SignInFormValues) => {
    await authClient.signIn.email(data, {
      onRequest: () => {
        setLoading(true);
      },
      onResponse: () => {
        setLoading(false);
      },
      onSuccess: () => {
        router.navigate({ to: "/" });
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social(
      { provider: "google" },
      {
        onRequest: () => {
          setGoogleLoading(true);
        },
        onResponse: () => {
          setGoogleLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const isAnyLoading = loading || googleLoading;
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      type="email"
                      {...field}
                      disabled={isAnyLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="inline-flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {/* <Link
                      href="/forgot-password"
                      className="text-xs text-muted-foreground hover:text-primary hover:underline"
                    >
                      Forgot password?
                    </Link> */}
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      {...field}
                      disabled={isAnyLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full relative"
              disabled={isAnyLoading}
            >
              {form.formState.isSubmitting && <Spinner />}
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground bg-card">
            Or continue with
          </span>
        </div>
      </div>
      <CardFooter className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isAnyLoading}
          className="w-full relative"
        >
          {googleLoading ? <Spinner /> : <Google />}
          Continue with Google
        </Button>
      </CardFooter>
      <p className="text-sm text-muted-foreground text-center">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </Card>
  );
}

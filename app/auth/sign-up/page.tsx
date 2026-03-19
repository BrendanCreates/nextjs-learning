"use client";

// By default every page and component is a server component
// when we need interactivity we make a client componet
// Client components for state and event handlers like on click, lifecycle logic like useeffect, browser only aplis like local storage, and custom hoosk
// server components for data fetching, using api keys, tokens, and other secrets, reducing JS sent to the browser, improving first contentful paint (FCP) and stream progressively to client
// so everything, even the nav bar is a server component currently
// server components rendered on the server so bundle sizes smaller and no javascript is used
// use client components whenever you need interactivity 
// so I can split pages into separate components and make only the search part of the navbar a client component and just put that in the navbar component so it can remain as server side for the remaining parts

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignUpPage() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema), // will validate form data against the zod schema
        defaultValues: {
            email: "",
            name: "",
            password: "",
        }
    });


    async function onSubmit(data: z.infer<typeof signUpSchema>) {
        
        startTransition(async () => {
            await authClient.signUp.email({
                email: data.email,
                name: data.name,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Account created successfully");
                        router.push("/");
                    },
                    onError: (error) => {
                        toast.error(error.error.message);
                    }
                },
            });
        })
    }

    return (
        // Zod allows us to create a schema for the form data where we can define rules for inputs
        // That schema can be passed into react-hook-form and it will form compliance with the rules of the schema
        // @hookform/resolvers creates a bridge between react-hook-form and zod, react-hook-form manages complex state of form
        // there are other schema packages e.x. yup, superstruct, joi

        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller 
                            name="name" 
                            control={form.control} 
                            render={({ field, fieldState }: { field: any; fieldState: any }) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input 
                                        aria-invalid={fieldState.invalid} 
                                        placeholder="John Doe" 
                                        {...field} 
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} 
                        />
                        <Controller 
                            name="email" 
                            control={form.control} 
                            render={({ field, fieldState }: { field: any; fieldState: any }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input 
                                        aria-invalid={fieldState.invalid} 
                                        placeholder="john@doe.com" 
                                        type="email" 
                                        {...field} 
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} 
                        />
                        <Controller 
                            name="password" 
                            control={form.control} 
                            render={({ field, fieldState }: { field: any; fieldState: any }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input 
                                        aria-invalid={fieldState.invalid} 
                                        placeholder="••••••••" 
                                        type="password" 
                                        {...field} 
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} 
                        />
                        <Button disabled={isPending}>{isPending ? (
                            <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Loading...</span>
                            </>
                        ): (
                            <span>Sign up</span>
                        )}</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
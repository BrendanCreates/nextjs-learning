import { postSchema } from "@/app/schemas/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function CreateRoute() {
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema), // will validate form data against the zod schema
        defaultValues: {
            title: "",
            content: "",
        }
    });
    return (
        <div className="py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create Post</h1>
                <p className="text-xl text-muted-foreground pt-4">Share your thoughts with the world</p>
            </div>
            
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Blog Article</CardTitle>
                    <CardDescription>Create a new blog article</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Controller 
                                name="title" 
                                control={form.control} 
                                render={({ field, fieldState }: { field: any; fieldState: any }) => (
                                    <Field>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input 
                                            aria-invalid={fieldState.invalid} 
                                            placeholder="Enter the title of your blog post" 
                                            {...field} 
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )} 
                            />
                            <Controller 
                                name="content" 
                                control={form.control} 
                                render={({ field, fieldState }: { field: any; fieldState: any }) => (
                                    <Field>
                                        <FieldLabel>Content</FieldLabel>
                                        <Input 
                                            aria-invalid={fieldState.invalid} 
                                            placeholder="Enter the content of your blog post" 
                                            {...field} 
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )} 
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
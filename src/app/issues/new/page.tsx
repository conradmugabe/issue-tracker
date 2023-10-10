"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "easymde/dist/easymde.min.css";

import { createIssueSchema } from "@/issues/entities/dto";
import { ErrorMessage, Spinner } from "@/components";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred. Try again later.");
    }
  });

  return (
    <div className="max-w-xl">
      {error ? (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      ) : null}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button className="cursor-pointer" disabled={isSubmitting}>
          Submit New Issue {isSubmitting ? <Spinner /> : null}
        </Button>
      </form>
    </div>
  );
}

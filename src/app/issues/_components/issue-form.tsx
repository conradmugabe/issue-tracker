"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "easymde/dist/easymde.min.css";

import { issueSchema } from "@/issues/entities/dto";
import { ErrorMessage, Spinner } from "@/components";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IssueFormData>({
    defaultValues: { title: issue?.title, description: issue?.description },
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");
      setIsSubmitting(true);

      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred. Try again later.");
    }
  });

  return (
    <Box className="max-w-xl">
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
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting ? <Spinner /> : null}
        </Button>
      </form>
    </Box>
  );
}

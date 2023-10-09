"use client";

import SimpleMDE from "react-simplemde-editor";
import { Button, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import "easymde/dist/easymde.min.css";

type IssueForm = {
  title: string;
  description: string;
};

export default function NewIssuePage() {
  const { control, handleSubmit, register } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
}

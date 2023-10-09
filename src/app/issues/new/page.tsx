"use client";

import { useState } from "react";

import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

type IssueForm = {
  title: string;
  description: string;
};

export default function NewIssuePage() {
  const router = useRouter();
  const { control, handleSubmit, register } = useForm<IssueForm>();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error ? (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      ) : null}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setError("");
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred. Try again later.");
          }
        })}
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
        <Button className="cursor-pointer">Submit New Issue</Button>
      </form>
    </div>
  );
}

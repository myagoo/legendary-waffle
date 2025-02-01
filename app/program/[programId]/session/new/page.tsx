"use client";

import { useDatabase } from "@/app/_components/DataBaseProvider";
import { Box, Button, TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function Home() {
  const database = useDatabase();
  const { programId } = useParams<{ programId: string }>();
  console.log("params", programId);
  const router = useRouter();
  const { handleSubmit, control } = useForm<{
    name: string;
    description: string;
  }>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: { name: string; description: string }) => {
    console.log("values, ", values);
    const sessionId = await database.add("sessions", { ...values, programId });
    router.push(`/program/${programId}/session/${sessionId}`);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, px: 3 }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        rules={{ required: "Le nom de la séance est requis" }}
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              helperText={error ? error.message : null}
              error={!!error}
              label={"Nom de la séance *"}
              variant="outlined"
            />
          );
        }}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label={"Description de la séance"}
              variant="outlined"
            />
          );
        }}
      />

      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
}

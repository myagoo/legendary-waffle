"use client";

import { useDatabase } from "@/app/_components/DataBaseProvider";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function Home() {
  const database = useDatabase();
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: { name: string; description: string }) => {
    console.log(values);
    const id = await database.add("programs", values);
    router.push(`/program/${id}`);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, px: 3 }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        rules={{ required: "Le nom du programme est requis" }}
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              helperText={error ? error.message : null}
              error={!!error}
              label={"Nom du programme *"}
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
              label={"Description du programme"}
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

"use client";

import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from "@mui/material";
import Box from "@mui/material/Box";
import NextLink from "next/link";
import * as React from "react";
import { useDatabase } from "../_components/DataBaseProvider";



export default function Home() {
  const database = useDatabase()
  const programs = React.use(database.getAll("programs"))
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {programs.map((program) => {
          return (
            <ListItemButton
              key={program.id}
              LinkComponent={NextLink}
              href={`/program/${program.id}`}
            >
              <ListItemAvatar>
                <Avatar>{program.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={program.name}
                secondary={program.description}
              >
                {program.name}
              </ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

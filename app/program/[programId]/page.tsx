"use client";

import { useDatabase } from "@/app/_components/DataBaseProvider";
import {
  Avatar,
  Button,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";

export default function Home() {
  const { programId } = useParams<{ programId: string }>();

  const database = useDatabase();

  const sessions = React.use(
    database.transaction("sessions").store.index("programId").getAll(programId)
  );

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Button
        LinkComponent={NextLink}
        href={`/programs/${programId}/sessions/new`}
      >
        Ajouter une séance
      </Button>
      <List component="nav" aria-label="main mailbox folders">
        {sessions.map((session) => {
          return (
            <ListItemButton
              key={session.id}
              LinkComponent={NextLink}
              href={`/session/${session.id}`}
            >
              <ListItemAvatar>
                <Avatar>{session.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={session.name}
                secondary={session.description}
              >
                {session.name}
              </ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

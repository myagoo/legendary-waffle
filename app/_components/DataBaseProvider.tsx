"use client";

import { IDBPDatabase, openDB } from "idb";
import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";

export const DatabaseContext = createContext<IDBPDatabase | null>(null);

export const useDatabase = () => {
  const database = use(DatabaseContext);

  if (database === null) {
    throw new Error(`Database context was not provided`);
  }

  return database;
};

export const DataBaseProvider = ({ children }: PropsWithChildren) => {
  const [database, setDatabase] = useState<IDBPDatabase | null>(null);
  useEffect(() => {
    const initDB = async () => {
      const database = await openDB("fitnote", 1, {
        async upgrade(database, oldVersion, newVersion, transaction, event) {
          await database.createObjectStore("programs", {
            autoIncrement: true,
            keyPath: "id",
          });

          const sessionsStore = await database.createObjectStore("sessions", {
            autoIncrement: true,
            keyPath: "id",
          });

          sessionsStore.createIndex("programId", "programId", {
            unique: false,
          });

          const exercicesStore = await database.createObjectStore("exercices", {
            autoIncrement: true,
            keyPath: "id",
          });

          exercicesStore.createIndex("sessionId", "sessionId", {
            unique: false,
          });
        },
      });

      setDatabase(database);
    };

    initDB();
  }, []);

  if (!database) {
    return null;
  }

  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};

import {
  Avatar,
  Button,
  Card,
  Drawer,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Calendar from "../src/components/Calendar";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Loader from "../src/components/Loader";
import { SnackbarContext } from "../src/contexts/snackbarContext";
import { DateContext } from "../src/contexts/dateContext";
import SelectInput from "../src/components/SelectInput";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { Padding } from "@mui/icons-material";

const ClientPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setIsLoading] = useState<boolean>(true);
  const [city, setCity] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [_, snackbarDispatch] = useContext<any>(SnackbarContext);
  const [date] = useContext<any>(DateContext);

  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
    setIsLoading(false);
  }, [session, router]);

  const handleSave = () => {
    const res = fetch(`${router.basePath}/api/save-event`, {
      method: "POST",
      body: JSON.stringify({
        owner: session && session.user ? session.user.name : "uknown",
        city,
        date,
      }),
      headers: { "Content-Type": "application/json" },
    });
    snackbarDispatch({
      type: "ACTIVE_SNACKBAR",
      message: "Evénement sauvegardé",
      severity: "success",
    });
  };

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  if (loading) return <Loader />;
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Card
          style={{
            padding: "20px",
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <IconButton
            aria-label="log out"
            onClick={() => signOut()}
            edge="end"
            style={{
              position: "absolute",
              right: 25,
            }}
          >
            <PowerSettingsNew />
          </IconButton>
          <Avatar />
          <TextField
            size="small"
            style={{ width: "100%" }}
            disabled
            defaultValue={session && session.user ? session.user.name : ""}
            label="Nom"
          />
          <SelectInput value={city} label="Lieu" onChange={setCity}>
            <MenuItem value="Marseille">Marseille</MenuItem>
            <MenuItem value="Lille">Lille</MenuItem>
            <MenuItem value="Paris">Paris</MenuItem>
          </SelectInput>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <TextField
              size="small"
              disabled
              value={date}
              defaultValue={date}
              label="Date"
            />
            <Button variant="outlined" onClick={() => setOpen(true)}>
              <CalendarMonth />
            </Button>
          </div>
          <Button variant="outlined" onClick={handleSave}>
            Sauvegarder
          </Button>
        </Card>
      </div>

      <Drawer anchor="top" open={open} onClose={toggleDrawer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
          }}
        >
          <Calendar />
          <Button
            variant="contained"
            onClick={() => {
              snackbarDispatch({
                type: "ACTIVE_SNACKBAR",
                message: "Date modifiée",
                severity: "success",
              });
              setOpen(false);
            }}
          >
            Planifier
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default ClientPage;

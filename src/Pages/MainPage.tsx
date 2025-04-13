import { Button, Container, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const MainPage = () => {
  interface listObject {
    title: string;
    steps: string[];
  }

  interface arrayOfObjects {
    item: listObject[];
  }

  const [Data, setData] = useState<arrayOfObjects>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res: string | null = await localStorage.getItem("lists");
    if (res != null) {
      console.log(JSON.parse(res));
    }
  };

  return (
    <Container
      style={{
        width: "100%",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Button variant="contained" href="/create">
        Add new list
      </Button>
      <TextField placeholder="Search list" />

      <Paper>{}</Paper>
    </Container>
  );
};

export default MainPage;

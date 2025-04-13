import { Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CardComponent from "../Components/Card";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  interface listObject {
    title: string;
    steps: string[];
  }

  const [Data, setData] = useState<listObject[]>();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await localStorage.getItem("item");
    if (res != null) {
      setData(JSON.parse(res) || [{}]);
    }
  };

  const deleteElement = async (index: number) => {
    if (Data) {
      let updateArr = [...Data];
      updateArr.splice(index, 1);
      setData(updateArr);
      await localStorage.setItem("item", JSON.stringify(updateArr));
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
      <TextField
        placeholder="Search list"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <Container
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
        disableGutters={true}
      >
        {Data != undefined ? (
          search != "" ? (
            Data.map((el, i) => {
              if (el.title.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <CardComponent
                    title={el.title}
                    deleteFunc={() => deleteElement(i)}
                    editFunc={() => {
                      navigate(`/edit/${i}`);
                    }}
                    index={i}
                    key={i + 1}
                  />
                );
              }
            })
          ) : (
            Data.map((el, i) => {
              return (
                <CardComponent
                  title={el.title}
                  deleteFunc={() => deleteElement(i)}
                  editFunc={() => {
                    navigate(`/edit/${i}`);
                  }}
                  index={i}
                  key={i + 1}
                />
              );
            })
          )
        ) : (
          <>No to-do lists made</>
        )}
      </Container>
    </Container>
  );
};

export default MainPage;

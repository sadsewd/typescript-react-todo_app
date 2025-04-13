import { Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ListProps {
  action: "create" | "edit";
}

const ListActions = ({ action }: ListProps) => {
  const navigate = useNavigate();
  type Status = "error" | "pending" | "success";
  type Message =
    | "Missing title"
    | "Missing steps"
    | "Data added succesfully"
    | "Data insertion error"; //Prob unnecessary
  const [status, setStatus] = useState<Status>();
  const [message, setMessage] = useState<Message>();
  interface FormData {
    title: string;
    steps: string[];
  }

  const initdata: FormData = {
    title: "",
    steps: [""],
  };

  const [formData, setFormData] = useState<FormData>(initdata);

  useEffect(() => {
    if (action == "edit") {
      getData();
    }
  }, []);

  const getData = async () => {
    setStatus("pending");
    const data = await localStorage.getItem("item");
    const { id } = useParams();
    const parsed = JSON.parse(data || "[{}]");
    setFormData(parsed[Number(id)]);
  };

  useEffect(() => {
    let stepsLength = formData.steps.length - 1;
    let updateArr: string[] = formData.steps;
    if (formData.steps[0] != "") {
      if (formData.steps[stepsLength] != "") {
        updateArr.push("");
        setFormData({ ...formData, steps: updateArr });
      }
      if (stepsLength > 0) {
        if (formData.steps[stepsLength - 1] == "") {
          updateArr.pop();
          setFormData({ ...formData, steps: updateArr });
        }
      }
    }
  }, [formData]);

  const handleSubmit = async () => {
    if (formData.title != "") {
      if (formData.steps[0] != "") {
        setStatus("pending");
        try {
          let data = (await localStorage.getItem("item")) || "{}";
          if (data == "{}") {
            await localStorage.setItem("item", `[${JSON.stringify(formData)}]`);
          } else {
            let dataArr: FormData[] = JSON.parse(data);
            console.log(dataArr);
            dataArr.push(formData);
            await localStorage.setItem("item", JSON.stringify(dataArr));
          }
          setMessage("Data added succesfully");
          setStatus("success");
          navigate("/");
        } catch {
          setMessage("Data insertion error");
          setStatus("error");
        }
      } else {
        setMessage("Missing steps");
        setStatus("error");
      }
    } else {
      setMessage("Missing title");
      setStatus("error");
    }
  };

  const handleStepsChange = (e: any, index: number) => {
    let updateArr: string[] = formData.steps;
    updateArr[index] = e.target.value;
    setFormData({ ...formData, steps: updateArr });
  };

  return (
    <Container
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 16,
        gap: 16,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Title"
        value={formData.title}
        name="title"
        onChange={(e) => {
          setFormData({
            ...formData,
            title: e.target.value,
          });
        }}
      />
      {formData.steps.map((el, i) => {
        return (
          <TextField
            value={el}
            key={i}
            onChange={(e) => {
              handleStepsChange(e, i);
            }}
          />
        );
      })}
      <Button
        variant="contained"
        color={
          status == "error"
            ? "error"
            : status == "success"
            ? "success"
            : "primary"
        }
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default ListActions;

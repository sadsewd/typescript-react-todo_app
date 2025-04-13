import { Button, Card, Container, Typography } from "@mui/material";

interface CardProps {
  title: string;
  index: number;
  editFunc: () => void;
  deleteFunc: (index: number) => void;
}

const CardComponent = ({ title, editFunc, index, deleteFunc }: CardProps) => {
  return (
    <Card
      style={{
        height: "8rem",
        paddingTop: 32,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderColor: "blueviolet",
      }}
      variant="outlined"
    >
      <Typography style={{ textAlign: "center" }}>{title}</Typography>
      <Container style={{ width: "100%" }} disableGutters={true}>
        <Button
          variant="contained"
          color="success"
          onClick={editFunc}
          style={{ width: "50%" }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteFunc(index)}
          style={{ width: "50%" }}
        >
          Delete
        </Button>
      </Container>
    </Card>
  );
};

export default CardComponent;

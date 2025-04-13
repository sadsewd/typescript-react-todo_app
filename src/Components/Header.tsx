import { AppBar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Typography variant="h5" color="white" margin={1}>
        To-do app
      </Typography>
    </AppBar>
  );
};

export default Header;

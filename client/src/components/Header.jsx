import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import {Link} from 'react-router-dom';

function Header() {

  return (
    <div>
      <AppBar sx={{ backgroundColor: "#498199" }} position="sticky">
        <Toolbar>
          <Typography variant="h5">Books App</Typography>

          <Box display="flex" marginLeft={"auto"}>
            <Tabs textColor="inherit">
              <Tab LinkComponent={Link} to="/books" label="Books" />
              <Tab LinkComponent={Link} to="/add" label="Add Product" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;

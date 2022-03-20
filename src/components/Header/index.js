import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box ,Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {Link} from "react-router-dom";

import useStyles from "./styles.js";

const Header = ({ setCoordinates, innerpage }) => {
  const classes = useStyles();

  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoC) => {
    setAutoComplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    setCoordinates({ lat: lat, lng: lng });
  };

  return (
    <AppBar
      className={classes.appbar}
      position="static"
      style={{ background: "#2E3B55" }}
    >
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>

        {innerpage ? (
          <Link to="/">
           <Button className={classes.Button} >Return to the map</Button>
          </Link>
         
        ) : (
          <Box display="flex">
            <Typography variant="h6" className={classes.title}>
              Explore new places
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

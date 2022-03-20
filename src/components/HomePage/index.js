import React from 'react';
import List from "../List";
import Map from "../Map";
import { Grid } from "@material-ui/core";
function HomePage({places, filteredPlaces, childClicked, isLoading, type, setType, rating, setRating, setCoordinates, setBounds, coordinates, setChildClicked}) {
  return (
    <Grid container spacing={2} style={{ width: "100%" }}>
    <Grid item xs={12} md={4}>
      <List
        places={filteredPlaces.length? filteredPlaces :places}
        childClicked={childClicked}
        isLoading={isLoading}
        type={type}
        setType={setType}
        rating={rating}
        setRating={setRating}
      />
    </Grid>
    <Grid item xs={12} md={8}>
      <Map
        setCoordinates={setCoordinates}
        setBounds={setBounds}
        coordinates={coordinates}
        places={filteredPlaces.length? filteredPlaces :places}
        setChildClicked={setChildClicked}
      />
    </Grid>
  </Grid>
  )
}

export default HomePage
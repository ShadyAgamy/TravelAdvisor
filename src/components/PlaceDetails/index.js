import React from "react";
import {
  Link
} from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";


import Rating from "@material-ui/lab/Rating";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Link to={`place/${place.name}`}>
      <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={
            place.photo
              ? place.photo.images.large.url
              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
          }
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <Typography component="legend">
              {place.num_reviews} review{place.num_reviews > 1 && "s"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaceDetails;

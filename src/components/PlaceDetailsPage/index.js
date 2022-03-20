import React, { useState, useEffect } from "react";
import Header from "../Header/index.js";
import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles.js";

function PlaceDetailsPage({ getPlace }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState({});

  useEffect(() => {
    setPlace(getPlace(name));
  }, [name]);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (!place?.name) {
        navigate("/");
      }
    }, 2000);
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [place]);

  const classes = useStyles();
  return (
    <>
      <Header innerpage />
      {place?.name ? (
        <Grid container  justifyContent="center" alignItems="center">
          <Grid item xs={12} md={10}>
            <Card elevation={6} style={{ marginTop: "2rem" }}>
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
                  <Rating
                    name="read-only"
                    value={Number(place.rating)}
                    readOnly
                  />
                  <Typography component="legend">
                    {place.num_reviews} review{place.num_reviews > 1 && "s"}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography component="legend">Price</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    {place.price_level}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography component="legend">Ranking</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    {place.ranking}
                  </Typography>
                </Box>
                {place?.awards?.map((award) => (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    my={1}
                    alignItems="center"
                  >
                    <img src={award.images.small} />
                    <Typography variant="subtitle2" color="textSecondary">
                      {award.display_name}
                    </Typography>
                  </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                  <Chip
                    key={name}
                    size="small"
                    label={name}
                    className={classes.chip}
                  />
                ))}
                {place.address && (
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                    className={classes.subtitle}
                  >
                    <LocationOnIcon />
                    {place.address}
                  </Typography>
                )}
                {place.phone && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.spacing}
                  >
                    <PhoneIcon /> {place.phone}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => window.open(place.web_url, "_blank")}
                >
                  Trip Advisor
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => window.open(place.website, "_blank")}
                >
                  Website
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography
          gutterBottom
          variant="h5"
          style={{ marginTop: "14rem", textAlign: "center" }}
        >
          Sorry, No places to show, you will redirect to Map Now to select new
          place!
        </Typography>
      )}
    </>
  );
}

export default PlaceDetailsPage;

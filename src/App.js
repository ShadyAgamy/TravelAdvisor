import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import PlaceDetailsPage from "./components/PlaceDetailsPage";

import { getPlacesData } from "./api";

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  console.log(places);
  console.log(filteredPlaces);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  useEffect(() => {
    setFilteredPlaces(
      places.filter((place) => {
        return Number(place.rating) > rating;
      })
    );
  }, [rating]);

  const getPlace = (placeName) => {
    let placesToSearchInto;
    if (filteredPlaces?.length > 0 ) {
      placesToSearchInto = filteredPlaces;
    } else {
      placesToSearchInto = places;
    }
    const placeToReturn = placesToSearchInto.filter(place => {
      return place.name === placeName
    });

    return placeToReturn[0];
    
  }

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              places={places}
              filteredPlaces={filteredPlaces}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              setChildClicked={setChildClicked}
            />
          }
        />
        <Route path="place/:name" element={<PlaceDetailsPage getPlace={getPlace} />} />
      </Routes>
    </>
  );
}

export default App;

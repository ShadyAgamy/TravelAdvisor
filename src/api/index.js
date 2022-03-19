import axios from "axios";



export const getPlacesData = async (type, sw, ne) => {
  try {
    const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "b29679b1ccmshcb85d1dffa21a8cp189220jsnee346a6aad5c",
      },
    });
    return data;
  } catch (err) {console.log(err)}
};

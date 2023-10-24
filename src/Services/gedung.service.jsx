import axios from "axios";

export const getGedung = (callback) => {
  axios
    .get(`http://localhost:5050/api/location-list`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.log("error =>", error);
    });
};
export const getGedungById = (idGedung, callback) => {
  axios
    .get(`http://localhost:5050/api/location/${idGedung}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.log("error =>", error);
    });
};

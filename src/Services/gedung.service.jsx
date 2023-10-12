import axios from "axios";

export const getGedung = (callback) => {
  axios
    .get(`http://192.168.201.169:5000/api/location-list`, {
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
    .get(`http://192.168.201.169:5000/api/location/${idGedung}`, {
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

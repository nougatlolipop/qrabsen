import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { umsu } from "../assets";
import sign from "jwt-encode";
import { useParams } from "react-router-dom";
import { getGedungById } from "../Services/gedung.service";

function Qr() {
  const [token, setToken] = useState("");
  const [time, setTime] = useState({});
  const [infoGedung, setInfoGedung] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getGedungById(id, (response) => {
      if (response.status == 200) {
        const gedung = response.data.location;
        setInfoGedung(gedung);

        let tokenString = generateToken(gedung);
        setToken(tokenString);

        const interval = setInterval(() => {
          if (isTokenExpired(tokenString)) {
            tokenString = generateToken(gedung);
            setToken(tokenString);
          }

          const padWithZero = (num) => num.toString().padStart(2, "0");

          setTime({
            hour: padWithZero(new Date().getHours()),
            minute: padWithZero(new Date().getMinutes()),
            second: padWithZero(new Date().getSeconds()),
          });
        }, 1000);

        return () => clearInterval(interval);
      } else {
        console.log("Informasi", response.message);
      }
    });
  }, [id]);

  const generateToken = (gedung) => {
    const now = new Date();
    const gmtPlus7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const unixTimestamp = Math.floor(gmtPlus7Time.getTime() / 1000);
    const fifteenSecondsLater = unixTimestamp + 15;

    const secretKey = "Allahuakbar1213*";

    const payload = {
      locationId: gedung._id,
      location: gedung.locationName,
      iat: unixTimestamp * 1000,
      exp: fifteenSecondsLater * 1000,
    };

    const jwt = sign(payload, secretKey);
    return jwt;
  };

  const isTokenExpired = (token) => {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const now = new Date();
    const gmtPlus7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const currentTime = Math.floor(gmtPlus7Time.getTime() / 1000) * 1000;

    return payload.exp < currentTime;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-indigo-500">
      <div className="rounded-tl-full bg-gradient-to-br from-white opacity-30 w-40 h-40 absolute right-0 bottom-0"></div>
      <div className="rounded-tl-full bg-gradient-to-br from-white opacity-10 w-80 h-80 absolute right-0 bottom-0"></div>
      <div className="rounded-br-full bg-gradient-to-tl from-white opacity-50 w-60 h-60 absolute left-0 top-0"></div>

      <div className="text-4xl font-bold mb-4 text-white">
        QR Code Attendance UMSU
      </div>
      <div className="flex flex-col items-center bg-white py-14 px-8 rounded-3xl">
        <div className="text-2xl font-semibold mb-4 text-indigo-500">
          {infoGedung.locationName}
        </div>
        <div className="text-2xl font-semibold mb-4 text-indigo-500">
          {time.hour}:{time.minute}:{time.second}
        </div>
        <div className="relative ">
          <QRCode value={token} level="L" />
          <img
            src={umsu}
            alt="umsu"
            className="absolute inset-0 mx-auto my-auto w-[50px] h-[50px]"
          />
        </div>
      </div>
      <div className="text-xl font-semibold mt-4 text-white">
        {infoGedung.locationAddress}
      </div>
      {/* <div className="w-full px-40 break-all">{token}</div> */}
    </div>
  );
}

export default Qr;

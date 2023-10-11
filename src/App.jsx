import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { umsu } from "./assets";
import sign from "jwt-encode";

function App() {
  const [token, setToken] = useState("");
  const [time, setTime] = useState({});
  const [change, setChange] = useState(1);

  const generateToken = () => {
    const now = new Date();
    const gmtPlus7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const unixTimestamp = Math.floor(gmtPlus7Time.getTime() / 1000);
    const fifteenSecondsLater = unixTimestamp + 15;

    const secretKey = "Allahuakbar1213*";

    const payload = {
      location: "Gedung Fakultas Hukum",
      iat: unixTimestamp * 1000,
      exp: fifteenSecondsLater * 1000,
    };

    const jwt = sign(payload, secretKey);
    return jwt;
  };

  useEffect(() => {
    let tokenString = generateToken();
    setToken(tokenString);

    const interval = setInterval(() => {
      if (isTokenExpired(tokenString)) {
        tokenString = generateToken();
        setToken(tokenString);

        setChange((prevCount) => prevCount + 1);
      }

      const padWithZero = (num) => num.toString().padStart(2, "0");

      setTime({
        hour: padWithZero(new Date().getHours()),
        minute: padWithZero(new Date().getMinutes()),
        second: padWithZero(new Date().getSeconds()),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isTokenExpired = (token) => {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const now = new Date();
    const gmtPlus7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const currentTime = Math.floor(gmtPlus7Time.getTime() / 1000) * 1000;
    // const currentTime = Math.floor(Date.now() / 1000) ;

    return payload.exp < currentTime;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-3xl font-bold mb-4">Gedung Fakultas Hukum</div>
      <div className="text-3xl font-bold mb-4">
        {time.hour}:{time.minute}:{time.second}
      </div>
      <div className="relative">
        <QRCode value={token} level="L" />
        <img
          src={umsu}
          alt="umsu"
          className="absolute inset-0 mx-auto my-auto w-[50px] h-[50px]"
        />
      </div>
      <div className="text-2xl font-bold mt-4">{`QR Code ${change} kali refresh`}</div>
      {/* <div className="w-full px-40 break-all">{token}</div> */}
    </div>
  );
}

export default App;

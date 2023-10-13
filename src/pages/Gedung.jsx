import { useEffect, useState } from "react";
import { getGedung } from "../Services/gedung.service";
import { Link } from "react-router-dom";

function Gedung() {
  const [gedung, setGedung] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    getGedung((response) => {
      if (response.status == 200) {
        setGedung(response.data.data);
      } else {
        console.log("Informasi", response.message);
      }
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-indigo-500">
      <div className="rounded-tl-full bg-gradient-to-br from-white opacity-30 w-40 h-40 absolute right-0 bottom-0"></div>
      <div className="rounded-tl-full bg-gradient-to-br from-white opacity-10 w-80 h-80 absolute right-0 bottom-0"></div>
      <div className="rounded-br-full bg-gradient-to-tl from-white opacity-50 w-60 h-60 absolute left-0 top-0"></div>

      <div className="w-1/2 mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {gedung.map((data, index) => (
            <Link
              className="p-4 bg-white text-indigo-500 items-center justify-center rounded-lg text-center"
              key={index}
              to={`/qr/${data._id}`}
            >
              {data.locationName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gedung;

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
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/2 mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {gedung.map((data, index) => (
            <Link
              className="p-4 bg-indigo-500 text-white items-center justify-center rounded-lg"
              key={index}
              to={`/qr?name=${data.locationName}`}
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

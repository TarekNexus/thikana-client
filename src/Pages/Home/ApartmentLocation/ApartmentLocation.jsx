import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ApartmentLocation = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  return (
    <section className="py-16 px-4 w-11/12 mx-auto ">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-[#00aeff] mb-3">
          Apartment Locations & How to Get There
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore our apartment locations across Bangladesh with helpful guidance to reach them easily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
          {locations.map((loc, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#00aeff]">{loc.name}</h3>
              <p className="text-gray-700">{loc.address}</p>
              <p className="text-gray-600 mt-2">{loc.description}</p>
              <p className="mt-2 italic text-sm text-gray-500">
                How to get there: {loc.howToGetThere}
              </p>
            </div>
          ))}
        </div>

        <MapContainer
          center={[23.8103, 90.4125]} // Dhaka center
          zoom={7}
          scrollWheelZoom={false}
          style={{ height: "600px", width: "100%", zIndex: 0  }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc, idx) => (
            <Marker key={idx} position={loc.position}>
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                {loc.address}
                <br />
                {loc.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default ApartmentLocation;

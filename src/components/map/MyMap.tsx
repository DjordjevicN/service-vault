import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MyMap = ({
  lat = 44.7866,
  long = 20.4489,
}: {
  long: number;
  lat: number;
}) => {
  const position: [number, number] = [lat, long];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>You're here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;

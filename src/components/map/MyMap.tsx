import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const LocationMarker = ({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MyMap = ({
  lat = 44.7866,
  long = 20.4489,
  onChange,
  disableMarker = false,
}: {
  long?: number;
  lat?: number;
  onChange?: (lat: number, lng: number) => void;
  disableMarker?: boolean;
}) => {
  const [markerPos, setMarkerPos] = useState<[number, number]>([lat, long]);

  const handleSelect = (lat: number, lng: number) => {
    if (disableMarker) return;
    setMarkerPos([lat, lng]);
    onChange?.(lat, lng);
  };
  return (
    <MapContainer
      center={markerPos}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={markerPos}>
        <Popup>Meet here!</Popup>
      </Marker>
      <LocationMarker onSelect={handleSelect} />
    </MapContainer>
  );
};

export default MyMap;

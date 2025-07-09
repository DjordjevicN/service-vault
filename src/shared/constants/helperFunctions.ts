export const googleMapsRouteLink = (
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): string => {
  return `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${endLat},${endLng}&travelmode=driving&avoid=tolls`;
};

export const googleMapsPinLink = (
  latitude: number | null,
  longitude: number | null
) => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};

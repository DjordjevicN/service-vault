export const serviceFormInit = {
  serviceMilage: "",
  // general inspection
  visualLeaks: false,
  visualLeaksNote: "",
  looseBolts: false,
  checkForRust: false,
  checkForRustNote: "",
  // engine and oil
  engineOilChange: false,
  engineOilChangeNote: "",
  oilFilterChange: false,
  oilFilterChangeNote: "",
  airFilterChange: false,
  airFilterChangeNote: "",
  sparkPlugChange: false,
  sparkPlugChangeNote: "",
  coolantChange: false,
  coolantChangeNote: "",
  // fuel system
  fuelFilterChange: false,
  fuelFilterChangeNote: "",
  fuelInjectorChange: false,
  fuelInjectorChangeNote: "",
  // transmission and clutch
  clutchAdjust: false,
  clutchAdjustNote: "",
  transmissionFluidCheck: false,
  transmissionFluidCheckNote: "",
  // chain and sprockets
  chainLubrication: false,
  chainLubricationNote: "",
  sprocketInspection: false,
  sprocketInspectionNote: "",
  // brakes and wheels
  brakePadChange: false,
  brakePadChangeNote: "",
  brakeFluidChange: false,
  brakeFluidChangeNote: "",
  tirePressureCheck: false,
  tirePressureCheckNote: "",
  tireChange: false,
  tireChangeNote: "",
  // suspension and steering
  forkOilChange: false,
  forkOilChangeNote: "",
  rearShockInspection: false,
  rearShockInspectionNote: "",
  // electrical system and lights
  batteryVoltageCheck: false,
  batteryVoltageCheckNote: "",
  lightsTest: false,
  hornSwitchCheck: false,
  electricalIssuesNote: "",
  // final test ride and summary
  testRide: false,
  testRideNote: "",
  mechanicNote: "",
  nextServiceDate: "",
};
export type ServiceFormInit = typeof serviceFormInit;

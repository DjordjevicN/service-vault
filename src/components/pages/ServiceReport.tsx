import { SERVICE_REPORT_MOCK_DATA } from "../mockData/serviceReport";
const services = SERVICE_REPORT_MOCK_DATA;
const service = services[0];
const {
  currentDate,
  serviceMilage,
  visualLeaks,
  visualLeaksNote,
  looseBolts,
  checkForRust,
  checkForRustNote,
  engineOilChange,
  engineOilChangeNote,
  oilFilterChange,
  oilFilterChangeNote,
  airFilterChange,
  airFilterChangeNote,
  sparkPlugChange,
  sparkPlugChangeNote,
  coolantChange,
  coolantChangeNote,
  fuelFilterChange,
  fuelFilterChangeNote,
  fuelInjectorChange,
  fuelInjectorChangeNote,
  clutchAdjust,
  clutchAdjustNote,
  transmissionFluidCheck,
  transmissionFluidCheckNote,
  chainLubrication,
  chainLubricationNote,
  sprocketInspection,
  sprocketInspectionNote,
  brakePadChange,
  brakePadChangeNote,
  brakeFluidChange,
  brakeFluidChangeNote,
  tirePressureCheck,
  tirePressureCheckNote,
  tireChange,
  tireChangeNote,
  forkOilChange,
  forkOilChangeNote,
  rearShockInspection,
  rearShockInspectionNote,
  batteryVoltageCheck,
  batteryVoltageCheckNote,
  lightsTest,
  hornSwitchCheck,
  electricalIssuesNote,
  testRide,
  testRideNote,
  mechanicNote,
  nextServiceDate,
} = service;
const blockStyle = "min-w-1/4 border p-4";
const ReportItem = ({
  label,
  value,
  suffix,
  note,
}: {
  label: string;
  value: string | boolean;
  suffix?: string;
  note?: string;
}) => {
  const formattedValue =
    typeof value === "boolean" ? (
      <span
        className={
          value ? "text-green-600 text-[14px]" : "text-red-600 text-[14px]"
        }
      >
        {value ? "Yes" : "No"}
      </span>
    ) : (
      value || "N/A"
    );

  return (
    <div className="mb-2">
      <div className="flex gap-2">
        <p className="font-bold text-[14px]">{label}</p>
        <p className="text-[14px]">{formattedValue}</p>
        {suffix && <p className="text-[14px]">{suffix}</p>}
      </div>
      {note && <p className="text-[14px]">{note}</p>}
    </div>
  );
};
const ServiceReport = () => {
  return (
    <div className="p-4">
      <ReportItem
        label="Service:"
        value={currentDate}
        note={`Current milage: ${serviceMilage}`}
      />

      <div className="flex flex-wrap gap-2">
        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">General inspection</h1>
          <ReportItem
            label="Visual Leaks Check:"
            value={visualLeaks}
            note={visualLeaksNote}
          />

          <ReportItem label="Loose Bolts Check:" value={looseBolts} />
          <ReportItem
            label="Check For Rust:"
            value={checkForRust}
            note={checkForRustNote}
          />
        </div>
        <div className={blockStyle}>
          {" "}
          <h1 className="text-2xl font-bold mb-3">Engine & Oil System</h1>
          <ReportItem
            label="Engine Oil Change:"
            value={engineOilChange}
            note={engineOilChangeNote}
          />
          <ReportItem
            label="Oil Filter Change:"
            value={oilFilterChange}
            note={oilFilterChangeNote}
          />
          <ReportItem
            label="Air Filter Change:"
            value={airFilterChange}
            note={airFilterChangeNote}
          />
          <ReportItem
            label="Spark Plug Change:"
            value={sparkPlugChange}
            note={sparkPlugChangeNote}
          />
        </div>

        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">Fuel System</h1>
          <ReportItem
            label="Fuel Filter Change:"
            value={fuelFilterChange}
            note={fuelFilterChangeNote}
          />
          <ReportItem
            label="Fuel Injector Change:"
            value={fuelInjectorChange}
            note={fuelInjectorChangeNote}
          />
        </div>
        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">Fuel System</h1>
          <ReportItem
            label="Clutch Adjust:"
            value={clutchAdjust}
            note={clutchAdjustNote}
          />
        </div>
        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">Transmission & Clutch</h1>
          <ReportItem
            label="Transmission Fluid Check:"
            value={transmissionFluidCheck}
            note={transmissionFluidCheckNote}
          />
          <ReportItem
            label="Chain Lubrication:"
            value={chainLubrication}
            note={chainLubricationNote}
          />
          <ReportItem
            label="Sprocket Inspection:"
            value={sprocketInspection}
            note={sprocketInspectionNote}
          />
        </div>
        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">Brakes & Wheels</h1>
          <ReportItem
            label="Brake Pad Change:"
            value={brakePadChange}
            note={brakePadChangeNote}
          />
          <ReportItem
            label="Brake Fluid Change:"
            value={brakeFluidChange}
            note={brakeFluidChangeNote}
          />
          <ReportItem
            label="Tire Pressure Check:"
            value={tirePressureCheck}
            note={tirePressureCheckNote}
          />
          <ReportItem
            label="Tire Change:"
            value={tireChange}
            note={tireChangeNote}
          />
        </div>
        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">Suspension & Steering</h1>
          <ReportItem
            label="Fork Oil Change:"
            value={forkOilChange}
            note={forkOilChangeNote}
          />
          <ReportItem
            label="Rear Shock Inspection:"
            value={rearShockInspection}
            note={rearShockInspectionNote}
          />
        </div>
        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">Cooling System</h1>
          <ReportItem
            label="Coolant Change:"
            value={coolantChange}
            note={coolantChangeNote}
          />
        </div>
        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">
            Electrical System & Lights
          </h1>
          <ReportItem
            label="Battery Voltage Check:"
            value={batteryVoltageCheck}
            note={batteryVoltageCheckNote}
          />
          <ReportItem label="Lights Test:" value={lightsTest} />
          <ReportItem label="Horn Switch Check:" value={hornSwitchCheck} />
          <ReportItem
            label="Electrical Issues Note:"
            value={electricalIssuesNote}
          />
        </div>
        <div className={blockStyle}>
          <h1 className="text-2xl font-bold mb-3">Final Test</h1>
          <ReportItem label="Test Ride:" value={testRide} note={testRideNote} />
          <ReportItem label="Mechanic Note:" value={mechanicNote} />
          <ReportItem label="Next Service Date:" value={nextServiceDate} />
        </div>
      </div>
    </div>
  );
};

export default ServiceReport;

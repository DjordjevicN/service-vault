import React from "react";
/*1. General Inspection
✅ Visual Check for Leaks (Oil, Coolant, Brake Fluid) → Checkbox
📝 Notes (if leaks found): → Text Field

✅ Inspect for Loose Bolts/Nuts → Checkbox
📝 Notes (specific loose parts found): → Text Field

✅ Check for Rust or Corrosion → Checkbox
📝 Notes (corroded areas): → Text Field

2. Engine & Oil System
✅ Engine Oil Changed → Checkbox
📝 Oil Type & Brand Used: → Text Field
📝 Mileage at Oil Change: → Number Field

✅ Oil Filter Replaced → Checkbox
✅ Spark Plugs Replaced → Checkbox
📝 Spark Plug Brand & Gap Measurement: → Text Field

✅ Checked for Oil Leaks → Checkbox
📝 Notes (if leaks found): → Text Field

3. Fuel System
✅ Fuel Filter Replaced → Checkbox
✅ Fuel Injectors/Cleaned or Replaced → Checkbox
📝 Notes on Fuel System Condition: → Text Field

4. Cooling System (If Liquid-Cooled)
✅ Coolant Flushed & Refilled → Checkbox
📝 Coolant Type Used: → Text Field
✅ Radiator & Hoses Inspected → Checkbox
📝 Notes on Any Coolant Leaks/Damage: → Text Field

5. Transmission & Clutch
✅ Clutch Adjusted → Checkbox
📝 Clutch Free Play (in mm): → Number Field
✅ Transmission Fluid Checked → Checkbox
📝 Notes on Gearbox/Transmission Condition: → Text Field

6. Chain & Sprockets (or Belt Drive)
✅ Chain/Belt Lubricated → Checkbox
📝 Chain Slack Measurement (in mm): → Number Field
✅ Sprockets Inspected for Wear → Checkbox
📝 Notes on Chain/Sprocket Wear: → Text Field

7. Brakes & Wheels
✅ Brake Pads Replaced → Checkbox
📝 Pad Thickness Before & After (mm): → Number Field

✅ Brake Fluid Replaced → Checkbox
📝 Fluid Type Used: → Text Field

✅ Tire Pressure Checked → Checkbox
📝 Front PSI / Rear PSI: → Number Fields

✅ Tires Replaced → Checkbox
📝 Brand & Model of New Tires: → Text Field

8. Suspension & Steering
✅ Fork Oil Changed → Checkbox
📝 Oil Weight & Brand Used: → Text Field
✅ Rear Shock Inspected → Checkbox
📝 Notes on Suspension Condition: → Text Field

9. Electrical System & Lights
✅ Battery Voltage Checked → Checkbox
📝 Voltage Reading (V): → Number Field
✅ Lights & Signals Tested → Checkbox
✅ Horn & Switches Checked → Checkbox
📝 Notes on Electrical Issues: → Text Field

10. Final Test Ride & Summary
✅ Test Ride Performed → Checkbox
📝 Issues Found During Test Ride: → Text Field
📝 Additional Notes from Mechanic: → Text Field
📆 Next Service Due Date: → Date Picker*/

const ChecklistItem = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="mb-1 gap-2 flex">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);
const ChecklistNote = ({
  id,
  onChange,
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
}) => (
  <div className="mb-1 gap-2 flex border-b border-gray-200 p-2">
    <textarea
      id={id}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Add a note"
      className="border-none focus:outline-none w-full"
    />
  </div>
);

const ServiceCardForm = () => {
  const [serviceList, setServiceList] = React.useState({
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
  });
  console.log(serviceList);

  const handleChange = (
    key: keyof typeof serviceList,
    value: boolean | string
  ) => {
    setServiceList((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold text-center">
        Full Motorcycle Service Checklist
      </h1>
      <form>
        <h2 className="font-bold text-xl mb-5">General Inspection</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="visualLeaks"
            label="Visual Check for Leaks (Oil, Coolant, Brake Fluid)"
            checked={serviceList.visualLeaks}
            onChange={(value) => handleChange("visualLeaks", value)}
          />
          <ChecklistNote
            id="visualLeakNote"
            label=""
            onChange={(value) => handleChange("visualLeaksNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="looseBolts"
            label="Inspect for Loose Bolts/Nuts (Frame, Engine, Suspension)"
            checked={serviceList.looseBolts}
            onChange={(value) => handleChange("looseBolts", value)}
          />
        </div>

        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="checkForRust"
            label="Check for Rust or Corrosion"
            checked={serviceList.checkForRust}
            onChange={(value) => handleChange("checkForRust", value)}
          />
          <ChecklistNote
            id="checkForRustNote"
            label=""
            onChange={(value) => handleChange("checkForRustNote", value)}
          />
        </div>
        <h2 className="font-bold text-xl mb-5">Engine & Oil System</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="engineOilChange"
            label="Engine Oil Changed"
            checked={serviceList.engineOilChange}
            onChange={(value) => handleChange("engineOilChange", value)}
          />
          <ChecklistNote
            id="engineOilChangeNote"
            label="Oil Type & Brand Used"
            onChange={(value) => handleChange("engineOilChangeNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="oilFilterChange"
            label="Oil Filter Replaced"
            checked={serviceList.oilFilterChange}
            onChange={(value) => handleChange("oilFilterChange", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="sparkPlugChange"
            label="Spark Plugs Replaced"
            checked={serviceList.sparkPlugChange}
            onChange={(value) => handleChange("sparkPlugChange", value)}
          />
          <ChecklistNote
            id="sparkPlugChangeNote"
            label="Spark Plug Brand & Gap Measurement"
            onChange={(value) => handleChange("sparkPlugChangeNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="coolantChange"
            label="Coolant Flushed & Refilled"
            checked={serviceList.coolantChange}
            onChange={(value) => handleChange("coolantChange", value)}
          />
          <ChecklistNote
            id="coolantChangeNote"
            label="Coolant Type Used"
            onChange={(value) => handleChange("coolantChangeNote", value)}
          />
        </div>
        <h2 className="font-bold text-xl mb-5">Fuel System</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="fuelFilterChange"
            label="Fuel Filter Replaced"
            checked={serviceList.fuelFilterChange}
            onChange={(value) => handleChange("fuelFilterChange", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="fuelInjectorChange"
            label="Fuel Injectors Cleaned or Replaced"
            checked={serviceList.fuelInjectorChange}
            onChange={(value) => handleChange("fuelInjectorChange", value)}
          />
          <ChecklistNote
            id="fuelInjectorChangeNote"
            label="Notes on Fuel System Condition"
            onChange={(value) => handleChange("fuelInjectorChangeNote", value)}
          />
        </div>
        <h2 className="font-bold text-xl mb-5">Transmission & Clutch</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="clutchAdjust"
            label="Clutch Adjusted"
            checked={serviceList.clutchAdjust}
            onChange={(value) => handleChange("clutchAdjust", value)}
          />
          <ChecklistNote
            id="clutchAdjustNote"
            label="Clutch Free Play (in mm)"
            onChange={(value) => handleChange("clutchAdjustNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="transmissionFluidCheck"
            label="Transmission Fluid Checked"
            checked={serviceList.transmissionFluidCheck}
            onChange={(value) => handleChange("transmissionFluidCheck", value)}
          />
          <ChecklistNote
            id="transmissionFluidCheckNote"
            label="Notes on Gearbox/Transmission Condition"
            onChange={(value) =>
              handleChange("transmissionFluidCheckNote", value)
            }
          />
        </div>
        <h2 className="font-bold text-xl mb-5">Chain & Sprockets</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="chainLubrication"
            label="Chain/Belt Lubricated"
            checked={serviceList.chainLubrication}
            onChange={(value) => handleChange("chainLubrication", value)}
          />
          <ChecklistNote
            id="chainLubricationNote"
            label="Chain Slack Measurement (in mm)"
            onChange={(value) => handleChange("chainLubricationNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="sprocketInspection"
            label="Sprockets Inspected for Wear"
            checked={serviceList.sprocketInspection}
            onChange={(value) => handleChange("sprocketInspection", value)}
          />
          <ChecklistNote
            id="sprocketInspectionNote"
            label="Notes on Chain/Sprocket Wear"
            onChange={(value) => handleChange("sprocketInspectionNote", value)}
          />
        </div>
        <h2 className="font-bold text-xl mb-5">Brakes & Wheels</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="brakePadChange"
            label="Brake Pads Replaced"
            checked={serviceList.brakePadChange}
            onChange={(value) => handleChange("brakePadChange", value)}
          />
          <ChecklistNote
            id="brakePadChangeNote"
            label="Pad Thickness Before & After (mm)"
            onChange={(value) => handleChange("brakePadChangeNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="brakeFluidChange"
            label="Brake Fluid Replaced"
            checked={serviceList.brakeFluidChange}
            onChange={(value) => handleChange("brakeFluidChange", value)}
          />
          <ChecklistNote
            id="brakeFluidChangeNote"
            label="Fluid Type Used"
            onChange={(value) => handleChange("brakeFluidChangeNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="tirePressureCheck"
            label="Tire Pressure Checked"
            checked={serviceList.tirePressureCheck}
            onChange={(value) => handleChange("tirePressureCheck", value)}
          />
          <ChecklistNote
            id="tirePressureCheckNote"
            label="Front PSI / Rear PSI"
            onChange={(value) => handleChange("tirePressureCheckNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="tireChange"
            label="Tires Replaced"
            checked={serviceList.tireChange}
            onChange={(value) => handleChange("tireChange", value)}
          />
          <ChecklistNote
            id="tireChangeNote"
            label="Brand & Model of New Tires"
            onChange={(value) => handleChange("tireChangeNote", value)}
          />
        </div>
        <h2 className="font-bold text-xl mb-5">Suspension & Steering</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="forkOilChange"
            label="Fork Oil Changed"
            checked={serviceList.forkOilChange}
            onChange={(value) => handleChange("forkOilChange", value)}
          />
          <ChecklistNote
            id="forkOilChangeNote"
            label="Oil Weight & Brand Used"
            onChange={(value) => handleChange("forkOilChangeNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="rearShockInspection"
            label="Rear Shock Inspected"
            checked={serviceList.rearShockInspection}
            onChange={(value) => handleChange("rearShockInspection", value)}
          />
          <ChecklistNote
            id="rearShockInspectionNote"
            label="Notes on Suspension Condition"
            onChange={(value) => handleChange("rearShockInspectionNote", value)}
          />
        </div>
        <h2 className="font-bold text-xl mb-5">Electrical System & Lights</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="batteryVoltageCheck"
            label="Battery Voltage Checked"
            checked={serviceList.batteryVoltageCheck}
            onChange={(value) => handleChange("batteryVoltageCheck", value)}
          />
          <ChecklistNote
            id="batteryVoltageCheckNote"
            label="Voltage Reading (V)"
            onChange={(value) => handleChange("batteryVoltageCheckNote", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="lightsTest"
            label="Lights & Signals Tested"
            checked={serviceList.lightsTest}
            onChange={(value) => handleChange("lightsTest", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="hornSwitchCheck"
            label="Horn & Switches Checked"
            checked={serviceList.hornSwitchCheck}
            onChange={(value) => handleChange("hornSwitchCheck", value)}
          />
        </div>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistNote
            id="electricalIssuesNote"
            label="Notes on Electrical Issues"
            onChange={(value) => handleChange("electricalIssuesNote", value)}
          />
        </div>
        <h2 className="font-bold text-xl mb-5">Final Test Ride & Summary</h2>
        <div className="border border-gray-200 p-4 mb-2">
          <ChecklistItem
            id="testRide"
            label="Test Ride Performed"
            checked={serviceList.testRide}
            onChange={(value) => handleChange("testRide", value)}
          />
          <ChecklistNote
            id="testRideNote"
            label="Issues Found During Test Ride"
            onChange={(value) => handleChange("testRideNote", value)}
          />
          <ChecklistNote
            id="mechanicNote"
            label="Additional Notes from Mechanic"
            onChange={(value) => handleChange("mechanicNote", value)}
          />
          <ChecklistNote
            id="nextServiceDate"
            label="Next Service Due Date"
            onChange={(value) => handleChange("nextServiceDate", value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full"
        >
          Submit Service Card
        </button>
      </form>
    </div>
  );
};

export default ServiceCardForm;

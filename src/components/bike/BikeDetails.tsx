import { useState } from "react";
import BikeServices from "./BikeServices";
import InformationField from "./InformationField";
import OwnerInformation from "./OwnerInformation";

const BikeDetails = () => {
  const [showAllOwners, setShowAllOwners] = useState(false);
  const owners = [1, 2, 3, 4, 5];
  const currentOwner = owners[0];
  const restOfTheOwners = owners.slice(1);
  return (
    <div className="p-4">
      <img
        className="mb-3 max-w-[300px]"
        src="https://images.unsplash.com/photo-1565716697084-4a97983007fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div>
        {currentOwner && (
          <OwnerInformation
            label="Vlasnik"
            value="Nikola Djordjevic"
            from="12.3.2000"
            to="11.1.2019"
            phone="060/123-456"
            currentOwner
          />
        )}
        <p
          className="cursor-pointer text-blue-500 my-3"
          onClick={() => setShowAllOwners(!showAllOwners)}
        >
          {`${showAllOwners ? "Hide" : "Show"} all owners`}
        </p>
        {showAllOwners &&
          restOfTheOwners.map((owner, index) => (
            <OwnerInformation
              key={index}
              label="Vlasnik"
              value="Nikola Djordjevic"
              from="12.3.2000"
              to="11.1.2019"
            />
          ))}
      </div>
      <div>
        <InformationField label="Marka vozila" value="Kawasaki" />
        <InformationField label="Model" value="Z900" />
        <InformationField label="Broj motora" value="SC59E-1234567" />
        <InformationField label="Broj šasije" value="JH2SC5901EK123456" />
        <InformationField label="Godina proizvodnje" value="2014" />
      </div>
      <div className="mt-10">
        <BikeServices />
      </div>
    </div>
  );
};

export default BikeDetails;

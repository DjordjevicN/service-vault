import { useState } from "react";
import BikeServices from "./BikeServices";
import InformationField from "./InformationField";
import OwnerInformation from "./OwnerInformation";
import { useParams } from "react-router-dom";
import { useMotorcycle } from "@/hooks/useMotorcycles";

const BikeDetails = () => {
  const { id } = useParams();
  const [showAllOwners, setShowAllOwners] = useState(false);
  const { data: bike } = useMotorcycle(id as string);
  console.log(bike);

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
      {bike && (
        <div>
          <InformationField label="Marka vozila" value={bike.make} />
          <InformationField label="Model" value={bike.model} />
          <InformationField label="Broj motora" value={bike.engineNumber} />
          <InformationField label="Broj šasije" value={bike.vinNumber} />
          <InformationField label="Godina proizvodnje" value={bike.year} />
        </div>
      )}

      <div className="mt-10">
        <BikeServices />
      </div>
    </div>
  );
};

export default BikeDetails;

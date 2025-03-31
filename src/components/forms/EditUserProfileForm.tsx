import React from "react";
import TextButton from "../TextButton";
import { Input } from "../ui/input";

const EditUserProfileForm = ({ setEditProfileFormOpen }) => {
  return (
    <div>
      <div>
        <TextButton onClick={() => setEditProfileFormOpen()}>close</TextButton>
      </div>
      <div>
        <form action="">
          <Input id="displayName" />
          <Input id="address" />
          <Input id="city" />
          <Input id="country" />
          <Input id="phoneNumber" />
          <Input id="zipcode" />
        </form>
      </div>
    </div>
  );
};

export default EditUserProfileForm;

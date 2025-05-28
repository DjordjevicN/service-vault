import UserProfileForm from "@/forms/UserProfileForm";
import grom from "@/assets/grom.svg";
import { Card } from "../ui/card";
const tips = [
  "Ensure your profile data is complete and accurate.",
  "Username / Email: Used for identification and contact.",
  "City / Country: Powers location-based features like nearby rides and meetups.",
  "Motorcycle: Helps surface relevant content and gear suggestions.",
  "Bio: Gives others context about your riding style and preferences.",
  "Incomplete profiles may limit access to certain features or reduce visibility in ride searches.",
];
const EditUser = () => {
  return (
    <div className="p-6 pb-20 ">
      <div className="grid grid-cols-[2fr_1fr] gap-4 mt-16 items-start">
        <UserProfileForm />
        <Card className="px-6">
          <div className="">
            <div className="flex items-center gap-2">
              <img src={grom} alt="icom" />
              <p className="capitalize font-bold text-white">tip</p>
            </div>
            {tips.map((tip) => {
              return <p className="text-gray55 mt-4">{tip}</p>;
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditUser;

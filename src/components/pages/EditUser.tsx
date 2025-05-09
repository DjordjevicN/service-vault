import UserProfileForm from "@/forms/UserProfileForm";
import grom from "@/assets/grom.svg";
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
    <div className="pb-20">
      <h1 className="text-white text-3xl font-bold mt-10">
        Edit your <span className="text-gradient">profile</span>
      </h1>
      <div className="grid grid-cols-[2fr_1fr] gap-4 mt-16 items-start">
        <UserProfileForm />
        <div>
          <div className="bg-gray80 rounded p-6 w-full">
            <div className="flex items-center gap-2">
              <img src={grom} alt="icom" />
              <p className="capitalize font-bold text-white">tip</p>
            </div>
            {tips.map((tip) => {
              return <p className="text-gray55 mt-4">{tip}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

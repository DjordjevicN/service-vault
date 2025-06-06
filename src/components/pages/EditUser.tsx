import UserProfileForm from "@/forms/UserProfileForm";
import grom from "@/assets/grom.svg";
import { Card } from "../ui/card";
import { EditUserTips } from "@/constants/tips";

const EditUser = () => {
  return (
    <div className="p-6 pb-20 standardMaxWidth">
      <div className="grid grid-cols-[2fr_1fr] gap-4 mt-16 items-start">
        <UserProfileForm />
        <Card className="px-6">
          <div>
            <div className="flex items-center gap-2">
              <img src={grom} alt="icom" />
              <p className="capitalize font-bold text-white">tip</p>
            </div>
            {EditUserTips.map((tip) => {
              return <p className="text-gray55 mt-2">{tip}</p>;
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditUser;

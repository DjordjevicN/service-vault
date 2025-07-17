import { avatarData } from "../avatarData";
import AvatarCard from "./AvatarCard";

const ListOfAvatars = ({
  handleImageChange,
}: {
  handleImageChange: (url: string) => void;
}) => {
  return (
    <div className="flex gap-4 flex-wrap max-h-[300px] overflow-auto">
      {avatarData.map((avatar) => {
        return (
          <div
            onClick={() => handleImageChange(avatar.url)}
            className="cursor-pointer"
            key={avatar.id}
          >
            <AvatarCard avatar={avatar} />
          </div>
        );
      })}
    </div>
  );
};

export default ListOfAvatars;

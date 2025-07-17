import { IAvatar } from "../AvatarTypes";

const AvatarCard = ({ avatar }: { avatar: IAvatar }) => {
  return (
    <div
      className="w-20 h-20 rounded-full"
      style={{
        backgroundColor: avatar.backgroundColor,
        backgroundImage: `url(${avatar.url})`,
        backgroundSize: "cover",
        border: `4px solid ${avatar.borderColor}`,
      }}
    ></div>
  );
};

export default AvatarCard;

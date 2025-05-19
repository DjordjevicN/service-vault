import { USER_AVATAR_PLACEHOLDER } from "@/constants/placeholders";

const Avatar = ({
  url = USER_AVATAR_PLACEHOLDER,
  size = 48,
}: {
  url?: string;
  size?: number;
}) => {
  return (
    <div className="box-gradient">
      <img
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
        }}
        className="rounded-full"
        src={url ? url : USER_AVATAR_PLACEHOLDER}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;

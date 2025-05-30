import avatarBackup from "@/assets/placeholderAvatars/male.webp";

const Avatar = ({
  url = avatarBackup,
  size = 48,
}: {
  url?: string;
  size?: number;
}) => {
  return (
    <div>
      <img
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
        }}
        className="rounded-full"
        src={url ? url : avatarBackup}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;

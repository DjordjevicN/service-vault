import { avatarDataDefault } from "@/features/avatars/avatarData";
import { IAvatar } from "@/features/avatars/AvatarTypes";
import AvatarCard from "@/features/avatars/components/AvatarCard";
import AvatarEditorOptions from "@/features/avatars/components/AvatarEditorOptions";
import ListOfAvatars from "@/features/avatars/components/ListOfAvatars";
import { useState } from "react";

const Avatars = () => {
  const [currentAvatar, setCurrentAvatar] =
    useState<IAvatar>(avatarDataDefault);
  const previewAvatar = currentAvatar || avatarDataDefault;

  const handleImageChange = (url: string) => {
    setCurrentAvatar({ ...currentAvatar, url: url });
  };

  const handleBorderColorChange = (borderColor: string) => {
    setCurrentAvatar({ ...currentAvatar, borderColor: borderColor });
  };

  return (
    <div className="mt-2 standardMaxWidth">
      <div className="grid grid-cols-[3fr_1fr] gap-4">
        <div>
          <AvatarEditorOptions
            color={previewAvatar.borderColor}
            handleBorderColorChange={handleBorderColorChange}
          />
          <ListOfAvatars handleImageChange={handleImageChange} />
        </div>
        <div>{previewAvatar && <AvatarCard avatar={previewAvatar} />}</div>
      </div>
    </div>
  );
};

export default Avatars;

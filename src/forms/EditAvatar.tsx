import ImageUploaderCropper from "@/components/ImageUploaderCropper";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { USER_TYPES } from "@/constants/userTypes";
import { RootState } from "@/store";
import { storeUser } from "@/store/userSlice";
import { updateUserProfile } from "@/supabase/userFetchers";
import { AuthUser } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditAvatar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth) as AuthUser | null;
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleImageCropped = (image: string) => {
    setCroppedImage(image);
  };

  const { mutate: updateUser } = useMutation({
    mutationFn: ({ auth, newUser }: { auth: AuthUser; newUser: USER_TYPES }) =>
      updateUserProfile(auth.id, newUser),
    onSuccess: (data) => {
      dispatch(storeUser(data));
      window.location.href = "/profile";
    },
  });
  const handleSaveImage = () => {
    if (!croppedImage || !auth || !user) return;

    const updatedUser: USER_TYPES = {
      ...user,
      image: croppedImage,
    };

    updateUser({ auth, newUser: updatedUser });
  };

  return (
    <div className="flex justify-center gap-6 p-6 standardMaxWidth">
      <Card>
        <ImageUploaderCropper onCropped={handleImageCropped} />
      </Card>
      <Card className="w-[320px] p-6 flex justify-center items-center flex-col">
        {croppedImage && (
          <>
            <div className="mt-2">
              <img
                src={croppedImage}
                alt="Cropped"
                className="w-48 h-48 object-cover rounded-full"
              />
            </div>
            <Button onClick={handleSaveImage}>Save</Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default EditAvatar;

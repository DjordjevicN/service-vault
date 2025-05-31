import { useDispatch, useSelector } from "react-redux";
import { updateMeetForm } from "@/store/meetFormSlice";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import ImageUploaderCropper from "@/components/ImageUploaderCropper";
import { RootState } from "@/store";

const MediaSection = () => {
  const dispatch = useDispatch();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const meetForm = useSelector((state: RootState) => state.meetForm) as {
    image: string | null;
  };
  const handleImageCropped = (image: string) => {
    setCroppedImage(image);
  };
  const handleSaveImage = () => {
    if (!croppedImage) return;
    dispatch(updateMeetForm({ key: "image", value: croppedImage }));
  };
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-2">
      <Card className="mx-auto">
        <ImageUploaderCropper onCropped={handleImageCropped} />
      </Card>
      <Card className="p-6 flex justify-center items-center flex-col">
        {meetForm.image || croppedImage ? (
          <>
            <div className="mt-2">
              <img
                src={croppedImage || meetForm.image || ""}
                alt="Cropped"
                className="w-48 h-48 object-cover"
              />
            </div>
            <Button onClick={handleSaveImage}>Save</Button>
          </>
        ) : (
          ""
        )}
      </Card>
    </div>
  );
};

export default MediaSection;

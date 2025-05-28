import ImageUploaderCropper from "@/components/ImageUploaderCropper";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const EditAvatar = () => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleImageCropped = (image: string) => {
    setCroppedImage(image);
  };
  return (
    <div className="flex justify-center gap-6 p-6">
      <Card>
        <ImageUploaderCropper onCropped={handleImageCropped} />
      </Card>
      <Card className="w-[320px] p-6 flex justify-center items-center flex-col">
        {croppedImage && (
          <div className="mt-4">
            <img
              src={croppedImage}
              alt="Cropped"
              className="w-48 h-48 object-cover rounded-full"
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default EditAvatar;

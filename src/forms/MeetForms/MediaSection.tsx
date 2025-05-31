import { useDispatch, useSelector } from "react-redux";
import { updateMeetForm } from "@/store/meetFormSlice";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import ImageUploaderCropper from "@/components/ImageUploaderCropper";
import { RootState } from "@/store";
import StepController from "@/components/StepController";

const MediaSection = ({
  section,
  handleReset,
  handlePrevious,
  handleNext,
  maxSection,
}: {
  section: number;
  handleReset: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  maxSection: number;
}) => {
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
      <div className="p-6 flex justify-between items-center flex-col border">
        <div>
          {meetForm.image || croppedImage ? (
            <>
              <div className="mt-2">
                <img
                  src={croppedImage || meetForm.image || ""}
                  alt="Cropped"
                  className="w-48 h-48 object-cover"
                />
              </div>
              <Button
                className="mt-4"
                onClick={() => {
                  handleNext();
                  handleSaveImage();
                }}
              >
                {!croppedImage ? "Save" : "Upload"}
              </Button>
            </>
          ) : (
            <div className="w-48 h-48"></div>
          )}
        </div>
        <div className="ml-auto">
          <StepController
            section={section}
            handleNext={handleNext}
            handleReset={handleReset}
            handlePrevious={handlePrevious}
            maxSection={maxSection}
          />
        </div>
      </div>
    </div>
  );
};

export default MediaSection;

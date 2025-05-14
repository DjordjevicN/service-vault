import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateMeetForm } from "@/store/formsSlice";
import Button from "@/components/UI/Button";
import getCroppedImg from "@/components/utils/cropImage";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";

const MediaSection = () => {
  const dispatch = useDispatch();
  const { image } = useSelector((state: RootState) => state.meetForm);

  const [imageSrc, setImageSrc] = useState<string | null>(image || null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const cropped = await getCroppedImg(imageSrc!, croppedAreaPixels);
      setCroppedImage(cropped);
      // Update Redux store with cropped image
      dispatch(updateMeetForm({ key: "image", value: cropped }));
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, dispatch]);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4">
      <div>
        <h2 className="text-gradient text-2xl w-fit">Add Rider Image</h2>
        <p className="text-gray55 mt-6">Upload and crop rider image.</p>
      </div>
      <div>
        <div
          {...getRootProps()}
          className="border-dashed border-2 p-4 mt-4 cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-gray55">
            Drag 'n' drop or click to select an image
          </p>
        </div>
        <div>
          {imageSrc && (
            <div className="relative h-[300px] ">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
        </div>
        {croppedImage && (
          <div className="mt-4">
            <h4 className="text-sm text-white mb-1">Preview</h4>
            <img
              src={croppedImage}
              alt="Cropped"
              className="w-48 h-48 object-cover"
            />
          </div>
        )}
        <Button wrapperClassName="mt-2" onClick={showCroppedImage}>
          Crop Image
        </Button>
      </div>
    </div>
  );
};

export default MediaSection;

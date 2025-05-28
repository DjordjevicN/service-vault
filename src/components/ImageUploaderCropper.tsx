import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/components/utils/cropImage";
import { Button } from "./ui/Button";

type Props = {
  onCropped: (image: string) => void;
};

const ImageUploaderCropper = ({ onCropped }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

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

  const onCropComplete = useCallback((_: any, areaPixels: any) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const cropImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropped(cropped);
    } catch (e) {
      console.error("Crop failed:", e);
    }
  }, [imageSrc, croppedAreaPixels, onCropped]);

  return (
    <div>
      {imageSrc ? (
        <div className="relative w-[320px] h-[320px] mt-4">
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
      ) : (
        <div
          {...getRootProps()}
          className="border-dashed border-2 p-4 mt-4 cursor-pointer w-[320px] h-[320px] flex items-center justify-center "
        >
          <input {...getInputProps()} />
          <p className="text-gray55 text-sm">
            Drag 'n' drop or click to select an image
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={cropImage} className="mt-4">
          Crop Image
        </Button>
        <Button onClick={() => setImageSrc(null)} className="mt-4">
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ImageUploaderCropper;

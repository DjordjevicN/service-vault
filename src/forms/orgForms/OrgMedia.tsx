import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import getCroppedImg from "@/components/utils/cropImage";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateOrgForm } from "@/store/orgFormSlice";

const OrgMedia = () => {
  const dispatch = useDispatch();
  const { image } = useSelector((state: RootState) => state.organizationForm);

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
      dispatch(updateOrgForm({ key: "image", value: cropped }));
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, dispatch]);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-2">
      <Card className="px-6">
        <div>
          <h2 className="w-fit">
            Add <span className="text-gradient">Meet Image</span>
          </h2>
          <p className="text-gray55 mt-6">Upload and crop rider image.</p>
        </div>
      </Card>
      <Card className="px-6">
        <div>
          <div
            {...getRootProps()}
            className="border-dashed border-2 p-4 mt-2 cursor-pointer"
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
            <div className="mt-2">
              <h4 className="text-sm text-white mb-1">Preview</h4>
              <img
                src={croppedImage}
                alt="Cropped"
                className="w-48 h-48 object-cover"
              />
            </div>
          )}
          <Button className="mt-6" onClick={showCroppedImage}>
            Crop Image
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrgMedia;

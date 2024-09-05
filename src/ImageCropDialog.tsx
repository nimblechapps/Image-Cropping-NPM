import React, { useState } from "react";
import getCroppedImg from "./cropImage";
import Slider from "react-slick";
import Cropper from "./Cropper"
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";import { type } from "os";
import { number, string } from "prop-types";



// Define the correct AspectRatio type
type AspectRatio = {
  value: number, // use lowercase 'number' for TypeScript
  text: string  // use lowercase 'string' for TypeScript
};

// Aspect ratios for cropping options
const aspectRatios: AspectRatio[] = [
  { value: 4 / 3, text: "4/3" },
  { value: 16 / 9, text: "16/9" },
  { value: 1 / 2, text: "1/2" },
];


interface Image {
  id: number;
  imageUrl: string;
  file: File | null;
}

interface ImageCropDialogProps {
  id?: number;
  imageUrl?: string;
  cropInit?: { x: number; y: number };
  zoomInit?: number;
  aspectInit?: { value: number; text: string };
  onDoneAll: () => void;
  setCroppedImageFor: (
    id: number,
    crop: { x: number; y: number },
    zoom: number,
    aspect: { value: number; text: string },
    fileUrl: string,
    createdFile: File
  ) => void;
  images: Image[];
  setSelectedImage: any;
  currentImage: any;
  setCurrentImage: (url: string) => void;
  cropImageId: any;
  setCroppedImageId: (id: number) => void;
  imageName: string | null;
  setImageName: (name: string) => void;
}

const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  id,
  imageUrl,
  cropInit = { x: 0, y: 0 },
  zoomInit = 1,
  aspectInit = aspectRatios[0],
  onDoneAll,
  setCroppedImageFor,
  images,
  setSelectedImage,
  currentImage,
  setCurrentImage,
  cropImageId,
  setCroppedImageId,
  imageName,
  setImageName,
}) => {
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);

  const onZoomChange = (zoom: number) => setZoom(zoom);

  const onAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseFloat(e.target.value);
    const ratio = aspectRatios.find((ratio) => ratio.value === value);
    if (ratio) {
      setAspect(ratio);
    }
  };

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const { fileUrl, createdFile } = await getCroppedImg(currentImage, croppedAreaPixels);
    setCroppedImageFor(cropImageId, crop, zoom, aspect, fileUrl, createdFile);
  };

  const onResetImage = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspect(aspectRatios[0]);
  };

  const handleThumbnailClick = (image: Image, index: number) => {
    setCurrentImage(image?.imageUrl);
    setImageName(image?.file?.name || "");
    setCroppedImageId(index);
    onResetImage();
  };

  const SampleNextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <div className="nextArrow" onClick={onClick}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 18.88L15 12.88L9 6.88"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  const SamplePrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <div className="prevArrow" onClick={onClick}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 18.88L9 12.88L15 6.88"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: "20px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <div className="ss">
        <div className="crop-container">
          <Cropper
            image={currentImage || ""}
            zoom={zoom}
            crop={crop}
            aspect={aspect.value}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
            rotation={0}             // Provide the rotation value
            minZoom={1}                     // Set the minimum zoom level
            maxZoom={3}                     // Set the maximum zoom level
            cropShape="rect"                // Set the crop shape, e.g., "rect" or "round"
            objectFit="contain"             // Set object fit, e.g., "contain" or "cover"
            zoomSpeed={1}                   // Default zoom speed (can adjust as necessary)
            classes={{}} 
            style={{}}                   // If you have CSS classes to pass
            restrictPosition={true}         // Restrict image movement within the crop area
            mediaProps={{}}  
          />
        </div>
      </div>
      <div className="controls">
        <div className="controls-upper-area">
          <div className="slider-container">
            <Slider {...settings}>
              {images?.map((image) => (
                <div key={image.id} className={image?.file?.name === imageName ? "sliderWrapper active" : "sliderWrapper"}>
                  <span className="slideInnerDiv">
                    <img src={image?.imageUrl || ""} alt="" onClick={() => handleThumbnailClick(image, image.id)} />
                  </span>
                </div>
              ))}
            </Slider>
          </div>
          <span className="imageName">{imageName}</span>
        </div>
        <div className="button-area">
          <div className="leftBtns">
            <button className="btn cropBtn" onClick={onCrop}>
              Crop
            </button>
            <button className="btn resetBtn" onClick={onResetImage}>
              Reset
            </button>
          </div>
          <button className="btn purpleBtn" onClick={onDoneAll}>
            Done All
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCropDialog;

import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Aspect ratios for cropping options
const aspectRatios = [
  { value: 4 / 3, text: "4/3" },
  { value: 16 / 9, text: "16/9" },
  { value: 1 / 2, text: "1/2" },
];

const ImageCropDialog = ({
  id,
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onDoneAll,
  setCroppedImageFor,
  resetImage,
  images,
  setSelectedImage,
  currentImage,
  setCurrentImage,
  cropImageId,
  setCroppedImageId,
  imageName,
  setImageName
}) => {

  // Default values if not provided
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

   // Handle crop changes
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  // Handle zoom changes
  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  // Handle aspect ratio changes
  const onAspectChange = (e) => {
    const value = e.target.value;
    const ratio = aspectRatios.find((ratio) => ratio.value == value);
    setAspect(ratio);
  };

    // Handle crop completion
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

    // Handle the cropping process
  const onCrop = async () => {
    const { fileUrl,
    createdFile} = await getCroppedImg(currentImage, croppedAreaPixels);
    setCroppedImageFor(cropImageId, crop, zoom, aspect, fileUrl,createdFile);
  };

    // Reset cropping settings to default
  const onResetImage = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspect(aspectRatios[0]);
  };

   // Handle thumbnail click to set current image and reset crop settings
  const handleThumbnailClick =async (image,index) => {
    setCurrentImage(image?.imageUrl)
    setImageName(image?.file?.name)
    setCroppedImageId(index)
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspect(aspectRatios[0]);
  };


    // Custom arrow components for slider navigation
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className='nextArrow'
        onClick={onClick}
      >
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18.88L15 12.88L9 6.88" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className='prevArrow'
        onClick={onClick} 
      >
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18.88L9 12.88L15 6.88" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    );
  }


    // Slider settings for thumbnail navigation
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: '20px',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <>
    <div className="ss" >
      {/* <div className="backdrop"></div> */}
      <div className="crop-container">
        <Cropper
          image={currentImage}
          zoom={zoom}
          crop={crop}
          aspect={aspect.value}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
       {/* <div className="crop-container">
      <CropperImage
        image={currentImage}
        zoom={zoom}
        crop={crop}
        aspect={aspect.value}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
        />
      </div> */}
    </div>
      <div className="controls">
        <div className="controls-upper-area">
          {/* <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(e) => {
              onZoomChange(e.target.value);
            }}
            className="slider"
          ></input> */}
        <div className="slider-container">
          <Slider {...settings}>
              {/* <div>
                <h3>1</h3>
              </div> */}
              {images?.map((image)=>(
                <>
                <div className={image?.file?.name === imageName  ?"sliderWrapper active" :"sliderWrapper"} >
                  <span className="slideInnerDiv">
                    <img
                    // width={"100px"}
                    // style={{margin:"4px"}}
                    src={image?.imageUrl ? image?.imageUrl: image.imageUrl}
                    alt=""
                    onClick={() => handleThumbnailClick(image,image?.id)}
                    />
                  </span>
                </div>
                    </>
              ))}
            </Slider>
        </div>
        <span className="imageName">{imageName}</span>
        </div>
        
        <div className="button-area">
          <div className="leftBtns">
            <button className="btn cropBtn" onClick={onCrop}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_51_125)">
                  <path d="M1.66675 5.88002H12.3334C13.2668 5.88002 13.7335 5.88002 14.0901 6.06168C14.4037 6.22147 14.6586 6.47644 14.8184 6.79004C15.0001 7.14656 15.0001 7.61327 15.0001 8.54669V19.2134M18.3334 15.88L7.66675 15.88C6.73333 15.88 6.26662 15.88 5.9101 15.6984C5.59649 15.5386 5.34153 15.2836 5.18174 14.97C5.00008 14.6135 5.00008 14.1468 5.00008 13.2134V2.54669" stroke="#6941C6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_51_125">
                  <rect width="20" height="20" fill="white" transform="translate(0 0.880005)"/>
                  </clipPath>
                  </defs>
              </svg>
              Crop
            </button>
            <button className="btn resetBtn" onClick={onResetImage}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66675 9.21334C1.66675 9.21334 3.33757 6.93685 4.69494 5.57854C6.05232 4.22023 7.92808 3.38 10.0001 3.38C14.1422 3.38 17.5001 6.73787 17.5001 10.88C17.5001 15.0221 14.1422 18.38 10.0001 18.38C6.58084 18.38 3.69601 16.0919 2.79322 12.9633M1.66675 9.21334V4.21334M1.66675 9.21334H6.66675" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Reset
            </button>
          </div>
          <button className="btn purpleBtn" onClick={onDoneAll}>Done All</button>
        </div>
      </div>
      </>
  );
};

export default ImageCropDialog;



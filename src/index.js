import React from 'react';
import "./index.css";
import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";

function CropingImageMultiple({onUpload}) {
  const [images, setImages] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [selectedImage,setSelectedImage]=useState(null)
  const [currentImage, setCurrentImage] = useState("");
  const [cropImageId, setCroppedImageId] = useState("")




  const onCancel = () => {
    setSelectedImage(null)
  };


  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl, file) => {
    const newImageList = images.map((image) =>(
      image.id === id 
      ? { ...image, crop, zoom, aspect, croppedImageUrl, file , cropped: true }
      : image
      )
    );
  
    setImages(newImageList);
    setCroppedImages((prevCropped) => [...prevCropped, croppedImageUrl]);
    const nextUncroppedImage = newImageList.find((image) => !image.croppedImageUrl)
    if (nextUncroppedImage) {
      setCurrentImage(nextUncroppedImage?.imageUrl)
      setSelectedImage(nextUncroppedImage);
      setCroppedImageId(nextUncroppedImage?.id)
    } else {
      setSelectedImage(null); // Close cropper if all images are cropped
    }
   
  };
  const resetImage = (id) => {
    setCroppedImageFor(id);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e?.target?.files);
    const newImages = files.map((file, index) => ({
      id: index,
      imageUrl: URL.createObjectURL(file),
      croppedImageUrl: null,
      file,
      cropped: false, // Initialize cropped status
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setCurrentImage(newImages[0]?.imageUrl)
    setSelectedImage(newImages[0]);
    setCroppedImageId(newImages[0]?.id)
  };
 
  


  const deleteImage = (imageToDelete) => {
    // Filter out the image that needs to be deleted from images array
    const updatedImages = images.filter((image) => image.croppedImageUrl !== imageToDelete);
    // Filter out the corresponding cropped image (if it exists) from croppedImages array
    const updatedCroppedImages = croppedImages.filter((croppedUrl) => croppedUrl !== imageToDelete);
  
    // Update the states with the new arrays
    setImages(updatedImages);
    setCroppedImages(updatedCroppedImages);
  
  };
  
  const handleUpload = () => {
    if (onUpload) {
      const uploadedImageDetails = images.filter((image) => image.croppedImageUrl);
      onUpload(uploadedImageDetails);
    }
  };

  return (
    <div>
      {selectedImage ? (
        <ImageCropDialog
          id={selectedImage?.id}
          imageUrl={selectedImage?.imageUrl}
          cropInit={selectedImage?.crop}
          zoomInit={selectedImage?.zoom}
          aspectInit={selectedImage?.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
          images={images}
          setSelectedImage={setSelectedImage}
          setCurrentImage={setCurrentImage}
          currentImage={currentImage}
          cropImageId={cropImageId}
          setCroppedImageId={setCroppedImageId}
        />
      ) : null}
        <input type="file" onChange={handleFileChange} multiple/>
        {/* <img src={image?.imageUrl} alt="selectedImage"/> */}
      {croppedImages.map((imge) => (
        <div className="imageCard" key={imge.id}>
       
          <button onClick={()=>deleteImage(imge)}>delete image</button>

          <img
            src={imge ? imge: imge.imageUrl}
            alt=""
            onClick={() => {
              console.log(imge);
              // setSelectedImage(imge);
            }}
          />
        </div>
      ))}

      { croppedImages?.length >0  &&  <button onClick={handleUpload}>upload image</button>}
           
    </div>
  );
}

export default CropingImageMultiple
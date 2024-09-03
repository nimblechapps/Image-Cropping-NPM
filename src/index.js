import React from 'react';
import "./index.css";
import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CropingImageMultiple({onUpload,onCancel}) {
    // State to hold the list of images selected by the user
  const [images, setImages] = useState([]);
   // State to hold the list of cropped images
  const [croppedImages, setCroppedImages] = useState([]);
  console.log('croppedImages', croppedImages)
  const [selectedImage,setSelectedImage]=useState(null)
  const [currentImage, setCurrentImage] = useState("");
  const [cropImageId, setCroppedImageId] = useState("")
  const [cropImage, setCropImage] = useState(null)
  const [imageName, setImageName] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true);

 // Function to finalize cropping for all images and update the state
  const onDoneAll = () => {
    console.log('images', images)
        // Mapping through the images array to prepare cropped images
    const newImages = images.map((file, index) => {
      return {
        id: file?.id,
        imageUrl:file?.imageUrl,
        croppedImageUrl: file?.croppedImageUrl === null ?  file?.imageUrl : file?.croppedImageUrl ,
        file:file?.file,
        cropped: file.cropped || false,
      };
    }).filter(Boolean); // Filter out any null entries from the array
    setCroppedImages(newImages);
    // Assuming setImages is the state updater
    setImages(newImages);
    handleClose();
  };

  // Function to set the cropped image details for a specific image
  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl, file) => {
    console.log('file', file)
    // Update the images array with the newly cropped image details
    const newImageList = images.map((image) =>(
      image.id === id 
      ? { ...image, crop, zoom, aspect, croppedImageUrl, file:image?.file , cropped: true }
      : image
      )
    );
      // Find the name of the cropped image
    const imageCropName = images.find((image)=> image.id === id)
  // Update images state
    setImages(newImageList);
    // setCroppedImages((prevCropped) => [...prevCropped, croppedImageUrl]);
    // Update cropped images state with the cropped image and its name
    setCroppedImages((prevCropped) => [
      ...prevCropped, 
      { croppedImageUrl, imageCropName: imageCropName?.file?.name }
    ]);
        // Find the next uncropped image
    const nextUncroppedImage = newImageList.find((image) => !image.croppedImageUrl)
      // If there is an uncropped image, set it as the current image
    if (nextUncroppedImage) {
      setCurrentImage(nextUncroppedImage?.imageUrl)
      setSelectedImage(nextUncroppedImage);
      setCroppedImageId(nextUncroppedImage?.id)
      setImageName(nextUncroppedImage?.file?.name)
    } else {
          // If all images are cropped, clear the selection and close the modal
      setSelectedImage(null);
      handleClose(); // Close cropper if all images are cropped
    }

  };

    // Function to reset the cropping of an image
  const resetImage = (id) => {
    setCroppedImageFor(id);
  };

    // Function to handle file selection by the user
  const handleFileChange = (e) => {
    const files = Array.from(e?.target?.files);
      // Map through the selected files and create image objects
    const newImages = files.map((file, index) => ({
      // id: new Date().getTime() + index,
      id: index,
      imageUrl: URL.createObjectURL(file),
      croppedImageUrl: null,
      file,
      cropped: false, // Initialize cropped status
    }));
      // Update the images state with the new images
    setImages((prevImages) => [...prevImages, ...newImages]);
        // Set the first image as the current image for cropping
    setCurrentImage(newImages[0]?.imageUrl)
    setSelectedImage(newImages[0]);
    setCroppedImageId(newImages[0]?.id)
    setImageName(newImages[0]?.file?.name)
    handleShow();
  };
 

    // Function to delete an image
  const deleteImage = (imageToDelete) => {
    // Filter out the image that needs to be deleted from images array
    const updatedImages = images.filter((image) => image.croppedImageUrl !== imageToDelete);

    // Filter out the corresponding cropped image (if it exists) from croppedImages array
    const updatedCroppedImages = croppedImages.filter((croppedUrl) => croppedUrl?.imageUrl ? croppedUrl?.croppedImageUrl !==  imageToDelete: croppedUrl!== imageToDelete);
  
    // Update the states with the new arrays
    setImages(updatedImages);
    setCroppedImages(updatedCroppedImages);
  
  };

     // Function to handle the final upload of cropped images
  const handleUpload = () => {
    if (onUpload) {
      // Filter images to include only those with cropped images
      const uploadedImageDetails = images.filter((image) => image.croppedImageUrl);
            // Call the onUpload function with the cropped images
      onUpload(uploadedImageDetails);
    }
  };


// Function to clear all images and reset the component state
  const handleClearImage = ()=> {
    setImages([]);
    setCroppedImages([]);
    setSelectedImage("")
    setCroppedImageId("")
    if (onCancel) { 
      onCancel("clearImage");
    }
  }

  return (
    <div className='fileuploadComponent'>
      <div className='fileuploadWrapper'>
        <div className='fileUpload'>
          <div className='leftPart'>
            <input type="file" onChange={handleFileChange} multiple/>
            <span className=''>Choose Files</span>
          </div>
          <div className='rightPart'>
            Add files here by clicking on the choose files button
          </div>
        </div>
      </div>
      <div className='fileUploadList'>
        <span className='fileCount'> {croppedImages.length} files uploaded</span>
        {croppedImages.map((imge) => (
          <>
          {console.log("imge",imge,imageName  )}
          <div className="imageCard" key={imge.id}>
            <div className='imageLeftPart'>
              <img
                src={imge?.croppedImageUrl ? imge?.croppedImageUrl : imge }
                alt=""
              />
              <div className='imageDetails'>
                <span className='imgname'>
                  { imge?.imageCropName ? imge?.imageCropName :imge?.file?.name}
                </span>
                <span className='imgSize'>
                  200 KB
                </span>
              </div>
            </div>
            <button className='deleteBtn' onClick={()=>deleteImage(imge?.imageUrl ?imge?.croppedImageUrl : imge)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 5.00002V4.33335C13.3333 3.39993 13.3333 2.93322 13.1517 2.5767C12.9919 2.2631 12.7369 2.00813 12.4233 1.84834C12.0668 1.66669 11.6001 1.66669 10.6667 1.66669H9.33333C8.39991 1.66669 7.9332 1.66669 7.57668 1.84834C7.26308 2.00813 7.00811 2.2631 6.84832 2.5767C6.66667 2.93322 6.66667 3.39993 6.66667 4.33335V5.00002M8.33333 9.58335V13.75M11.6667 9.58335V13.75M2.5 5.00002H17.5M15.8333 5.00002V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9683C15.3212 17.4387 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4387 4.43915 16.9683C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00002" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

          </div>
          </>

        ))}

      </div>
        { croppedImages?.length >0  && 
        <div className='submitBtns'>
          <button className='purpleBtn btn' onClick={handleUpload}>Submit</button>
          <button className='btn' onClick={handleClearImage}>Cancel</button>
        </div> 
        }


    <Modal
      className={"custom-modal "}
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton>
          <Modal.Title>Crop Images</Modal.Title>
        </Modal.Header>
        {selectedImage ? (
        <ImageCropDialog
          id={selectedImage?.id}
          imageUrl={selectedImage?.imageUrl}
          cropInit={selectedImage?.crop}
          zoomInit={selectedImage?.zoom}
          aspectInit={selectedImage?.aspect}
          onDoneAll={onDoneAll}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
          images={images}
          setSelectedImage={setSelectedImage}
          setCurrentImage={setCurrentImage}
          currentImage={currentImage}
          cropImageId={cropImageId}
          setCroppedImageId={setCroppedImageId}
          imageName={imageName}
          setImageName={setImageName}
        />
      ) : null}  
      </Modal.Body>
    </Modal>  
    </div>
  );
}

export default CropingImageMultiple
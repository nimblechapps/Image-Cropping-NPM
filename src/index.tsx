import React, { useState } from 'react';
import "./index.css";
import ImageCropDialog from "./ImageCropDialog";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Define the props for the component
interface CropingImageMultipleProps {
  onUpload: (images: CroppedImage[]) => void;
  onCancel: (action: string) => void;
}

// Define types for the image and cropped image states
interface Image {
  id: number;
  imageUrl: string;
  croppedImageUrl: string | null;
  file: File;
  cropped: boolean;
  crop?: any; // Specify more concrete types if necessary
  zoom?: any; // Specify more concrete types if necessary
  aspect?: any; // Specify more concrete types if necessary
}

interface CroppedImage {
  croppedImageUrl: string;
  imageCropName: string | undefined;
}

const CropingImageMultiple: React.FC<CropingImageMultipleProps> = ({ onUpload, onCancel }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [croppedImages, setCroppedImages] = useState<CroppedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [cropImageId, setCroppedImageId] = useState<number | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onDoneAll = () => {
    const newImages = images.map((file) => ({
      ...file,
      croppedImageUrl: file.croppedImageUrl === null ? file.imageUrl : file.croppedImageUrl,
      cropped: true,
    }));
    setCroppedImages(newImages.map(image => ({
      croppedImageUrl: image.croppedImageUrl!,
      imageCropName: image.file?.name
    })));
    setImages(newImages);
    handleClose();
  };

  const setCroppedImageFor = (
    id: number,
    crop: any,
    zoom: any,
    aspect: any,
    croppedImageUrl: string,
    file: File
  ) => {
    const newImageList = images.map((image) =>
      image.id === id
        ? { ...image, crop, zoom, aspect, croppedImageUrl, file, cropped: true }
        : image
    );
    const imageCropName = images.find((image) => image.id === id)?.file?.name;
    setImages(newImageList);
    setCroppedImages((prevCropped) => [
      ...prevCropped,
      { croppedImageUrl, imageCropName }
    ]);

    const nextUncroppedImage = newImageList.find((image) => !image.croppedImageUrl);
    if (nextUncroppedImage) {
      setCurrentImage(nextUncroppedImage?.imageUrl);
      setSelectedImage(nextUncroppedImage);
      setCroppedImageId(nextUncroppedImage?.id);
      setImageName(nextUncroppedImage?.file?.name || "");
    } else {
      setSelectedImage(null);
      handleClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file, index) => ({
      id: index,
      imageUrl: URL.createObjectURL(file),
      croppedImageUrl: null,
      file,
      cropped: false,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setCurrentImage(newImages[0]?.imageUrl || "");
    setSelectedImage(newImages[0]);
    setCroppedImageId(newImages[0]?.id || null);
    setImageName(newImages[0]?.file?.name || "");
    handleShow();
  };

  const deleteImage = (imageToDelete: string) => {
    const updatedImages = images.filter((image) => image.croppedImageUrl !== imageToDelete);
    const updatedCroppedImages = croppedImages.filter(
      (croppedUrl) => croppedUrl.croppedImageUrl !== imageToDelete
    );
    setImages(updatedImages);
    setCroppedImages(updatedCroppedImages);
  };

  const handleUpload = () => {
    if (onUpload) {
      const uploadedImageDetails :any = images.filter((image) => image.croppedImageUrl);
      onUpload(uploadedImageDetails);
    }
  };

  const handleClearImage = () => {
    setImages([]);
    setCroppedImages([]);
    setSelectedImage(null);
    setCroppedImageId(null);
    if (onCancel) {
      onCancel("clearImage");
    }
  };

  return (
    <div className='fileuploadComponent'>
      <div className='fileuploadWrapper'>
        <div className='fileUpload'>
          <div className='leftPart'>
            <input type="file" onChange={handleFileChange} multiple />
            <span>Choose Files</span>
          </div>
          <div className='rightPart'>
            Add files here by clicking on the choose files button
          </div>
        </div>
      </div>
      <div className='fileUploadList'>
        <span className='fileCount'> {croppedImages.length} files uploaded</span>
        {croppedImages.map((image, index) => (
          <div className="imageCard" key={index}>
            <div className='imageLeftPart'>
              <img src={image.croppedImageUrl} alt="" />
              <div className='imageDetails'>
                <span className='imgname'>{image.imageCropName}</span>
                <span className='imgSize'>200 KB</span>
              </div>
            </div>
            <button className='deleteBtn' onClick={() => deleteImage(image.croppedImageUrl)}>
              {/* SVG icon here */}
            </button>
          </div>
        ))}
      </div>
      {croppedImages.length > 0 && (
        <div className='submitBtns'>
          <button className='purpleBtn btn' onClick={handleUpload}>Submit</button>
          <button className='btn' onClick={handleClearImage}>Cancel</button>
        </div>
      )}

      <Modal className={"custom-modal"} show={show} onHide={handleClose} centered>
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
};

export default CropingImageMultiple;

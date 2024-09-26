import React from 'react';
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
interface CropingImageMultipleProps {
    onUpload: (images: string | any[]) => void;
    onCancel: (action: string | any[]) => void;
}
declare const CropingImageMultiple: React.FC<CropingImageMultipleProps>;
export default CropingImageMultiple;

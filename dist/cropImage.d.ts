import { Area } from "./types";
export default function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation?: number): Promise<{
    fileUrl: string;
    createdFile: File;
}>;

import { Area, MediaSize, Point, Size } from './types';
/**
 * Compute the dimension of the crop area based on media size,
 * aspect ratio and optionally rotation
 */
export declare function getCropSize(mediaWidth: number, mediaHeight: number, containerWidth: number, containerHeight: number, aspect: number, rotation?: number): Size;
/**
 * Compute media zoom.
 * We fit the media into the container with "max-width: 100%; max-height: 100%;"
 */
export declare function getMediaZoom(mediaSize: MediaSize): number;
/**
 * Ensure a new media position stays within the crop area boundaries.
 *
 * This function adjusts the position of the media to ensure that it remains
 * within the defined crop area, even when the media is rotated or zoomed.
 *
 * Parameters:
 * - `position`: The current position of the media.
 * - `mediaSize`: The size of the media (width and height).
 * - `cropSize`: The size of the crop area (width and height).
 * - `zoom`: The zoom level applied to the media.
 * - `rotation` (optional): The rotation angle of the media, default is 0.
 *
 * Returns:
 * - A new position object with x and y coordinates restricted within the crop area.
 *
 * The function uses `rotateSize` to handle the dimensions of the media after rotation
 * and `restrictPositionCoord` to constrain the position based on the crop area and zoom.
 */
export declare function restrictPosition(position: Point, mediaSize: Size, cropSize: Size, zoom: number, rotation?: number): Point;
export declare function getDistanceBetweenPoints(pointA: Point, pointB: Point): number;
export declare function getRotationBetweenPoints(pointA: Point, pointB: Point): number;
/**
 * Compute the output cropped area of the media in percentages and pixels.
 * x/y are the top-left coordinates on the src media
 */
export declare function computeCroppedArea(crop: Point, mediaSize: MediaSize, cropSize: Size, aspect: number, zoom: number, rotation?: number, restrictPosition?: boolean): {
    croppedAreaPercentages: Area;
    croppedAreaPixels: Area;
};
export declare function getInitialCropFromCroppedAreaPercentages(croppedAreaPercentages: Area, mediaSize: MediaSize, rotation: number, cropSize: Size, minZoom: number, maxZoom: number): {
    crop: {
        x: number;
        y: number;
    };
    zoom: number;
};
export declare function getInitialCropFromCroppedAreaPixels(croppedAreaPixels: Area, mediaSize: MediaSize, rotation: number | undefined, cropSize: Size, minZoom: number, maxZoom: number): {
    crop: Point;
    zoom: number;
};
export declare function getCenter(a: Point, b: Point): Point;
export declare function getRadianAngle(degreeValue: number): number;
export declare function rotateSize(width: number, height: number, rotation: number): Size;
export declare function clamp(value: number, min: number, max: number): number;
export declare function classNames(...args: (boolean | string | number | undefined | void | null)[]): string;

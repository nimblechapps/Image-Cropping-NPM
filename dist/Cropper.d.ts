import * as React from 'react';
import { Area, MediaSize, Point, Size, VideoSrc } from './types';
export type CropperProps = {
    image?: string;
    video?: string | VideoSrc[];
    transform?: string;
    crop: Point;
    zoom: number;
    rotation: number;
    aspect: number;
    minZoom: number;
    maxZoom: number;
    cropShape: 'rect' | 'round';
    cropSize?: Size;
    objectFit?: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover';
    showGrid?: boolean;
    zoomSpeed: number;
    zoomWithScroll?: boolean;
    onCropChange: (location: Point) => void;
    onZoomChange?: (zoom: number) => void;
    onRotationChange?: (rotation: number) => void;
    onCropComplete?: (croppedArea: Area, croppedAreaPixels: Area) => void;
    onCropAreaChange?: (croppedArea: Area, croppedAreaPixels: Area) => void;
    onCropSizeChange?: (cropSize: Size) => void;
    onInteractionStart?: () => void;
    onInteractionEnd?: () => void;
    onMediaLoaded?: (mediaSize: MediaSize) => void;
    style: {
        containerStyle?: React.CSSProperties;
        mediaStyle?: React.CSSProperties;
        cropAreaStyle?: React.CSSProperties;
    };
    classes: {
        containerClassName?: string;
        mediaClassName?: string;
        cropAreaClassName?: string;
    };
    restrictPosition: boolean;
    mediaProps: React.ImgHTMLAttributes<HTMLElement> | React.VideoHTMLAttributes<HTMLElement>;
    disableAutomaticStylesInjection?: boolean;
    initialCroppedAreaPixels?: Area;
    initialCroppedAreaPercentages?: Area;
    onTouchRequest?: (e: React.TouchEvent<HTMLDivElement>) => boolean;
    onWheelRequest?: (e: WheelEvent) => boolean;
    setImageRef?: (ref: React.RefObject<HTMLImageElement>) => void;
    setVideoRef?: (ref: React.RefObject<HTMLVideoElement>) => void;
    setMediaSize?: (size: MediaSize) => void;
    setCropSize?: (size: Size) => void;
    nonce?: string;
};
type State = {
    cropSize: Size | null;
    hasWheelJustStarted: boolean;
    mediaObjectFit: String | undefined;
};
type GestureEvent = UIEvent & {
    rotation: number;
    scale: number;
    clientX: number;
    clientY: number;
};
declare class Cropper extends React.Component<CropperProps, State> {
    static defaultProps: {
        zoom: number;
        rotation: number;
        aspect: number;
        maxZoom: number;
        minZoom: number;
        cropShape: "rect";
        objectFit: "contain";
        showGrid: boolean;
        style: {};
        classes: {};
        mediaProps: {};
        zoomSpeed: number;
        restrictPosition: boolean;
        zoomWithScroll: boolean;
    };
    imageRef: React.RefObject<HTMLImageElement>;
    videoRef: React.RefObject<HTMLVideoElement>;
    containerPosition: Point;
    containerRef: HTMLDivElement | null;
    styleRef: HTMLStyleElement | null;
    containerRect: DOMRect | null;
    mediaSize: MediaSize;
    dragStartPosition: Point;
    dragStartCrop: Point;
    gestureZoomStart: number;
    gestureRotationStart: number;
    isTouching: boolean;
    lastPinchDistance: number;
    lastPinchRotation: number;
    rafDragTimeout: number | null;
    rafPinchTimeout: number | null;
    wheelTimer: number | null;
    currentDoc: Document | null;
    currentWindow: Window | null;
    resizeObserver: ResizeObserver | null;
    state: State;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: CropperProps): void;
    initResizeObserver: () => void;
    preventZoomSafari: (e: Event) => void;
    cleanEvents: () => void;
    clearScrollEvent: () => void;
    onMediaLoad: () => void;
    setInitialCrop: (cropSize: Size) => void;
    getAspect(): number;
    getObjectFit(): "contain" | "horizontal-cover" | "vertical-cover" | undefined;
    computeSizes: () => Size | undefined;
    saveContainerPosition: () => void;
    static getMousePoint: (e: MouseEvent | React.MouseEvent | GestureEvent) => {
        x: number;
        y: number;
    };
    static getTouchPoint: (touch: Touch | React.Touch) => {
        x: number;
        y: number;
    };
    onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseMove: (e: MouseEvent) => void;
    onScroll: (e: Event) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove: (e: TouchEvent) => void;
    onGestureStart: (e: GestureEvent) => void;
    onGestureMove: (e: GestureEvent) => void;
    onGestureEnd: (e: GestureEvent) => void;
    onDragStart: ({ x, y }: Point) => void;
    onDrag: ({ x, y }: Point) => void;
    onDragStopped: () => void;
    onPinchStart(e: React.TouchEvent<HTMLDivElement>): void;
    onPinchMove(e: TouchEvent): void;
    onWheel: (e: WheelEvent) => void;
    getPointOnContainer: ({ x, y }: Point, containerTopLeft: Point) => Point;
    getPointOnMedia: ({ x, y }: Point) => {
        x: number;
        y: number;
    };
    setNewZoom: (zoom: number, point: Point, { shouldUpdatePosition }?: {
        shouldUpdatePosition?: boolean | undefined;
    }) => void;
    getCropData: () => {
        croppedAreaPercentages: Area;
        croppedAreaPixels: Area;
    } | null;
    emitCropData: () => void;
    emitCropAreaChange: () => void;
    recomputeCropPosition: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default Cropper;

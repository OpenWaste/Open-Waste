import { Bin, Building, PredictionResponse } from "./service-types";
import { Camera } from "expo-camera";

export interface MapModalProperties {
  category: string;
  currentVisibilty: boolean;
  visibilitySetter: (value: boolean) => void;
}

export interface CameraTriggerButtonProperties {
  uriSetter: (value: any) => void;
  isPictureTakenSetter: (value: boolean) => void;
  predictionTextSetter: (predictionText: string) => void;
  predictionFetcher: (
    base64Image: string | undefined
  ) => Promise<PredictionResponse>;
  camera: Camera;
}

export interface PredictionTextProperties {
  predictionString: string;
}

export interface PostPictureSnapButtonsProperties {
  uriSetter: (value: any) => void;
  isPictureTakenSetter: (value: boolean) => void;
  predictionTextSetter: (predictionText: string) => void;
  visibilitySetter: (value: boolean) => void;
}

export interface MapBottomSheetProperties {
  category: string;
  instruction: string | undefined;
  closestBuilding: Building | undefined;
  bins: Bin[] | undefined;
}

export interface PicturePreviewProperties {
  pictureURI: string;
}

export interface ClosestBuildingMapMarkerProperties {
  closestBuilding: Building | undefined;
}

export interface MapBottomSheetOpenCloseButtonsProperties{
  collapse: (() => void) | undefined;
  expand: (() => void) | undefined;
  bottomSheetVisible:boolean;
  bottomSheetVisibilitySetter: (value:boolean) => void;
}

export interface BinWithImage {
  bin: Bin;
  imageBase64: string;
}

export interface CameraViewProperties {
  isPictureTaken: boolean;
  predictionString: string;
  modalVisibility: boolean;
  navigator: any;
  cameraInstance: Camera | null;
  pictureURI: string;
  cameraInstanceSetter: (instance: Camera) => void;
  modalVisibilitySetter: (value: boolean) => void;
  isPictureTakenSetter: (value: boolean) => void;
  predictionTextSetter: (predictionText: string) => void;
  uriSetter: (value: any) => void;
}

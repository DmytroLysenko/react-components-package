import { Map } from "leaflet";
import { ForwardedRef } from "react";

export interface IVenueMapProps {
  forwardedRef?: ForwardedRef<MapDataRef>;
  backgroundUrls?: IMapBackground[];
  items: IMapItem[];
  markers?: IMapMarker[];
  zoomControl?: boolean;
  zoom?: number;
  zoomDelta?: number;
  zoomSnap?: number;
  maxZoom?: number;
  minZoom?: number;
  scrollWheelZoom?: boolean;
  height?: string;
  isLoading?: boolean;
  cursorType?: MapCursorType;
  onMapClick?: ((point: MapPoint) => void) | undefined;
  onMarkerClick?: (markerId: IMapMarker["id"]) => void;
}

export type MapPoint = [number, number]; // [lat, lng]
export type MultiPolygon = Array<Array<MapPoint>>;

export interface IMapItem {
  id: number | string;
  color?: string | null;
  name: string;
  multiPolygon: MultiPolygon;
  popupComponent?: JSX.Element;
  fillOpacity?: number;
  hatched?: boolean;
}

export interface IMapBackground {
  url: string;
  opacity?: number;
}

export interface IMapMarker {
  id: number;
  point: MapPoint;
  label: string;
  color?: string | undefined;
}

export type MapDataRef = Map | null;

export enum MapCursorType {
  crosshair = "crosshair",
  auto = "auto",
}

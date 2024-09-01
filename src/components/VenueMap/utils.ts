import { Map, StripePattern } from "leaflet";

import { DEFAULT_COLOR } from "./constants";

import { MapPoint, MultiPolygon, IMapItem } from "./types";

export const getUnprojectedPoint = (
  point: MapPoint,
  map: Map,
  factor?: number
) => {
  if (!factor) factor = 1;
  const latLng = map.unproject(point, map.getMaxZoom());
  return [latLng.lat * factor, latLng.lng * factor] as MapPoint;
};

export const getUnprojectedMultiPolygon = (
  multiPolygon: MultiPolygon,
  map: Map | undefined
) => {
  if (!map || !multiPolygon) return [];
  const result: MultiPolygon = [];
  multiPolygon.forEach((polygon) => {
    const unprojectedPolygon: MapPoint[] = [];
    polygon.forEach((point) => {
      unprojectedPolygon.push(getUnprojectedPoint(point, map));
    });
    result.push(unprojectedPolygon);
  });
  return result;
};

export const createStripePattern = (color: IMapItem["color"], map: Map) => {
  const stripes = new StripePattern({
    height: 10,
    color: color || DEFAULT_COLOR.FILL_PATTERN,
    weight: 5,
    spaceWeight: 0,
    angle: 135,
  });

  stripes.addTo(map);

  return stripes;
};

export const getSingleMultiPolygon = (
  multiPolygons: MultiPolygon[]
): MultiPolygon => multiPolygons.flat();

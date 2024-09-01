import React, { forwardRef } from "react";
import { CRS, latLngBounds, latLng, Map } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet.pattern";
import "leaflet/dist/leaflet.css";

import StyledPolygon from "./components/StyledPolygon";
import StyledMarker from "./components/StyledMarker";
import MapEvents from "./components/MapEvents";
import MapCursor from "./components/MapCursor";

import "./VenueMap.scss";

import { random, mapSize, mapCenter } from "./constants";

import { IVenueMapProps, MapDataRef, MapCursorType } from "./types";

const VenueMap = ({
  forwardedRef,
  backgroundUrls = [],
  items = [],
  markers = [],
  zoomControl = true,
  zoom = 1,
  zoomDelta = 0.5,
  zoomSnap = 0.1,
  maxZoom = 4,
  minZoom = 0,
  scrollWheelZoom = true,
  height = "100%",
  isLoading,
  cursorType = MapCursorType.auto,
  onMapClick,
  onMarkerClick,
}: IVenueMapProps) => {
  return (
    <div className={"venue-map--container"}>
      <MapContainer
        ref={(map: Map | null) => {
          if (forwardedRef) {
            if (typeof forwardedRef === "function") {
              forwardedRef(map);
            } else {
              forwardedRef.current = map;
            }
          }
        }}
        style={{ height, backgroundColor: "transparent", cursor: cursorType }}
        center={mapCenter}
        zoomControl={zoomControl}
        doubleClickZoom={zoomControl}
        zoom={zoom}
        zoomDelta={zoomDelta}
        zoomSnap={zoomSnap}
        scrollWheelZoom={scrollWheelZoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        crs={CRS.Simple}
        attributionControl={false}
      >
        {backgroundUrls.length > 0 &&
          backgroundUrls.map(({ url, opacity = 1 }) => (
            <TileLayer
              key={url}
              url={url + "/{z}/{y}/{x}?r=" + random}
              maxZoom={maxZoom}
              tileSize={mapSize}
              opacity={opacity}
              bounds={latLngBounds(latLng(-mapSize, 0), latLng(0, mapSize))}
            />
          ))}

        {(typeof isLoading === "undefined" || !isLoading) && (
          <>
            {items.map((item) => {
              return <StyledPolygon key={item.id} item={item} />;
            })}
            {markers.map((item) => {
              return (
                <StyledMarker
                  key={item.id}
                  item={item}
                  onClick={onMarkerClick}
                />
              );
            })}
          </>
        )}

        <MapEvents onClick={onMapClick} />
        <MapCursor mapCursor={cursorType} />
      </MapContainer>
    </div>
  );
};

export default forwardRef<MapDataRef, IVenueMapProps>((props, ref) => {
  return <VenueMap {...props} forwardedRef={ref} />;
});

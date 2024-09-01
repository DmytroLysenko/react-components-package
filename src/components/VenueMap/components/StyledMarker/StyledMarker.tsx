import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { Marker, Tooltip, useMap } from "react-leaflet";

import { DEFAULT_COLOR } from "../../constants";

import { IMapMarker } from "../../types";

interface IProps {
  item: IMapMarker;
  onClick?: (itemId: IMapMarker["id"]) => void;
}

const StyledMarker = ({ item, onClick }: IProps) => {
  const map = useMap();

  return (
    <Marker
      icon={divIcon({
        html: renderToStaticMarkup(
          <span style={{ color: item.color || DEFAULT_COLOR.MARKER }}>
            Marker
          </span>
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   height="24px"
          //   viewBox="0 -960 960 960"
          //   width="24px"
          //   fill={item.color || DEFAULT_COLOR.MARKER}
          // >
          //   <path
          //     fill="currentColor"
          //     d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"
          //   />
          // </svg>
        ),
        className: "venue-map--marker--icon",
      })}
      position={map.unproject(item.point, map.getMaxZoom())}
      eventHandlers={{
        click: () => typeof onClick === "function" && onClick(item.id),
      }}
      bubblingMouseEvents={false}
    >
      <Tooltip direction="top" offset={[6, -10]}>
        {item.label}
      </Tooltip>
    </Marker>
  );
};

export default StyledMarker;

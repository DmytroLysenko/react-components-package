import { useMapEvents } from "react-leaflet"

import { MapPoint } from "../../types"
import { Point } from "leaflet"

interface IProps {
  onClick?: ((point: MapPoint) => void) | undefined
}

const MapEvents = ({ onClick }: IProps) => {
  const map = useMapEvents({
    click: ({ latlng }) => {
      const point: Point = map.project([latlng.lat, latlng.lng], map.getMaxZoom())
      typeof onClick === "function" && onClick([point.x, point.y])
    },
  })
  return null
}

export default MapEvents

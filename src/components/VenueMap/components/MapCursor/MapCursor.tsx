import { useMap } from "react-leaflet"

import { MapCursorType } from "../../types"

interface IProps {
  mapCursor: MapCursorType
}

const MapCursor = ({ mapCursor = MapCursorType.auto }: IProps) => {
  const map = useMap()

  map.getContainer().style.cursor = mapCursor
  //TODO: Deactivating an interactivity of the existing instances is currently not implemented.
  // https://github.com/Leaflet/Leaflet/issues/5442
  // https://github.com/Leaflet/Leaflet/pull/9055
  // map.eachLayer(() => {
  // layer.setInteractive(false)
  // })

  return null
}

export default MapCursor

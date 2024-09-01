import React, { useState } from "react"
import { Polygon, Tooltip, useMap } from "react-leaflet"

import { getUnprojectedMultiPolygon, createStripePattern } from "../../utils"
import { DEFAULT_COLOR } from "../../constants"

import { IMapItem } from "../../types"

interface IProps {
  item: IMapItem
}

const StyledPolygon = ({ item }: IProps) => {
  const map = useMap()

  const [isHover, setIsHover] = useState(false)

  return (
    <Polygon
      positions={getUnprojectedMultiPolygon(item.multiPolygon, map)}
      pathOptions={{
        weight: isHover ? 1 : 0.2,
        color: isHover
          ? DEFAULT_COLOR.BORDER_HOVER
          : item.color || DEFAULT_COLOR.BORDER,
        fillColor: item.color || DEFAULT_COLOR.FILL,
        fillPattern: item.hatched ? createStripePattern(item.color, map) : undefined,
        fillOpacity: item.fillOpacity || 0.3,
      }}
      eventHandlers={{
        mouseover: () => {
          setIsHover(true)
        },
        mouseout: () => setIsHover(false),
      }}
    >
      {item.popupComponent && (
        <Tooltip sticky className="venue-map-tooltip" opacity={1} offset={[10, 0]}>
          {item.popupComponent}
        </Tooltip>
      )}
    </Polygon>
  )
}

export default StyledPolygon

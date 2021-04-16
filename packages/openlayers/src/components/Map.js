import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

export const OLMap = () => {
  const mapRef = useRef();

  useEffect(() => {
    const mapObj = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 4
      })
    });
    window.mapObj = mapObj;
  }, [mapRef]);

  return (
    <div
      style={{ border: "1px dotted red", height: "600px", width: "100%" }}
      ref={mapRef}
    />
  );
};

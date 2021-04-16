import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWd1c3Rpbi1jYXN0aWFyZW5hIiwiYSI6ImNrYXF6bXYwMTBhNDIycmxybmdzZXNzNHkifQ.SyGhFPyWVuNIkUluQCd0cw";

const Wrap = styled.div`
  width: 100%;
  height: 50vh;
`;

const Map = () => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  const onLoadMap = useCallback(() => {
    if (!map) return;
    const { layers } = map.getStyle();
    const layer = layers.find(layer => {
      return layer.type === "symbol" && layer.layout["text-field"];
    });
    map.addLayer(
      {
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 10,
        paint: {
          "fill-extrusion-color": "#aaa",

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            0,
            10.05,
            ["get", "height"]
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            0,
            10.05,
            ["get", "min_height"]
          ],
          "fill-extrusion-opacity": 0.6
        }
      },
      layer.id
    );

    //map.getCanvas().focus();
  }, [map]);

  useEffect(() => {
    if (!map) {
      setMap(
        new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/light-v10",
          center: [-0.1248, 51.4995],
          zoom: 16.72,
          pitch: 45,
          bearing: -17,
          antialias: true
        })
      );
    }

    if (map) {
      map.on("load", onLoadMap);
    }
  }, [map, setMap, onLoadMap]);

  // pixels the map pans when the up or down arrow is clicked
  var deltaDistance = 100;

  // degrees the map rotates when the left or right arrow is clicked
  var deltaDegrees = 25;

  const keyPressControls = useCallback(
    e => {
      e.preventDefault();
      function easing(t) {
        return t * (2.3 - t);
      }
      switch (e.which) {
        case 38: //up
          map.panBy([0, -deltaDistance], {
            easing: easing
          });
          break;
        case 40: //down
          map.panBy([0, deltaDistance], {
            easing: easing
          });
          break;
        case 37:
          map.easeTo({
            bearing: map.getBearing() - deltaDegrees,
            easing: easing
          });
          break;
        case 39:
          map.easeTo({
            bearing: map.getBearing() + deltaDegrees,
            easing: easing
          });
          break;
        default:
          break;
      }
    },
    [map, deltaDegrees, deltaDistance]
  );

  return <Wrap onKeyPress={keyPressControls} ref={ref} />;
};

export default Map;

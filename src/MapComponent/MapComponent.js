import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import './MapComponent.css'

const styles = {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  zIndex: "2"
};


const MapComponent = ({directions, setOpenDirection}) => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState({
    lng: directions.x,
    lat: directions.y,
    zoom: 18,
  });
  const [userLocation, setUserLocation] = useState({
    lng: "",
    lat: "",
  });
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaXlkIiwiYSI6ImNqeHl2aG91ejAzaGQzYnFteG12N2cxYWEifQ.nqXYr34IMpN53S4LXwAyeA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [location.lng, location.lat],
        zoom: location.zoom,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      // Add geolocate control to the map.
      var geoLocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
        showAccuracyCircle: true,
      });

      geoLocate.on("geolocate", (e) => {
        var lng = "24.752489";
        var lat = "60.156258";
        setUserLocation({
          lng,
          lat,
        });
      
      });

      map.on("move", () => {
        setLocation({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        });
      });

      var marker = new mapboxgl.Marker()
     .setLngLat([location.lng, location.lat])
      .addTo(map);

      var geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: true, // Do not use the default marker style
        proximity: {
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        },
      });

      var direction = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      });

      // Add the geocoder to the map
      map.addControl(geocoder);
      map.addControl(geoLocate);
      map.addControl(direction, "top-left");
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles}><i onClick={()=> setOpenDirection()} className="fas fa-window-close"></i></div>;
};

export default MapComponent;

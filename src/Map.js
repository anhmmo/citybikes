import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import React, { useState } from "react";
const Maps = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaXlkIiwiYSI6ImNqeHl2aG91ejAzaGQzYnFteG12N2cxYWEifQ.nqXYr34IMpN53S4LXwAyeA",
});
function Map({ mapData }) {
  //console.log(mapData);
  const [openPopup, setPopup] = useState(false);
  let longtide = mapData.x;
  let lattide = mapData.y;
  return (
    <div className="map-box">
      <Maps
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "390px",
          width: "600px",
        }}
        center={[longtide, lattide]}
        zoom={[16]}
      >
        <Popup
          coordinates={[longtide, lattide]}
          offset={{
            "bottom-left": [12, -58],
            bottom: [0, -58],
            "bottom-right": [-12, -58],
          }}
          style={openPopup ? { display: "block" } : { display: "none" }}
        >
          <h4>
            {mapData.name}{" "}
            <h5>
              Vapaat kaupunkipyörät {mapData.bikesAvailable}/
              {mapData.bikesAvailable + mapData.spacesAvailable}
            </h5>
          </h4>
        </Popup>
        <Marker
          coordinates={[longtide, lattide]}
          onClick={() => setPopup(!openPopup)}
          anchor="bottom"
        >
          <img
            className="marker-icon"
            alt="bikes"
            style={{ width: "50px", height: "50px" }}
            src="https://citybike.cdn.crasman.fi/pub/web/img/bike-location.svg"
          />
        </Marker>
      </Maps>
      <div className="card" style={{ width: "18rem" }}>
        <h1
          style={{
            position: "absolute",
            top: 50,
            marginLeft: mapData.networks[0] === "vantaa" ? "80px" : "10px",
            color: "white",
            opacity: mapData.networks[0] === "vantaa" ? "0.7" : "1",
          }}
        >
          {mapData.networks[0] === "vantaa" ? "Vantaa" : "Helsinki tai Espoo"}
        </h1>
        <img
          alt="card"
          className="card-img-top"
          src={
            mapData.networks[0] === "vantaa"
              ? "https://cdn.ostrovok.ru/t/640x400/content/57/65/5765c57212675fe3a723dcf80418cd8fc9589552.jpeg"
              : "https://herfinland.com/wp-content/uploads/2019/08/things-to-do-in-helsinki-1-1080x675.jpg"
          }
        />
        <div className="card-body">
          <div className="card-title h5">{mapData.name}</div>
          <p className="card-text">
            Vapaat kaupunkipyörät {mapData.bikesAvailable}/
            {mapData.bikesAvailable + mapData.spacesAvailable}
          </p>
          <button
            type="button"
            className="btn btn-success"
            style={{ marginRight: 5 }}
          >
            Vapaat{" "}
            <span className="badge badge-light">{mapData.bikesAvailable}</span>
          </button>
          <button
            type="button"
            className="btn btn-dark"
            style={{ marginLeft: 5 }}
          >
            Käytössä{" "}
            <span className="badge badge-light">{mapData.spacesAvailable}</span>
          </button>
          <button
            type="button"
            className="btn btn-outline-warning"
            style={{ marginTop: 15 }}
          >
            Näytä Google kartalla
          </button>
        </div>
      </div>
    </div>
  );
}

export default Map;
// in render()

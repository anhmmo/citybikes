import React, { useState, useEffect } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Station from "./Station/Station";
import Loading from "./Loading/Loading";
function App() {
  const [station, setStation] = useState([]);
  const [bikes, setBikes] = useState([]);
  function getTiedot() {
    if ((!station.length && !bikes.length) || station.length !== bikes.length) {
      let req = new XMLHttpRequest();

      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          setTimeout(() => {
            let tiedot = JSON.parse(req.responseText);
            setStation(tiedot.stations);
            setBikes(tiedot.stations);
          }, 300);
        }
      };

      req.open(
        "GET",
        "https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental",
        true
      );
      req.send();
    }
  }

  function getVantaa() {
    let vantaaBikes = station.filter((item) => item.networks[0] === "vantaa");
    setBikes(vantaaBikes);
  }

  function getHelsinki() {
    let helBikes = station.filter((item) => item.networks[0] !== "vantaa");
    setBikes(helBikes);
  }

  useEffect(() => {
    getTiedot();
  }, []);
  return (
    <div className="App">
      {station.length > 0 ? (
        <Station
          bikes={bikes}
          getVantaa={getVantaa}
          getHelsinki={getHelsinki}
          getTiedot={getTiedot}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;

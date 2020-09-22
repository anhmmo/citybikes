import React, { useState} from "react";
import { Col, Card, Button, Badge, Jumbotron, Dropdown } from "react-bootstrap";
import Map from "../Map";
import WeatherBox from "../WeatherBox/WeatherBox";

import MapComponent from '../MapComponent/MapComponent';

function Station({ bikes, getHelsinki, getVantaa, getTiedot }) {
  const [openMap, setMap] = useState({ status: false, mapData: {} });
  const [dropDownValue, setDropdown] = useState({ value: "Valitse asema" });
  const [weatherData, setWeather] = useState({});
  const [openDirections, setOpenDirection] = useState(false);
  const [directions, setDirection] = useState([]);
  const [weatherModal, setWeatherModal] = useState({
    status: false,
    location: "",
  });
  const closeWeatherBox = () => {
    setWeatherModal({ status: false });
  };
  const getWeatherData = (kaupunki) => {
    fetch(
      `http://api.weatherstack.com/current?access_key=39673f0d31b2d17ff1f2c4aafff1c0ea&query=${kaupunki}`
    ).then((data) =>
      data.json().then((data) => {
        // console.log(data);
        setWeather(data);
        setWeatherModal({ status: true, location: kaupunki });
      })
    );
  };
  //console.log(bikes);

  return (
    <>
      {weatherModal.status && (
        <WeatherBox
          closeWeatherBox={closeWeatherBox}
          weatherData={weatherData}
          weatherModal={weatherModal}
        />
      )}
      {openDirections && <MapComponent directions={directions} setOpenDirection={setOpenDirection} />}
      <Jumbotron>
        <h1>Kaupunkipyörät</h1>
        <p>
          Alepa-fillareita, eli kaupunkipyöriä on pääkaupunkiseudulla yli 2500
          kpl.<br></br> Vapaiden kaupunkipyörien sijainnin, saatavuustilanteen
          sekä pyöräaseman tiedot.
        </p>
        <p>
          <Button
            onClick={getTiedot}
            variant="warning"
            style={{ marginRight: "15px" }}
          >
            Kaikki
          </Button>
          <Button
            onClick={getHelsinki}
            variant="warning"
            style={{ marginRight: "15px" }}
          >
            Helsinki ja Espoo
          </Button>
          <Button
            onClick={getVantaa}
            variant="warning"
            style={{ marginLeft: "15px" }}
          >
            Vantaa
          </Button>
        </p>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {dropDownValue.value}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {bikes.map((item, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  setMap({ status: true, mapData: item });
                  setDropdown({ value: item.name });
                }}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Jumbotron>
      {openMap.status && (
        <>
          <Map mapData={openMap.mapData ? openMap.mapData : {}} />
          <Button
            onClick={() => setMap({ status: false, mapData: {} })}
            variant="danger"
            style={{ marginLeft: "15px" }}
          >
            close map <i className="fas fa-times-circle"></i>
          </Button>
        </>
      )}

      <div className="project-container">
        {bikes.map((item, index) => (
          <Col key={index}>
            <Card style={{ width: "18rem" }}>
              <h1
                style={{
                  position: "absolute",
                  top: "50px",
                  marginLeft: item.networks[0] === "vantaa" ? "80px" : "10px",
                  color: "white",
                  opacity: "0.7",
                }}
              >
                {item.networks[0] === "vantaa"
                  ? "Vantaa"
                  : "Helsinki tai Espoo"}
              </h1>
              <Card.Img
                variant="top"
                src={
                  item.networks[0] === "vantaa"
                    ? "https://cdn.ostrovok.ru/t/640x400/content/57/65/5765c57212675fe3a723dcf80418cd8fc9589552.jpeg"
                    : "https://herfinland.com/wp-content/uploads/2019/08/things-to-do-in-helsinki-1-1080x675.jpg"
                }
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Vapaat kaupunkipyörät {item.bikesAvailable}/
                  {item.bikesAvailable + item.spacesAvailable}
                </Card.Text>
                <Button variant="success" style={{ marginRight: "5px" }}>
                  Vapaat <Badge variant="light">{item.bikesAvailable}</Badge>
                </Button>
                <Button variant="dark" style={{ marginLeft: "5px" }}>
                  Käytössä <Badge variant="light">{item.spacesAvailable}</Badge>
                </Button>
                <Button
                  onClick={() =>
                    {setDirection(item);
                      setTimeout(()=>{
                        setOpenDirection(true)
                      }, 1000)
                    }
                  }
                  variant="outline-warning"
                  style={{ marginTop: "15px", marginRight: "20px" }}
                >
                  Reitti kartta
                </Button>
                <Button
                  onClick={() => {
                    let location =
                      item.networks[0] === "vantaa" ? "vantaa" : "helsinki";
                    getWeatherData(location);
                  }}
                  variant="outline-warning"
                  style={{ marginTop: "15px" }}
                >
                  Säätiedot
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </>
  );
}

export default Station;

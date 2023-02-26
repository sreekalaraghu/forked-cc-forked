import React from "react";
import "./HandlingStyles.css";
import events from "../../data/timeline.json";
import { useState, useEffect } from "react";
import Popup from "./Popup.js";
import geoJson from "./facility.json";
import Map from "../map/Map";

const Handling = () => {
  // const [filteredevent, setFilteredevent] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [clickedText, setClickedText] = useState("");
  const year = [...new Set(events.map((item) => item.decade))];
  const [selectedState, setselctedState] = useState(null);
  const [selectedstation, setselectedstation] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2020);

  const filtereddata = events.filter((data) => {
    return (
      (!selectedState || data.state === selectedState) &&
      (!selectedstation || data.energy_type === selectedstation) &&
      (!selectedYear || data.decade === selectedYear)
    );
  });

  const filteredstation = geoJson.filter((data) => {
    return (
      (!selectedState || data.properties.State === selectedState) &&
      (!selectedstation || data.properties.Type === selectedstation) &&
      (!selectedYear || data.properties.Year === selectedYear)
    );
  });

  const handleyear = (year) => {
    setSelectedYear(year);
  };
  function handlePopup(event) {
    setClickedText(event.target.innerText);
    console.log(event.target.innerText);
    setIsPopupVisible(!isPopupVisible);
    console.log(isPopupVisible);
  }

  function closePopup() {
    setIsPopupVisible(false);
  }

  const filterstate = (state) => {
    if (selectedState === state) {
      setselctedState(null);
    } else {
      setselctedState(state);
    }

    // setFilteredevent(events.filter((item => item.state === state)))
  };

  const filterstation = (station) => {
    if (selectedstation === station) {
      setselectedstation(null);
    } else {
      setselectedstation(station);
    }
    // setFilteredevent(events.filter((item => item.station === station)))
  };

  const StoryTimeline = () => {
    return (
      <div className="timeline">
        {events &&
          year.map((data, index) => (
            <>
              <button
                className={`button ${selectedYear === data ? "selected" : ""}`}
                key={index}
                value={data}
                onClick={() => handleyear(data)}
              >
                {data}
              </button>
            </>
          ))}
      </div>
    );
  };

  const Statefilter = () => {
    return (
      <div>
        <button
          className="button"
          onClick={() => filterstate("VIC")}
          style={selectedState === "VIC" ? { backgroundColor: "blue" } : {}}
        >
          VIC
        </button>
        <button
          className="button"
          onClick={() => filterstate("QLD")}
          style={selectedState === "QLD" ? { backgroundColor: "blue" } : {}}
        >
          QLD
        </button>
        <button
          className="button"
          onClick={() => filterstate("NSW")}
          style={selectedState === "NSW" ? { backgroundColor: "blue" } : {}}
        >
          NSW
        </button>
        <button
          className="button"
          onClick={() => filterstate("SA")}
          style={selectedState === "SA" ? { backgroundColor: "blue" } : {}}
        >
          SA
        </button>
        <button
          className="button"
          onClick={() => filterstate("WA")}
          style={selectedState === "WA" ? { backgroundColor: "blue" } : {}}
        >
          WA
        </button>
        <button
          className="button"
          onClick={() => filterstate("TAS")}
          style={selectedState === "TAS" ? { backgroundColor: "blue" } : {}}
        >
          TAS
        </button>
      </div>
    );
  };
  const Stationfilter = () => {
    return (
      <div id="station-filter">
        <button
          className="button"
          onClick={() => filterstation("Coal")}
          style={selectedstation === "Coal" ? { backgroundColor: "blue" } : {}}
        >
          Coal
        </button>
        <button
          className="button"
          onClick={() => filterstation("Hydro")}
          style={selectedstation === "Hydro" ? { backgroundColor: "blue" } : {}}
        >
          Hydro
        </button>
        <button
          className="button"
          onClick={() => filterstation("Solar")}
          style={selectedstation === "Solar" ? { backgroundColor: "blue" } : {}}
        >
          Solar
        </button>
        <button
          className="button"
          onClick={() => filterstation("Battery")}
          style={
            selectedstation === "Battery" ? { backgroundColor: "blue" } : {}
          }
        >
          Battery
        </button>
        <button
          className="button"
          onClick={() => filterstation("wind")}
          style={selectedstation === "wind" ? { backgroundColor: "blue" } : {}}
        >
          Wind
        </button>
        <button
          className="button"
          onClick={() => filterstation("Biomass")}
          style={
            selectedstation === "Biomass" ? { backgroundColor: "blue" } : {}
          }
        >
          Biomass
        </button>
        <button
          className="button"
          onClick={() => filterstation("Biogas")}
          style={
            selectedstation === "Biogas" ? { backgroundColor: "blue" } : {}
          }
        >
          Biogas
        </button>
        <button
          className="button"
          onClick={() => filterstation("Distillate")}
          style={
            selectedstation === "Distillate" ? { backgroundColor: "blue" } : {}
          }
        >
          Distillate
        </button>
        <button
          className="button"
          onClick={() => filterstation("Gas")}
          style={selectedstation === "Gas" ? { backgroundColor: "blue" } : {}}
        >
          Gas
        </button>
        <button
          className="button"
          onClick={() => filterstation("Pumps")}
          style={selectedstation === "Pumps" ? { backgroundColor: "blue" } : {}}
        >
          Pumps
        </button>
        <button
          className="button"
          onClick={() => filterstation("Hydrogen")}
          style={
            selectedstation === "Hydrogen" ? { backgroundColor: "blue" } : {}
          }
        >
          Hydrogen
        </button>
      </div>
    );
  };

  return (
    <div name="handling" className="handling">
      <div className="container">
        <div className="top">
          <ul>
            <li>
              <StoryTimeline />
            </li>
            <li>
              <Statefilter />
            </li>
            <li>
              <Stationfilter id="station-filter" />
            </li>
          </ul>
        </div>
        <div className="panel">
          {filtereddata && (
            <div className="heading-container">
              {filtereddata.map((data, index) => (
                <p className="story-headings">
                  <span onClick={handlePopup}>{data.title}</span>
                </p>
              ))}
            </div>
          )}
          <Map className="map-section" filteredstation={filteredstation} />

          {isPopupVisible && (
            <Popup
              closePopup={closePopup}
              isPopupVisible={isPopupVisible}
              clickedText={clickedText}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Handling;

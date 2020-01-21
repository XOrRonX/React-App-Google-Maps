import React, { Component, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      stations: []
    };
  }

  async componentDidMount() {
    const url = "https://api.tel-aviv.gov.il/parking/stations";
    const response = await fetch(url);
    const data = await response.json();
    let stations = data.map(st => {
      return (
        <Marker
          key={st.AhuzotCode}
          position={{
            lat: parseFloat(st.GPSLattitude),
            lng: parseFloat(st.GPSLongitude)
          }}
        ></Marker>
      );
    });
    console.log(stations);
    this.setState({ stations: stations });
    //console.log(this.state.stations)
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 32.0853, lng: 34.781769 }}
      >
        {this.state.stations}
      </GoogleMap>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

class App extends Component {
  state = {
    width: "100vw",
    height: "100vh"
  };

  render() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
        libraries=geometry,drawing,places&key=AIzaSyAayUGZzRY9b3sUXSfNf_XfqH1jOIjeR2g`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }
}

export default App;

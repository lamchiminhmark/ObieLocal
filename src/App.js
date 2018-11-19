import React, { Component} from "react";
import MapContainer from './MapContainer';
import Marker from './Marker'
import "./App.css";

// const TestButton = props => {
//   return (
//     <button></button>
//   )
// }

class App extends Component {
  render() {
    const markers = [
    <Marker lat={41.293873} lng={-82.221939}/>,
    <Marker lat={41.291687} lng={-82.219704}/>,
    ]
    return (
      <div className="App">
        <MapContainer zoom={18}>
          {markers}
        </MapContainer>
      </div>
    );
  }
}

export default App;


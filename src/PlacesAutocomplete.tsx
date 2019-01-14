import React from 'react';
import ReactTag from 'react-tag-autocomplete';

declare global {
  interface Window {
    google: any;
  }
}

/* Coordinates of the 2 points delimiting the box used for biasing Google Places search. 
NE: Kendal 
SW: The Arboretum */
const NE = { lat: 41.3049, lng: -82.2094 };
const SW = { lat: 41.2799, lng: -82.2302 };

const google = window.google;

interface IProps {
  handleAddition: Function;
  handleDelete: Function;
}; 

interface IState {
  suggestions: string[],
}

export default class PlacesAutocomplete extends React.Component<IProps> {
  // TODO(ML): Implement better typing for props, google, etc
  private autocomplete: any;
  state: IState = {
    suggestions: [],
  };

  constructor(props) {
    super(props);
    // CONTINUE(ML): continue here
    this.state: any = {
      suggestions: []
    };
    this.autocomplete = new google.maps.places.AutocompleteService();

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  private handleInputChange(input: string) {
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(SW.lat, SW.lng),
      new google.maps.LatLng(NE.lat, NE.lng)
    );

    const requestOptions = {
      bounds: defaultBounds,
      input: input,
      types: ['establishment', 'geocode']
    };

    this.autocomplete.getPlacePredictions(
      requestOptions,
      (predictionsArr, status) => {
        // If query responds cleanly
        if (status.OK) {
          this.updateSuggestions(predictionsArr);
        } else {
          // TODO(ML): Add error handling
          console.error('Something is broken in PlacesAutocomplete');
        }
      }
    );
  }

  private updateSuggestions(predictionsArr) {
    const suggestions = predictionsArr.map((prediction, index) => ({
      id: index,
      name: prediction.description
    }));

    this.setState({suggestions: suggestions});
  }

  render() {
    return (
      <ReactTag
        suggestions={this.state.suggestions}
        handleAddition={this.props.handleAddition}
        handleDelete={this.props.handleDelete}
        handleInputChange={this.handleInputChange}
      />
    );
  }
}

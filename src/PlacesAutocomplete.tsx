import React from 'react';
import ReactTag, { Tag } from 'react-tag-autocomplete';
/* Coordinates of the 2 points delimiting the box used for biasing Google Places search. 
NE: Kendal 
SW: The Arboretum */
const NE = { lat: 41.3049, lng: -82.2094 };
const SW = { lat: 41.2799, lng: -82.2302 };

interface IProps {
  locationName: string;
  handleAddition: (tag: Tag) => void;
  handleDelete: (index: number) => void;
}; 

interface IState {
  suggestions: Tag[],
}

export default class PlacesAutocomplete extends React.Component<IProps> {
  // TODO(ML): Implement better typing for props, google, etc
  autocomplete = new google.maps.places.AutocompleteService();
  state: IState = {
    suggestions: [],
  };

  constructor(props: IProps) {
    super(props);
    this.updateSuggestions = this.updateSuggestions.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  private handleInputChange(input: string) {
    // If there is no input, return
    if (!input) return;

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
      (predictionsArr: google.maps.places.AutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
        // If query responds cleanly
        console.log(status, google);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.updateSuggestions(predictionsArr);
        } else {
          // TODO(ML): Add error handling
          // CONTINUE(ML): Something is broken here, no suggestions currently
          console.error('Something is broken in PlacesAutocomplete');
        }
      }
    );
  }

  private updateSuggestions(predictionsArr: google.maps.places.AutocompletePrediction[]) {
    const suggestions = predictionsArr.map((prediction, index) => ({
      id: index,
      name: prediction.description
    }));

    this.setState({suggestions: suggestions});
  }

  render() {
    return (
      <ReactTag
        tags={[{id: 1, name: this.props.locationName}]}
        suggestions={this.state.suggestions}
        handleAddition={this.props.handleAddition}
        handleDelete={this.props.handleDelete}
        handleInputChange={this.handleInputChange}
      />
    );
  }
}

import ReactGA from "react-ga";


const SECRET_SAUCE_CONSTANT = 0.0001;



// TODO(ML): Documentation
export const handleAgendaClick = (eventArray) => dispatch => {
    // Update google analytics on Agenda Click action
    const selectedEvent = eventArray[0];
    ReactGA.event({
      category: "User",
      action: "Agenda Click",
      label: selectedEvent.title
    });
    dispatch({
      activeEventArray: eventArray,
      activeEventIdx: 0,
      sidepaneOpen: true,
      activeTab: "Event",
      mapZoom: 17.5 + Math.random() * 0.01,
      lat:
        (selectedEvent.lat || 41.2926) +
        (1 + Math.random()) * SECRET_SAUCE_CONSTANT,
      lng:
        (selectedEvent.lng || -82.2183) -
        (1 + Math.random()) * SECRET_SAUCE_CONSTANT
    });
  }
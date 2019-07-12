import React from "react";
import { withLeaflet, MapLayer } from "react-leaflet";
import L from "leaflet";
import "assets/javascript/leaflet-timeline-slider.js";

class TimelineSliderApp extends MapLayer {
  createLeafletElement(props) {
    const { timelineItems, changeMap } = props;
    const options = [];

    options.push(timelineItems);
    options.push(changeMap);

    options.timelineItems = options[0];
    options.changeMap = options[1];

    delete options[0];
    delete options[1];

    return L.control.timelineSlider(options);
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export const TimelineSlider = withLeaflet(props => {
  const { timelineItems, changeMap } = props;

  const options = [];

  options.push(timelineItems);
  options.push(changeMap);

  options.timelineItems = options[0];
  options.changeMap = options[1];

  delete options[0];
  delete options[1];

  options.render = new L.control.timelineSlider(options);
  return <TimelineSliderApp {...props} />;
});

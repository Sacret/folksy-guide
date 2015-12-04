'use strict';

import Reflux from 'reflux';
import request from 'superagent';
import _ from 'lodash';
//
import Icons from '../constants/Icons';
import Config from '../config/Config';
//
import MapActions from '../actions/MapActions';

/**
 *  MapStore processes map info
 */
const MapStore = Reflux.createStore({
  listenables: [MapActions],
  map: {
    markers: [],
    center: {
      lat: 47.414455,
      lng: 40.110426
    },
    defaultCenter: {
      lat: 47.414455,
      lng: 40.110426
    }
  },

  changeMapCenter(position) {
    this.map.center = {
      lat: position.lat,
      lng: position.lng
    };
    this.trigger(this.map);
  },

  fetchMarkers() {
    let _this = this;
    let requestUrl = Config.RestAPIUrl;
    _this.trigger(_this.map);
  },

  addMarker() {
    this.map.markers.push({
      position: {
        lat: 28.99,
        lng: 132.9,
      },
      key: 2,
      icon: Icons.GREEN,
      content: 'Contact info 2',
      showInfo: false,
      defaultAnimation: 2
    });
    this.trigger(this.map);
  },

  removeMarker(markerKey) {
    this.map.markers = _.filter(this.map.markers, (marker) => {
      return marker.key !== markerKey;
    });
    this.trigger(this.map);
  },

  highlightMarker(markerKey) {
    _.forEach(this.map.markers, (marker, index) => {
      if (marker.key == markerKey) {
        marker.options = {
          opacity: 1
        };
      }
      else {
        marker.options = {
          opacity: 0.5
        };
      }
    });
    this.trigger(this.map);
  },

  unhighlightMarkers(markerKey) {
    _.forEach(this.map.markers, (marker, index) => {
      marker.options = {
        opacity: 1
      };
    });
    this.trigger(this.map);
  },

  hideMarkerInfo(markerKey) {
    _.forEach(this.map.markers, (marker, index) => {
      marker.showInfo = false;
    });
    this.trigger(this.map);
  }

});

export default MapStore;

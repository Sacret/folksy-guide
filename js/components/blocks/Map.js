'use strict';

import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import _ from 'lodash';
import ReactFireMixin from 'reactfire';
//
import { Grid, Row, Col } from 'react-bootstrap';
//
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
//
import MapActions from '../../actions/MapActions';
//
import MapStore from '../../stores/MapStore';
//
import Config from '../../config/Config';
import Icons from '../../constants/Icons';

/**
 *  Map component displays google map
 */
const Map = React.createClass({

  mixins: [Reflux.connect(MapStore, 'mapStore'), ReactFireMixin],

  componentDidMount() {
    MapActions.fetchMarkers();
  },

  componentWillMount() {
    /*let ref = new Firebase(Config.FirebaseUrl + 'usersGeoMap');
    this.bindAsArray(ref, 'usersGeoMap');*/
  },

  setCenter(position) {
    if (this.state.mapStore) {
      this.state.mapStore.center = {
        lat: position.lat,
        lng: position.lng
      };
    }
  },

  onMarkerLeftclick(marker) {
    marker.showInfo = true;
    marker.leftClick = true;
    this.setCenter(marker.position);
    this.setState(this.state);
  },

  onMarkerRightclick(marker) {
    marker.showInfo = true;
    marker.leftClick = false;
    this.setCenter(marker.position);
    this.setState(this.state);
  },

  onMarkerCloseClick(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  },

  onMapClick(e) {
    FixedMarkerActions.addTemporaryPlace(e.latLng);
  },

  renderInfoWindow(marker, index) {
    if (marker.leftClick) {
      return (
        <InfoWindow key={`info_window_${index}`}
          content={marker.content}
          onCloseclick={() => this.onMarkerCloseClick(marker)}
        />
      );
    }
    else {
      return (
        <InfoWindow key={`info_window_${index}`}
          onCloseclick={() => this.onMarkerCloseClick(marker)}
        >
          <AssignPatrolCar markerKey={marker.key} />
        </InfoWindow>
      );
    }
  },

  render() {
    let mapStore = this.state.mapStore;
    console.log('mapStore', mapStore);
    //
    let markers = mapStore ? mapStore.markers : [];
    let defaultCenter = mapStore ? mapStore.defaultCenter : {lat: 0, lng: 0};
    let mapCenter = mapStore ? mapStore.center : {lat: 0, lng: 0};
    //
    let patrolMarkers = [];
    if (this.state.usersGeoMap && this.state.usersGeoMap.length && patrolsModalStore.currentPatrols) {
      let usersGeoMap = this.state.usersGeoMap;
      _.forEach(patrolsModalStore.currentPatrols, (currentPatrol) => {
        let patrolCar = _.find(usersGeoMap, (patrol) => {
          return patrol['.key'] == currentPatrol.FireBaseId;
        });
        if (patrolCar) {
          let showInfo = (this.state.showPatrolMarker == patrolCar['.key']) &&
            (this.state.showPatrolMarkerLeft || this.state.showPatrolMarkerRight);
          let content = '<b>' + translations[localStorage.getItem('languageID')].patrolCarCarNumber + '</b>: ' +
            currentPatrol.CarNumber + '</br>' +
            '<b>' + translations[localStorage.getItem('languageID')].patrolCarDriverName + '</b>: ' +
            currentPatrol.DriverName + '</br>' +
            '<b>' + translations[localStorage.getItem('languageID')].patrolCarPhoneNumber + '</b>: ' +
            currentPatrol.PhoneNumber + '</br>' +
            '<b>' + translations[localStorage.getItem('languageID')].patrolCarDescription + '</b>: ' +
            currentPatrol.Description + '</br>' +
            '<b>' + translations[localStorage.getItem('languageID')].patrolCarFireBaseId + '</b>: ' +
            currentPatrol.FireBaseId;
          //
          patrolMarkers.push({
            position: {
              lat: patrolCar.lat,
              lng: patrolCar.lng,
            },
            key: patrolCar['.key'],
            currentPatrol: currentPatrol,
            icon: Icons.GREEN,
            content: content,
            showInfo: showInfo,
            defaultAnimation: 2
          });
        }
      });
    }
    //
    return (
      <section style={{height: '100%'}}>
        <GoogleMap containerProps={{
            style: {
              height: '100%',
            },
          }}
          ref="map"
          defaultZoom={13}
          defaultCenter={defaultCenter}
          center={mapCenter}
          onClick={this.onMapClick}
        >
          { markers.map((marker, index) => {
              let infoWindow = marker.showInfo ?
                this.renderInfoWindow(marker, index) :
                null;
              return (
                <Marker
                  {...marker}
                  onRightclick={()  => this.onMarkerRightclick(marker)}
                  onClick={()       => this.onMarkerLeftclick(marker)}
                >
                  {infoWindow}
                </Marker>
              );
            })
          }
        </GoogleMap>
      </section>
    );
  }
});

export default Map;

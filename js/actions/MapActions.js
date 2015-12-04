'use strict';

import Reflux from 'reflux';

/**
 *  List of actions for map
 */
const MapActions = Reflux.createActions([
  'fetchMap',
  'changeMapCenter',
  'fetchMarkers',
  'addMarker',
  'removeMarker',
  'highlightMarker',
  'unhighlightMarkers',
  'hideMarkerInfo'
]);

module.exports = MapActions;

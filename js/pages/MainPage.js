'use strict';

import React from 'react';
import Reflux from 'reflux';
import { createHistory, useBasename } from 'history';
import { History, Lifecycle } from 'react-router';
//
import { Grid, Row, Col } from 'react-bootstrap';
//
import Map from '../components/blocks/Map';
import TopNavbar from '../components/blocks/TopNavbar';

const history = useBasename(createHistory)({
  basename: '/transitions'
});

/**
 *  Main page contains sidebar, topnavbar and map
 */
const MainPage = React.createClass({

  mixins: [Lifecycle, History],

  redirectToLogin() {
    this.history.pushState(null, 'login');
  },

  componentWillUpdate(nextProps, nextState) {
   /* let userStore = nextState.userStore;
    console.log('userStore', userStore);
    if (userStore) {
      if (!userStore.result || !localStorage.getItem('username')) {
        this.history.pushState(null, 'login');
      }
      else {
        MapActions.fetchMarkers();
      }
    }*/
  },

  routerWillLeave(nextLocation) {
    console.log('user is redirecting to ' + nextLocation.pathname);
  },

  render() {
    return (
      <div>
        <TopNavbar />
        <Grid fluid={true}>
          <Row>
            <Col xs={12} md={12} className="content-block">
              <Map />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

export default MainPage;

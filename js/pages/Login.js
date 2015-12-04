'use strict';

import React from 'react';
import Reflux from 'reflux';
import { createHistory, useBasename } from 'history';
import { History, Lifecycle } from 'react-router';
//
import { Grid, Row, Col } from 'react-bootstrap';
//
import LoginForm from '../components/blocks/LoginForm';
//
import UserStore from '../stores/UserStore';

const history = useBasename(createHistory)({
  basename: '/transitions'
});

/**
 *  Login contains authorization form
 */
const Login = React.createClass({

  mixins: [Reflux.connect(UserStore, 'userStore'), Lifecycle, History],

  componentWillUpdate(nextProps, nextState) {
    let userStore = nextState.userStore;
    console.log('userStore', userStore);
    if (userStore && userStore.result && localStorage.getItem('username')) {
      this.history.pushState(null, 'main');
    }
  },

  routerWillLeave(nextLocation) {
    console.log('user is redirecting to ' + nextLocation.pathname);
  },

  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={8} xsOffset={2} md={4} mdOffset={4} className="login-block">
            <LoginForm />
          </Col>
        </Row>
      </Grid>
    );
  }
});

export default Login;

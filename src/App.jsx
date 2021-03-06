import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Sidebar } from './components';
import {
  Login,
  NoticesTool,
  InquiriesTool,
  OrdersTool,
  StoresTool,
  ArticlesTool
} from './containers';

class App extends Component {
  componentDidMount() {
    document.title = '식과당 관리자 페이지';
  }

  openMenu = () => {
    this.sidebar.openMenu();
  };

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <>
            <Route
              render={props => (
                <Sidebar
                  currentLocation={props.location}
                  ref={sidebar => (this.sidebar = sidebar)}
                />
              )}
            />
            <Route
              path="/"
              exact
              component={() => <Login toggleMenu={this.openMenu} />}
            />
            <Route
              path="/notices"
              exact
              component={() => <NoticesTool toggleMenu={this.openMenu} />}
            />
            <Route
              path="/inquiries"
              exact
              component={() => <InquiriesTool toggleMenu={this.openMenu} />}
            />
            <Route
              path="/orders"
              exact
              component={() => <OrdersTool toggleMenu={this.openMenu} />}
            />
            <Route
              path="/stores"
              exact
              component={() => <StoresTool toggleMenu={this.openMenu} />}
            />
            <Route
              path="/articles"
              exact
              component={() => <ArticlesTool toggleMenu={this.openMenu} />}
            />
          </>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Sidebar } from './components';
import { Login, JipijigiTool } from './containers';

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
              path="/jipijigi"
              exact
              component={() => <JipijigiTool toggleMenu={this.openMenu} />}
            />
          </>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

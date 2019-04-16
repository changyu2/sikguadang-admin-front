/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';

import * as palette from '../styles/palette';

const Logout = styled.div`
  font-size: ${palette.fontFour}px;
  display: block;
  margin-bottom: 20px;
  color: black;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  font-size: ${palette.fontFour}px;
  font-weight: bold;
  margin-bottom: 50px;
  display: block;
`;

class Sidebar extends Component {
  state = {
    isMenuOpen: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentLocation !== this.props.currentLocation) {
      this.setState({
        isMenuOpen: false
      });
    }
  }

  openMenu = () => {
    this.setState({
      isMenuOpen: true
    });
  };

  closeMenu = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  onMenuToggle = state => {
    this.setState({
      isMenuOpen: state.isOpen
    });
  };

  goHome = () => {
    const check = confirm('로그아웃 하시겠습니까?');
    if (check) {
      window.location.href = '/';
    }
  };
  render() {
    return (
      <>
        <Menu
          styles={styles.menu}
          right
          isOpen={this.state.isMenuOpen}
          onStateChange={this.onMenuToggle}
        >
          <StyledLink to="/stores">건강당 마켓 관리</StyledLink>
          <Logout onClick={this.goHome}>LOGOUT</Logout>
        </Menu>
      </>
    );
  }
}

const styles = {
  menu: {
    bmBurgerButton: {
      display: 'none'
    },
    bmBurgerBars: {
      background: '#fffff'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#ffffff',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMenuWrap: {
      width: '80%',
      maxWidth: 300
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }
};

export default Sidebar;

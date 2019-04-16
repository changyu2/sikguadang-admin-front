import React from 'react';
import styled from 'styled-components';

import * as palette from '../styles/palette';
import Icon from './Icon';

const TopbarContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 0;
  height: ${palette.topbarHeight}px;
  background-color: ${palette.colorOne};
  border-radius: 0px;
  margin-bottom: 0px;
  padding: 0px;
  border-bottom: 1px solid ${palette.colorThree};
`;

const TopbarInner = styled.div`
  max-width: ${palette.defaultMaxWidth}px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${palette.defaultSidePadding}px;
`;

const TopbarLeft = styled.div`
  float: left;
`;

const TopbarRight = styled.div`
  float: right;
`;

const TopbarTitle = styled.div`
  float: left;
  margin-right: 20px;
  text-align: center;
  text-decoration: none;
  height: ${palette.topbarHeight}px;
  line-height: ${palette.topbarHeight}px;
  z-index: -1;
  color: ${palette.colorFive};
  font-size: 18px;
`;

const TopbarLogo = styled.div`
  text-align: center;
  text-decoration: none;
  padding: 15px;
  z-index: -1;
  color: ${palette.colorOne};
`;

const Topbar = props => {
  return (
    <TopbarContainer>
      <TopbarInner>
        <TopbarLeft>
          {props.title ? (
            <TopbarTitle>{props.title}</TopbarTitle>
          ) : (
            <TopbarLogo />
          )}
        </TopbarLeft>
        <TopbarRight>
          <Icon onClick={props.toggleMenu} icon="menu" style={styles.icon} />
        </TopbarRight>
      </TopbarInner>
    </TopbarContainer>
  );
};

const styles = {
  icon: {
    margin: '14px 0',
    height: '22px',
    width: '22px',
    opacity: '1',
    backgroundSize: '100%',
    fill: 'palette.colorFive'
  }
};

export default Topbar;

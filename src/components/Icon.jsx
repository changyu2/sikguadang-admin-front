import React from 'react';

const style = {
  Icon: {
    position: 'relative',
    // "top":"1px",
    display: 'inline-block',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '1',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    cursor: 'pointer',
    verticalAlign: 'sub'
  }
};

const url = '/img/icons.svg';
const Icon = props => (
  <svg onClick={props.onClick} style={{ ...style.Icon, ...props.style }}>
    <use xlinkHref={`${url}#_${props.icon}`} />
  </svg>
);

export default Icon;

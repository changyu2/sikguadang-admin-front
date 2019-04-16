import styled from 'styled-components';

const Button = styled.button`
  height: 36px;
  border-radius: 2px;
  top: 0px;
  color: white;
  background-color: #40a9ff;
  border-color: #40a9ff;
  outline: 0;
  line-height: 1.5;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
`;

export default Button;

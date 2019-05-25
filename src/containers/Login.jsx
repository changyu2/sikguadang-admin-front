import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TextField } from 'material-ui';
import jsSHA from 'jssha';

import * as palette from '../styles/palette';
import { login } from '../actions/auth';

const LoginContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding-top: 200px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  vertical-align: center;
  width: 300px;
  height: 380px;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 32px;
  color: white;
  background-color: #1890ff;
  border: 1px solid transparent;
  border-color: #1890ff;
  border-radius: 4px;
  line-height: 1.5;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  padding: 0 15px;
  font-size: ${palette.fontThree}px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  outline: 0;
  &:hover {
    background-color: #40a9ff;
  }
`;

const Login = props => {
  const [authorId, setAuthorId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.removeItem('sat');
    localStorage.removeItem('sar');
  }, []);

  const handleChangeAuthorId = e => {
    setAuthorId(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!authorId) {
      alert('아이디를 입력해주세요.');
      return false;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return false;
    }

    if (true) {
      const shaobj = new jsSHA('SHA-256', 'TEXT');
      shaobj.update(password);
      const hashPW = shaobj.getHash('HEX');
      props
        .login(authorId, hashPW)
        .then(() => {
          props.history.push('/stores');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleKeyPress = e => {
    if (e.charCode === 13) {
      handleLogin();
    }
  };

  return (
    <LoginContainer>
      <TextField
        name="email"
        hintText="AuthorId"
        floatingLabelText="AuthorId"
        onChange={handleChangeAuthorId}
        style={{ width: '100%' }}
      />
      <TextField
        name="password"
        hintText="Password"
        floatingLabelText="Password"
        type="password"
        onChange={handleChangePassword}
        onKeyPress={handleKeyPress}
        style={{ width: '100%' }}
      />
      <LoginButton onClick={handleLogin}>Login</LoginButton>
    </LoginContainer>
  );
};

const mapStateToProps = state => {
  return {
    loginStatus: state.auth.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (authorId, password) => {
      return dispatch(login(authorId, password, '/'));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);

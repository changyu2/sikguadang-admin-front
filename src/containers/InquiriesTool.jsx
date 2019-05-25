/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import Promise from 'bluebird';
import { Grid, Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import { Dialog, FlatButton } from 'material-ui';

import {
  Topbar,
  FeedContainer,
  Button,
  DialogItem,
  ContentList
} from '../components';
import { me } from '../actions/auth';
import { getInquiriesList, editInquiry } from '../actions/inquiries';

const initialInquiry = {
  inquiryId: '',
  title: '',
  text: '',
  answer: {
    text: '',
    authorName: '',
    answerDate: null
  },
  sdate: null,
  cdate: null
};

const InquiriesTool = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [inquiry, setInquiry] = useState({ ...initialInquiry });
  const [page, setPage] = useState(0);

  const answerDate = inquiry.answer
    ? moment(inquiry.answer.answerDate)
        .utcOffset(9)
        .toDate()
    : null;

  useEffect(() => {
    props.me();
    props.getInquiriesList();
  }, []);

  const handleOpenInquiry = inquiryId => {
    if (inquiryId) {
      let inquiry = props.inquiryList.filter(
        inquiry => inquiry.inquiryId === inquiryId
      )[0];
      setModalVisible(true);
      setInquiry(inquiry);
      setInquiryId(inquiryId);
    } else {
      setModalVisible(true);
    }
  };

  const handleChangeText = e => {
    setInquiry(
      update(inquiry, {
        answer: { text: { $set: e.target.value } }
      })
    );
  };

  const handleChangeAnswerDate = (waste, answeredDate) => {
    let oldDate = inquiry.answer.answerDate;
    if (oldDate) {
      let hours = moment(oldDate).hours();
      let minutes = moment(oldDate).minutes();
      answeredDate = moment(answeredDate)
        .hours(hours)
        .minutes(minutes);
    }
    setInquiry(
      update(inquiry, {
        answer: { answerDate: { $set: answeredDate } }
      })
    );
  };

  const handleChangeAnswerTime = (waste, answeredDate) => {
    let oldDate = inquiry.answer.answerDate;
    if (oldDate) {
      let hours = moment(answeredDate).hours();
      let minutes = moment(answeredDate).minutes();
      createdDate = moment(oldDate)
        .hours(hours)
        .minutes(minutes);
    }
    setInquiry(
      update(inquiry, {
        answer: { answerDate: { $set: answeredDate } }
      })
    );
  };

  const handleOk = () => {
    const data = {};
    data.answer = inquiry.answer;
    data.answer.authorName = props.authorList.authorName;
    if (!inquiry.answer.text) {
      alert('답변 내용을 입력해주세요.');
      return false;
    }

    if (!inquiry.answer.answerDate) {
      alert('답변 날짜를 선택해주세요.');
      return false;
    }

    if (true) {
      return new Promise((resolve, reject) => {
        return resolve(props.editInquiry(inquiryId, data));
      })
        .then(response => {
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    const check = confirm('작성을 취소하시겠어요?');
    if (check) {
      setModalVisible(false);
      setInquiry({ ...initialInquiry });
      setInquiryId('');
    }
  };

  return (
    <>
      <Topbar title="식과당 관리자 페이지" toggleMenu={props.toggleMenu} />
      <FeedContainer>
        <Grid style={{ width: '100%', padding: '0px' }}>
          <Row style={{ margin: '20px 0px' }}>
            <Col xs={12} style={{ padding: '0px' }}>
              <ContentList
                contentName="Inquiry"
                inquiryList={props.inquiryList}
                openInquiry={handleOpenInquiry}
              />
            </Col>
          </Row>
        </Grid>
      </FeedContainer>
      <Dialog
        open={modalVisible}
        onRequestClose={handleCancel}
        contentLabel="Modal"
        shouldCloseOnOverlayClick={true}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={false}
        modal={false}
        actions={[
          <FlatButton label="Cancel" primary={true} onClick={handleCancel} />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={handleOk}
          />
        ]}
      >
        <DialogItem
          dialogName="Inquiry"
          inquiry={inquiry}
          changeText={handleChangeText}
          answerDate={answerDate}
          changeAnswerDate={handleChangeAnswerDate}
          changeAnswerTime={handleChangeAnswerTime}
        />
      </Dialog>
    </>
  );
};

const mapStateToProps = state => {
  return {
    authorList: state.auth.authorList,
    inquiryList: state.inquiries.inquiryList,
    getInquiryListStatus: state.inquiries.inquiryList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    me: () => {
      return dispatch(me());
    },
    getInquiriesList: (offset, limit) => {
      return dispatch(getInquiriesList(offset, limit));
    },
    editInquiry: (inquiryId, data) => {
      return dispatch(editInquiry(inquiryId, data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InquiriesTool)
);

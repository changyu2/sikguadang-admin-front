/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import Promise from 'bluebird';
import { arrayMove } from 'react-sortable-hoc';
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
import { postTempImages } from '../actions/images';
import { getNoticeList, postNotice, editNotice } from '../actions/notices';
import config from '../utils/config';

const initialNotice = {
  noticeId: '',
  title: '',
  text: '',
  imageCards: [],
  status: '',
  sdate: null,
  cdate: null
};

const NoticesTool = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [noticeId, setNoticeId] = useState('');
  const [notice, setNotice] = useState({ ...initialNotice });
  const [page, setPage] = useState(0);

  const sdate = notice.sdate
    ? moment(notice.sdate)
        .utcOffset(9)
        .toDate()
    : null;

  useEffect(() => {
    props.getNoticeList();
  }, []);

  const handleOpenNewNotice = () => {
    setModalVisible(true);
    setNotice({ ...initialNotice });
  };

  const handleOpenNotice = noticeId => {
    if (noticeId) {
      let notice = props.noticeList.filter(
        notice => notice.noticeId === noticeId
      )[0];
      setModalVisible(true);
      setNotice(notice);
      setNoticeId(noticeId);
    } else {
      setModalVisible(true);
    }
  };

  const handleDeleteCard = index => {
    setNotice(
      update(notice, {
        imageCards: { $splice: [[index, 1]] }
      })
    );
  };

  const handleChangeTitle = e => {
    setNotice(
      update(notice, {
        title: { $set: e.target.value }
      })
    );
  };

  const handleChangeText = e => {
    setNotice(
      update(notice, {
        text: { $set: e.target.value }
      })
    );
  };

  const handleDropImagesToImageCards = (files, type) => {
    if (files.length > 0) {
      files.sort(function(a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
      const imageSizePromiseArray = [];
      const data = new FormData();

      files.forEach(file => {
        const imageSizePromise = new Promise((resolve, reject) => {
          const image = new Image();
          image.src = file.preview;
          image.onload = function() {
            if (this.width === this.height && this.width <= 1600) {
              return resolve();
            } else if (this.width > this.height && this.width <= 1600) {
              return resolve();
            } else if (this.width < this.height && this.width <= 1600) {
              return resolve();
            } else {
              const err = new Error(
                file.name +
                  '\n이미지의 해상도는 작은 각이 1600 픽셀 이하로 준비해주세요.'
              );
              alert(
                '이미지의 해상도는 작은 각이 1600 픽셀 이하로 준비해주세요.'
              );
              return reject(err);
            }
          };
        });
        imageSizePromiseArray.push(imageSizePromise);
        data.append('images', file);
      });
      return new Promise.all(imageSizePromiseArray).then(() => {
        props
          .postTempImages(data)
          .then(response => {
            const tempKeyArray = response.value.data;
            if (tempKeyArray.length !== files.length) {
              alert(
                'Number of temp images returned, and uploaded are different'
              );
            } else {
              const newCardArray = [];
              for (let i in tempKeyArray) {
                const newCard = {};
                newCard.imageUrl = tempKeyArray[i];
                newCard.localImageUrl = files[i].preview;
                newCardArray.push(newCard);
              }
              setNotice(
                update(notice, {
                  imageCards: { $push: newCardArray }
                })
              );
            }
          })
          .catch(err => {
            alert('10MB 이하의 이미지를 업로드 해주세요.');
          });
      });
    } else {
      alert('이미지를 업로드 해주세요.');
    }
  };

  const handleChangeStatus = (e, index, value) => {
    setNotice(
      update(notice, {
        status: { $set: value }
      })
    );
  };

  const handleChangeScheduleDate = (waste, scheduledDate) => {
    let oldDate = notice.sdate;
    if (oldDate) {
      let hours = moment(oldDate).hours();
      let minutes = moment(oldDate).minutes();
      scheduledDate = moment(scheduledDate)
        .hours(hours)
        .minutes(minutes);
    }
    setNotice(
      update(notice, {
        sdate: { $set: scheduledDate }
      })
    );
  };

  const handleChangeScheduleTime = (waste, scheduledDate) => {
    let oldDate = notice.sdate;
    if (oldDate) {
      let hours = moment(scheduledDate).hours();
      let minutes = moment(scheduledDate).minutes();
      scheduledDate = moment(oldDate)
        .hours(hours)
        .minutes(minutes);
    }
    setNotice(
      update(notice, {
        sdate: { $set: scheduledDate }
      })
    );
  };

  const handleOk = () => {
    const data = {};
    data.notice = notice;

    if (!notice.title) {
      alert('제목을 입력해주세요.');
      return false;
    }

    if (!notice.text) {
      alert('내용을 입력해주세요.');
      return false;
    }

    if (!notice.status) {
      alert('상태를 선택해주세요.');
      return false;
    }

    if (!notice.sdate) {
      alert('날짜를 선택해주세요.');
      return false;
    }

    if (true) {
      return new Promise((resolve, reject) => {
        if (noticeId) {
          return resolve(props.editNotice(noticeId, data));
        } else {
          return resolve(props.postNotice(data));
        }
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
      setNotice({ ...initialNotice });
      setNoticeId('');
    }
  };

  const getImageUrl = (url, localUrl) => {
    let imageUrl;
    if (url && url !== null) {
      if (!url.startsWith('temp')) {
        imageUrl = config.get('cdn') + url;
      } else if (localUrl) {
        imageUrl = localUrl;
      }
    }
    return imageUrl;
  };

  const onSortEndForImageCards = ({ oldIndex, newIndex }) => {
    setNotice(
      update(notice, {
        imageCards: {
          $set: arrayMove(notice.imageCards, oldIndex, newIndex)
        }
      })
    );
  };

  return (
    <>
      <Topbar title="식과당 관리자 페이지" toggleMenu={props.toggleMenu} />
      <FeedContainer>
        <Grid style={{ width: '100%', padding: '0px' }}>
          <Row>
            <Col xs={12}>
              <Button onClick={handleOpenNewNotice}>New Notice</Button>
            </Col>
          </Row>
          <Row style={{ margin: '20px 0px' }}>
            <Col xs={12} style={{ padding: '0px' }}>
              <ContentList
                contentName="Notice"
                noticeList={props.noticeList}
                openNotice={handleOpenNotice}
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
          dialogName="Notice"
          notice={notice}
          changeTitle={handleChangeTitle}
          changeText={handleChangeText}
          dropImagesToImageCards={handleDropImagesToImageCards}
          onSortEndForImageCards={onSortEndForImageCards}
          deleteImageCards={handleDeleteCard}
          changeStatus={handleChangeStatus}
          sdate={sdate}
          changeScheduleDate={handleChangeScheduleDate}
          changeScheduleTime={handleChangeScheduleTime}
        />
      </Dialog>
    </>
  );
};

const mapStateToProps = state => {
  return {
    noticeList: state.notices.noticeList,
    getNoticeListStatus: state.notices.noticeList,
    postTempImagesStatus: state.images.postTempImages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getNoticeList: (offset, limit) => {
      return dispatch(getNoticeList(offset, limit));
    },
    postNotice: data => {
      return dispatch(postNotice(data));
    },
    editNotice: (noticeId, data) => {
      return dispatch(editNotice(noticeId, data));
    },
    postTempImages: data => {
      return dispatch(postTempImages(data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NoticesTool)
);

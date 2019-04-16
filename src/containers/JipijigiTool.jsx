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
  ContentList,
  FeedContainer,
  Button,
  DialogItem
} from '../components';
import {
  getJipijigiList,
  postJipijigi,
  editJipijigi
} from '../actions/jipijigi';
import { postTempImages } from '../actions/images';
import config from '../utils/config';

const initialJipijigi = {
  jipijigiId: '',
  title: '',
  description: '',
  thumbnailUrl: [],
  imageUrl: [],
  category: '',
  status: '',
  sdate: null,
  cdate: null
};

const JipijigiTool = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [jipijigiId, setJipijigiId] = useState('');
  const [jipijigi, setJipijigi] = useState({ ...initialJipijigi });
  const [page, setPage] = useState(0);

  const sdate = jipijigi.sdate
    ? moment(jipijigi.sdate)
        .utcOffset(9)
        .toDate()
    : null;

  useEffect(() => {
    props.getJipijigiList();
  }, []);

  const handleOpenNewJipijigi = () => {
    setModalVisible(true);
    setJipijigi({ ...initialJipijigi });
  };

  const handleOpenJipijigi = jipijiId => {
    if (jipijiId) {
      let jipijigi = props.jipijigiList.filter(
        jipijigi => jipijigi.jipijigiId === jipijigiId
      )[0];
      setModalVisible(true);
      setJipijigi(jipijigi);
      setJipijigiId(jipijiId);
    } else {
      setModalVisible(true);
    }
  };

  const handleDeleteThumbnailImage = index => {
    setJipijigi(
      update(jipijigi, {
        thumbnailUrl: { $splice: [[index, 1]] }
      })
    );
  };

  const handleDeleteCard = index => {
    setJipijigi(
      update(jipijigi, {
        imageUrl: { $splice: [[index, 1]] }
      })
    );
  };

  const handleChangeTitle = e => {
    setJipijigi(
      update(jipijigi, {
        title: { $set: e.target.value }
      })
    );
  };

  const handleChangeDescription = e => {
    setJipijigi(
      update(jipijigi, {
        description: { $set: e.target.value }
      })
    );
  };

  const handleDropImagesToThumbnail = (files, type) => {
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
              setJipijigi(
                update(jipijigi, {
                  thumbnailUrl: { $push: newCardArray }
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

  const handleDropImagesToImageUrl = (files, type) => {
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
              setJipijigi(
                update(jipijigi, {
                  imageUrl: { $push: newCardArray }
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

  const handleChangeCategory = (e, index, value) => {
    setJipijigi(
      update(jipijigi, {
        category: { $set: value }
      })
    );
  };

  const handleChangeStatus = (e, index, value) => {
    setJipijigi(
      update(jipijigi, {
        status: { $set: value }
      })
    );
  };

  const handleChangeScheduleDate = (waste, scheduledDate) => {
    let oldDate = jipijigi.sdate;
    if (oldDate) {
      let hours = moment(oldDate).hours();
      let minutes = moment(oldDate).minutes();
      scheduledDate = moment(scheduledDate)
        .hours(hours)
        .minutes(minutes);
    }
    setJipijigi(
      update(jipijigi, {
        sdate: { $set: scheduledDate }
      })
    );
  };

  const handleChangeScheduleTime = (waste, scheduledDate) => {
    let oldDate = jipijigi.sdate;
    if (oldDate) {
      let hours = moment(scheduledDate).hours();
      let minutes = moment(scheduledDate).minutes();
      scheduledDate = moment(oldDate)
        .hours(hours)
        .minutes(minutes);
    }
    setJipijigi(
      update(jipijigi, {
        sdate: { $set: scheduledDate }
      })
    );
  };

  const handleOk = () => {
    const data = {};
    data.jipijigi = jipijigi;

    if (!jipijigi.title) {
      alert('제목을 입력해주세요.');
      return false;
    }

    if (!jipijigi.thumbnailUrl.length === 0) {
      alert('썸네일 이미지를 업로드해주세요.');
      return false;
    }

    if (!jipijigi.category) {
      alert('카테고리를 선택해주세요.');
      return false;
    }

    if (!jipijigi.status) {
      alert('상태를 선택해주세요.');
      return false;
    }

    if (!jipijigi.sdate) {
      alert('스케쥴 날짜를 선택해주세요.');
      return false;
    }

    if (true) {
      return new Promise((resolve, reject) => {
        if (jipijigiId) {
          return resolve(props.editJipijigi(jipijigiId, data));
        } else {
          return resolve(props.postJipijigi(data));
        }
      })
        .then(response => {
          console.log(response);
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
      setJipijigi({ ...initialJipijigi });
      setJipijigiId('');
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

  const onSortEndForThumbnailUrl = ({ oldIndex, newIndex }) => {
    setJipijigi(
      update(jipijigi, {
        thumbnailUrl: {
          $set: arrayMove(jipijigi.thumbnailUrl, oldIndex, newIndex)
        }
      })
    );
  };

  const onSortEndForImageUrl = ({ oldIndex, newIndex }) => {
    setJipijigi(
      update(jipijigi, {
        imageUrl: {
          $set: arrayMove(jipijigi.imageUrl, oldIndex, newIndex)
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
              <Button onClick={handleOpenNewJipijigi}>New Article</Button>
            </Col>
          </Row>
          <Row style={{ margin: '20px 0px' }}>
            <Col xs={12} style={{ padding: '0px' }}>
              <ContentList
                contentName="Jipijigi"
                jipijigiList={props.jipijigiList}
                openJipijigi={handleOpenJipijigi}
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
          dialogName="Jipijigi"
          jipijigi={jipijigi}
          changeTitle={handleChangeTitle}
          changeDescription={handleChangeDescription}
          dropImagesToThumbnail={handleDropImagesToThumbnail}
          onSortEndForThumbnailUrl={onSortEndForThumbnailUrl}
          deleteThumbnailImage={handleDeleteThumbnailImage}
          dropImagesToImageUrl={handleDropImagesToImageUrl}
          onSortEndForImageUrl={onSortEndForImageUrl}
          changeCategory={handleChangeCategory}
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
    jipijigiList: state.jipijigi.jipijigiList,
    getJipijigiListStatus: state.jipijigi.jipijigiList,
    postTempImagesStatus: state.images.postTempImages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getJipijigiList: (offset, limit) => {
      return dispatch(getJipijigiList(offset, limit));
    },
    postJipijigi: data => {
      return dispatch(postJipijigi(data));
    },
    editJipijigi: (jipijigiId, data) => {
      return dispatch(editJipijigi(jipijigiId, data));
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
  )(JipijigiTool)
);

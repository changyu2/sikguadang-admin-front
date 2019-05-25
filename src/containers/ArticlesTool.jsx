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
import { getArticleList, postArticle, editArticle } from '../actions/articles';
import { postTempImages } from '../actions/images';
import config from '../utils/config';

const initialArticle = {
  articleId: '',
  title: '',
  thumbnailUrl: [],
  bannerUrl: [],
  imageUrl: [],
  hashTag: '',
  source: '',
  sourceLink: '',
  category: null,
  status: '',
  sdate: null,
  cdate: null
};

const ArticlesTool = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [articleId, setArticleId] = useState('');
  const [article, setArticle] = useState({ ...initialArticle });
  const [page, setPage] = useState(0);

  const sdate = article.sdate
    ? moment(article.sdate)
        .utcOffset(9)
        .toDate()
    : null;

  useEffect(() => {
    props.getArticleList();
  }, []);

  const handleOpenNewArticle = () => {
    setModalVisible(true);
    setArticle({ ...initialArticle });
  };

  const handleOpenArticle = articleId => {
    if (articleId) {
      let article = props.articleList.filter(
        article => article.articleId === articleId
      )[0];
      setModalVisible(true);
      setArticle(article);
      setArticleId(articleId);
    } else {
      setModalVisible(true);
    }
  };

  const handleDeleteThumbnailImage = index => {
    setArticle(
      update(article, {
        thumbnailUrl: { $splice: [[index, 1]] }
      })
    );
  };

  const handleDeleteBannerImage = index => {
    setArticle(
      update(article, {
        bannerUrl: { $splice: [[index, 1]] }
      })
    );
  };

  const handleDeleteCard = index => {
    setArticle(
      update(article, {
        imageUrl: { $splice: [[index, 1]] }
      })
    );
  };

  const handleChangeTitle = e => {
    setArticle(
      update(article, {
        title: { $set: e.target.value }
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
              setArticle(
                update(article, {
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

  const handleDropImagesToBannerUrl = (files, type) => {
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
            if (this.width === this.height && this.width <= 1920) {
              return resolve();
            } else if (this.width > this.height && this.width <= 1920) {
              return resolve();
            } else if (this.width < this.height && this.width <= 1920) {
              return resolve();
            } else {
              const err = new Error(
                file.name +
                  '\n이미지의 해상도는 작은 각이 1920 픽셀 이하로 준비해주세요.'
              );
              alert(
                '이미지의 해상도는 작은 각이 1920 픽셀 이하로 준비해주세요.'
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
              setArticle(
                update(article, {
                  bannerUrl: { $push: newCardArray }
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
              setArticle(
                update(article, {
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

  const handleChangeHashTag = e => {
    setArticle(
      update(article, {
        hashTag: { $set: e.target.value }
      })
    );
  };

  const handleChangeSource = e => {
    setArticle(
      update(article, {
        source: { $set: e.target.value }
      })
    );
  };

  const handleChangeSourceLink = e => {
    setArticle(
      update(article, {
        sourceLink: { $set: e.target.value }
      })
    );
  };

  const handleChangeCategory = (e, index, value) => {
    setArticle(
      update(article, {
        category: { $set: value }
      })
    );
  };

  const handleChangeStatus = (e, index, value) => {
    setArticle(
      update(article, {
        status: { $set: value }
      })
    );
  };

  const handleChangeScheduleDate = (waste, scheduledDate) => {
    let oldDate = article.sdate;
    if (oldDate) {
      let hours = moment(oldDate).hours();
      let minutes = moment(oldDate).minutes();
      scheduledDate = moment(scheduledDate)
        .hours(hours)
        .minutes(minutes);
    }
    setArticle(
      update(article, {
        sdate: { $set: scheduledDate }
      })
    );
  };

  const handleChangeScheduleTime = (waste, scheduledDate) => {
    let oldDate = article.sdate;
    if (oldDate) {
      let hours = moment(scheduledDate).hours();
      let minutes = moment(scheduledDate).minutes();
      scheduledDate = moment(oldDate)
        .hours(hours)
        .minutes(minutes);
    }
    setArticle(
      update(article, {
        sdate: { $set: scheduledDate }
      })
    );
  };

  const handleOk = () => {
    const data = {};
    data.article = article;

    if (!article.title) {
      alert('제목을 입력해주세요.');
      return false;
    }

    if (article.thumbnailUrl.length === 0) {
      alert('썸네일 이미지를 업로드해주세요.');
      return false;
    }

    if (article.bannerUrl.length === 0) {
      alert('배너 이미지를 업로드해주세요.');
      return false;
    }

    if (article.imageUrl.length === 0) {
      alert('내용 이미지를 업로드해주세요.');
      return false;
    }

    if (!article.hashTag) {
      alert('해쉬태그를 입력해주세요.');
      return false;
    }

    if (!article.source) {
      alert('출처를 입력해주세요.');
      return false;
    }

    if (!article.sourceLink) {
      alert('출처 링크를 입력해주세요.');
      return false;
    }

    if (!article.category) {
      alert('카테고리를 선택해주세요.');
      return false;
    }

    if (!article.status) {
      alert('상태를 선택해주세요.');
      return false;
    }

    if (!article.sdate) {
      alert('스케쥴 날짜를 선택해주세요.');
      return false;
    }

    if (true) {
      return new Promise((resolve, reject) => {
        if (articleId) {
          return resolve(props.editArticle(articleId, data));
        } else {
          return resolve(props.postArticle(data));
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
      setArticle({ ...initialArticle });
      setArticleId('');
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
    setArticle(
      update(article, {
        thumbnailUrl: {
          $set: arrayMove(article.thumbnailUrl, oldIndex, newIndex)
        }
      })
    );
  };

  const onSortEndForBannerUrl = ({ oldIndex, newIndex }) => {
    setArticle(
      update(article, {
        bannerUrl: {
          $set: arrayMove(article.bannerUrl, oldIndex, newIndex)
        }
      })
    );
  };

  const onSortEndForImageUrl = ({ oldIndex, newIndex }) => {
    setArticle(
      update(article, {
        imageUrl: {
          $set: arrayMove(article.imageUrl, oldIndex, newIndex)
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
              <Button onClick={handleOpenNewArticle}>New Article</Button>
            </Col>
          </Row>
          <Row style={{ margin: '20px 0px' }}>
            <Col xs={12} style={{ padding: '0px' }}>
              <ContentList
                contentName="Article"
                articleList={props.articleList}
                openArticle={handleOpenArticle}
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
          dialogName="Article"
          article={article}
          changeTitle={handleChangeTitle}
          dropImagesToThumbnail={handleDropImagesToThumbnail}
          onSortEndForThumbnailUrl={onSortEndForThumbnailUrl}
          deleteThumbnailImage={handleDeleteThumbnailImage}
          dropImagesToBannerUrl={handleDropImagesToBannerUrl}
          onSortEndForBannerUrl={onSortEndForBannerUrl}
          deleteBannerUrl={handleDeleteBannerImage}
          dropImagesToImageUrl={handleDropImagesToImageUrl}
          onSortEndForImageUrl={onSortEndForImageUrl}
          deleteImageUrl={handleDeleteCard}
          changeHashTag={handleChangeHashTag}
          changeSource={handleChangeSource}
          changeSourceLink={handleChangeSourceLink}
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
    articleList: state.articles.articleList,
    getArticleListStatus: state.articles.articleList,
    postTempImagesStatus: state.images.postTempImages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getArticleList: (offset, limit) => {
      return dispatch(getArticleList(offset, limit));
    },
    postArticle: data => {
      return dispatch(postArticle(data));
    },
    editArticle: (articleId, data) => {
      return dispatch(editArticle(articleId, data));
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
  )(ArticlesTool)
);

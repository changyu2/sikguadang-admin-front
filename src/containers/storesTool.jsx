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
  getStoreItemList,
  postStoreItem,
  editStoreItem
} from '../actions/stores';
import { postTempImages } from '../actions/images';
import config from '../utils/config';

const initialStoreItem = {
  storeItemId: '',
  title: '',
  description: '',
  thumbnailUrl: [],
  price: '',
  discountPrice: '',
  optionItem1Name: '',
  optionItem1Price: '',
  optionItem2Name: '',
  optionItem2Price: '',
  optionItem3Name: '',
  optionItem3Price: '',
  optionItem4Name: '',
  optionItem4Price: '',
  weight: '',
  expirationDate: '',
  category: null,
  soldOut: null,
  limited: null,
  hot: null,
  new: null,
  status: '',
  sdate: null,
  cdate: null,
  productDetailCards: [],
  productInfoCards: []
};

const StoresTool = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [storeItemId, setStoreItemId] = useState('');
  const [storeItem, setStoreItem] = useState({ ...initialStoreItem });
  const [page, setPage] = useState(0);

  const sdate = storeItem.sdate
    ? moment(storeItem.sdate)
        .utcOffset(9)
        .toDate()
    : null;

  useEffect(() => {
    props.getStoreItemList();
  }, []);

  const handleOpenNewStoreItem = () => {
    setModalVisible(true);
    setStoreItem({ ...initialStoreItem });
  };

  const handleOpenStoreItem = storeItemId => {
    if (storeItemId) {
      let storeItem = props.storeItemList.filter(
        storeItem => storeItem.storeItemId === storeItemId
      )[0];
      setModalVisible(true);
      setStoreItem(storeItem);
      setStoreItemId(storeItemId);
    }
  };

  const handleDeleteThumbnailImage = index => {
    setStoreItem(
      update(storeItem, {
        thumbnailUrl: { $splice: [[index, 1]] }
      })
    );
  };

  const handleDeleteProductDetailCard = index => {
    setStoreItem(
      update(storeItem, {
        productDetailCards: { $splice: [[index, 1]] }
      })
    );
  };

  const handleDeleteProductInfoCard = index => {
    setStoreItem(
      update(storeItem, {
        productInfoCards: { $splice: [[index, 1]] }
      })
    );
  };

  const handleChangeTitle = e => {
    setStoreItem(
      update(storeItem, {
        title: { $set: e.target.value }
      })
    );
  };

  const handleChangeDescription = e => {
    setStoreItem(
      update(storeItem, {
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
              setStoreItem(
                update(storeItem, {
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

  const handleDropImagesToProductDetailCards = (files, type) => {
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
              setStoreItem(
                update(storeItem, {
                  productDetailCards: { $push: newCardArray }
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

  const handleDropImagesToProductInfoCards = (files, type) => {
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
              setStoreItem(
                update(storeItem, {
                  productInfoCards: { $push: newCardArray }
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

  const handleChangePrice = e => {
    setStoreItem(
      update(storeItem, {
        price: { $set: e.target.value }
      })
    );
  };

  const handleChangeDiscountPrice = e => {
    setStoreItem(
      update(storeItem, {
        discountPrice: { $set: e.target.value }
      })
    );
  };

  const handleChangeOptionItem1Name = e => {
    setStoreItem(
      update(storeItem, {
        optionItem1Name: { $set: e.target.value }
      })
    );
  };

  const handleChangeOptionItem1Price = e => {
    setStoreItem(
      update(storeItem, {
        optionItem1Price: { $set: e.target.value }
      })
    );
  };

  const handleChangeOptionItem2Name = e => {
    setStoreItem(
      update(storeItem, {
        optionItem2Name: { $set: e.target.value }
      })
    );
  };

  const handleChangeOptionItem2Price = e => {
    setStoreItem(
      update(storeItem, {
        optionItem2Price: { $set: e.target.value }
      })
    );
  };

  const handleChangeOptionItem3Name = e => {
    setStoreItem(
      update(storeItem, {
        optionItem3Name: { $set: e.target.value }
      })
    );
  };

  const handleChangeOptionItem3Price = e => {
    setStoreItem(
      update(storeItem, {
        optionItem3Price: { $set: e.target.value }
      })
    );
  };

  const handleChangeOptionItem4Name = e => {
    setStoreItem(
      update(storeItem, {
        optionItem4Name: { $set: e.target.value }
      })
    );
  };

  const handleChangeOptionItem4Price = e => {
    setStoreItem(
      update(storeItem, {
        optionItem4Price: { $set: e.target.value }
      })
    );
  };

  const handleChangeWeight = e => {
    setStoreItem(
      update(storeItem, {
        weight: { $set: e.target.value }
      })
    );
  };

  const handleChangeExpirationDate = e => {
    setStoreItem(
      update(storeItem, {
        expirationDate: { $set: e.target.value }
      })
    );
  };

  const handleChangeCategory = (e, index, value) => {
    setStoreItem(
      update(storeItem, {
        category: { $set: value }
      })
    );
  };

  const handleChangeSoldOut = (e, index, value) => {
    setStoreItem(
      update(storeItem, {
        soldOut: { $set: value }
      })
    );
  };

  const handleChangeLimited = (e, index, value) => {
    setStoreItem(
      update(storeItem, {
        limited: { $set: value }
      })
    );
  };

  const handleChangeHot = (e, index, value) => {
    setStoreItem(
      update(storeItem, {
        hot: { $set: value }
      })
    );
  };

  const handleChangeNew = (e, index, value) => {
    setStoreItem(
      update(storeItem, {
        new: { $set: value }
      })
    );
  };

  const handleChangeStatus = (e, index, value) => {
    setStoreItem(
      update(storeItem, {
        status: { $set: value }
      })
    );
  };

  const handleChangeScheduleDate = (waste, scheduledDate) => {
    let oldDate = storeItem.sdate;
    if (oldDate) {
      let hours = moment(oldDate).hours();
      let minutes = moment(oldDate).minutes();
      scheduledDate = moment(scheduledDate)
        .hours(hours)
        .minutes(minutes);
    }
    setStoreItem(
      update(storeItem, {
        sdate: { $set: scheduledDate }
      })
    );
  };

  const handleChangeScheduleTime = (waste, scheduledDate) => {
    let oldDate = storeItem.sdate;
    if (oldDate) {
      let hours = moment(scheduledDate).hours();
      let minutes = moment(scheduledDate).minutes();
      scheduledDate = moment(oldDate)
        .hours(hours)
        .minutes(minutes);
    }
    setStoreItem(
      update(storeItem, {
        sdate: { $set: scheduledDate }
      })
    );
  };

  const handleOk = () => {
    const data = {};
    data.storeItem = storeItem;

    if (!storeItem.title) {
      alert('상품명을 입력해주세요.');
      return false;
    }

    if (storeItem.thumbnailUrl.length === 0) {
      alert('썸네일 이미지를 업로드해주세요.');
      return false;
    }

    if (!storeItem.price) {
      alert('가격을 입력해주세요.');
      return false;
    }

    if (!storeItem.weight) {
      alert('중량 정보를 입력해주세요.');
      return false;
    }

    if (!storeItem.expirationDate) {
      alert('유통기한 정보를 입력해주세요.');
      return false;
    }

    if (!storeItem.category) {
      alert('카테고리를 선택해주세요.');
      return false;
    }

    if (storeItem.soldOut === null) {
      alert('품절 여부를 선택해주세요.');
      return false;
    }

    if (storeItem.limited === null) {
      alert('기간 한정 상품 여부를 선택해주세요.');
      return false;
    }

    if (storeItem.hot === null) {
      alert('인기 상품 여부를 선택해주세요.');
      return false;
    }

    if (storeItem.new === null) {
      alert('신상품 여부를 선택해주세요.');
      return false;
    }

    if (!storeItem.status) {
      alert('상태를 선택해주세요.');
      return false;
    }

    if (!storeItem.sdate) {
      alert('스케쥴 날짜를 선택해주세요.');
      return false;
    }

    if (storeItem.productDetailCards.length === 0) {
      alert('상품 세부 이미지를 업로드 해주세요.');
      return false;
    }

    if (storeItem.productInfoCards.length === 0) {
      alert('제품정보고시 이미지를 업로드 해주세요.');
      return false;
    }

    if (true) {
      return new Promise((resolve, reject) => {
        if (storeItemId) {
          return resolve(props.editStoreItem(storeItemId, data));
        } else {
          return resolve(props.postStoreItem(data));
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
      setStoreItem({ ...initialStoreItem });
      setStoreItemId('');
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
    setStoreItem(
      update(storeItem, {
        thumbnailUrl: {
          $set: arrayMove(storeItem.thumbnailUrl, oldIndex, newIndex)
        }
      })
    );
  };

  const onSortEndForProductDetailCards = ({ oldIndex, newIndex }) => {
    setStoreItem(
      update(storeItem, {
        productDetailCards: {
          $set: arrayMove(storeItem.productDetailCards, oldIndex, newIndex)
        }
      })
    );
  };

  const onSortEndForProductInfoCards = ({ oldIndex, newIndex }) => {
    setStoreItem(
      update(storeItem, {
        productInfoCards: {
          $set: arrayMove(storeItem.productInfoCards, oldIndex, newIndex)
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
              <Button onClick={handleOpenNewStoreItem}>New StoreItem</Button>
            </Col>
          </Row>
          <Row style={{ margin: '20px 0px' }}>
            <Col xs={12} style={{ padding: '0px' }}>
              <ContentList
                contentName="Store"
                storeItemList={props.storeItemList}
                openStoreItem={handleOpenStoreItem}
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
          dialogName="Store"
          storeItem={storeItem}
          changeTitle={handleChangeTitle}
          changeDescription={handleChangeDescription}
          dropImagesToThumbnail={handleDropImagesToThumbnail}
          onSortEndForThumbnailUrl={onSortEndForThumbnailUrl}
          deleteThumbnailImage={handleDeleteThumbnailImage}
          changePrice={handleChangePrice}
          changeDiscountPrice={handleChangeDiscountPrice}
          changeOptionItem1Name={handleChangeOptionItem1Name}
          changeOptionItem1Price={handleChangeOptionItem1Price}
          changeOptionItem2Name={handleChangeOptionItem2Name}
          changeOptionItem2Price={handleChangeOptionItem2Price}
          changeOptionItem3Name={handleChangeOptionItem3Name}
          changeOptionItem3Price={handleChangeOptionItem3Price}
          changeOptionItem4Name={handleChangeOptionItem4Name}
          changeOptionItem4Price={handleChangeOptionItem4Price}
          changeWeight={handleChangeWeight}
          changeExpirationDate={handleChangeExpirationDate}
          changeCategory={handleChangeCategory}
          changeSoldOut={handleChangeSoldOut}
          changeLimited={handleChangeLimited}
          changeHot={handleChangeHot}
          changeNew={handleChangeNew}
          changeStatus={handleChangeStatus}
          sdate={sdate}
          changeScheduleDate={handleChangeScheduleDate}
          changeScheduleTime={handleChangeScheduleTime}
          dropImagesToProductDetailCards={handleDropImagesToProductDetailCards}
          onSortEndForProductDetailCards={onSortEndForProductDetailCards}
          deleteProductDetailCard={handleDeleteProductDetailCard}
          dropImagesToProductInfoCards={handleDropImagesToProductInfoCards}
          onSortEndForProductInfoCards={onSortEndForProductInfoCards}
          deleteProductInfoCard={handleDeleteProductInfoCard}
        />
      </Dialog>
    </>
  );
};

const mapStateToProps = state => {
  return {
    storeItemList: state.stores.storeItemList,
    getStoreListStatus: state.stores.storeItemList,
    postTempImagesStatus: state.images.postTempImages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStoreItemList: (offset, limit) => {
      return dispatch(getStoreItemList(offset, limit));
    },
    postStoreItem: data => {
      return dispatch(postStoreItem(data));
    },
    editStoreItem: (storeItemId, data) => {
      return dispatch(editStoreItem(storeItemId, data));
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
  )(StoresTool)
);

import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {
  Paper,
  TextField,
  SelectField,
  DatePicker,
  TimePicker,
  MenuItem
} from 'material-ui';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Dropzone from 'react-dropzone';

import * as palette from '../styles/palette';
import config from '../utils/config';

const SortableItem = SortableElement(({ card, idx, handleDeleteCard }) => (
  <Col xs={4} style={{ zIndex: 9999, display: 'inline-block' }}>
    <Paper style={styles.card}>
      <div
        style={styles.cardDeleteButton}
        onClick={() => handleDeleteCard(idx)}
      >
        X
      </div>
      {/* <div style={styles.cardDragHandle}><DragHandle /></div> */}
      <img
        alt="cardImage"
        src={
          card.localImageUrl
            ? card.localImageUrl
            : config.get('cdn') + card.imageUrl
        }
        style={{ width: '100%' }}
      />
    </Paper>
  </Col>
));

const SortableList = SortableContainer(({ cards, handleDeleteCard }) => {
  return (
    <div style={{ overflow: 'auto' }}>
      {cards.map((card, index) => (
        <SortableItem
          idx={index}
          index={index}
          card={card}
          handleDeleteCard={handleDeleteCard}
          key={`item=${index}`}
        />
      ))}
    </div>
  );
});

const DialogItem = props => {
  function renderSwitch(dialogName) {
    switch (dialogName) {
      case 'Notice':
        return (
          <Row>
            <Col xs={12}>
              <TextField
                floatingLabelText="제목"
                floatingLabelFixed={true}
                defaultValue={props.notice.title}
                onChange={props.changeTitle}
                style={styles.col}
              />
              <TextField
                floatingLabelText="내용"
                floatingLabelFixed={true}
                defaultValue={props.notice.text}
                onChange={props.changeText}
                multiLine={true}
                style={styles.col}
              />
              <Row>
                <Dropzone
                  onDrop={files => props.dropImagesToImageCards(files)}
                  style={styles.cardSlideContainer}
                  accept="image/*"
                  disableClick={true}
                >
                  <div>공지사항 이미지</div>
                  <Row>
                    <SortableList
                      axis={'xy'}
                      cards={props.notice.imageCards}
                      onSortEnd={props.onSortEndForImageCards}
                      handleDeleteCard={props.deleteImageCards}
                      useDragHandle={false}
                    />
                    <Col xs={4}>
                      <Dropzone
                        onDrop={files => props.dropImagesToImageCards(files)}
                        accept="image/*"
                        style={{ border: 'none' }}
                      >
                        <Paper style={styles.card}>
                          <div
                            style={{
                              height: 150,
                              textAlign: 'center',
                              transform: 'translateY(40%)'
                            }}
                          >
                            이미지 추가
                          </div>
                        </Paper>
                      </Dropzone>
                    </Col>
                  </Row>
                </Dropzone>
              </Row>
              <SelectField
                floatingLabelText="상태"
                value={props.notice.status}
                onChange={props.changeStatus}
                style={styles.col}
              >
                <MenuItem value={'actv'} primaryText="active" />
                <MenuItem value={'del'} primaryText="delete" />
              </SelectField>
              <DatePicker
                floatingLabelText="스케쥴 날짜"
                hintText="DATE"
                value={props.sdate}
                onChange={props.changeScheduleDate}
                style={styles.dateAndTimePicker}
                textFieldStyle={styles.col}
              />
              <TimePicker
                floatingLabelText="스케쥴 시간"
                hintText="TIME"
                value={props.sdate}
                onChange={props.changeScheduleTime}
                style={styles.dateAndTimePicker}
                textFieldStyle={styles.col}
              />
            </Col>
          </Row>
        );
      case 'Inquiry':
        return (
          <Row>
            <Col xs={12}>
              <TextField
                disabled
                floatingLabelText="제목"
                floatingLabelFixed={true}
                defaultValue={props.inquiry.title}
                style={styles.col}
              />
              <TextField
                floatingLabelText="내용"
                floatingLabelFixed={true}
                defaultValue={props.inquiry.answer.text}
                onChange={props.changeText}
                multiLine={true}
                style={styles.col}
              />
              <DatePicker
                floatingLabelText="답변 날짜"
                hintText="DATE"
                value={props.answerDate}
                onChange={props.changeAnswerDate}
                style={styles.dateAndTimePicker}
                textFieldStyle={styles.col}
              />
              <TimePicker
                floatingLabelText="답변 시간"
                hintText="TIME"
                value={props.answerDate}
                onChange={props.changeAnswerTime}
                style={styles.dateAndTimePicker}
                textFieldStyle={styles.col}
              />
            </Col>
          </Row>
        );
      case 'Store':
        return (
          <Row>
            <Col xs={12}>
              <TextField
                floatingLabelText="제목"
                floatingLabelFixed={true}
                defaultValue={props.storeItem.title}
                onChange={props.changeTitle}
                style={styles.col}
              />
              <TextField
                floatingLabelText="부제목"
                floatingLabelFixed={true}
                defaultValue={props.storeItem.description}
                onChange={props.changeDescription}
                style={styles.col}
              />
              <Row>
                <Dropzone
                  onDrop={files => props.dropImagesToThumbnail(files)}
                  style={styles.cardSlideContainer}
                  accept="image/*"
                  disableClick={true}
                >
                  <div>상품 썸네일 이미지</div>
                  <Row>
                    <SortableList
                      axis={'xy'}
                      cards={props.storeItem.thumbnailUrl}
                      onSortEnd={props.onSortEndForThumbnailUrl}
                      handleDeleteCard={props.deleteThumbnailImage}
                      useDragHandle={false}
                    />
                    <Col xs={4}>
                      <Dropzone
                        onDrop={files => props.dropImagesToThumbnail(files)}
                        accept="image/*"
                        style={{ border: 'none' }}
                      >
                        <Paper style={styles.card}>
                          <div
                            style={{
                              height: 150,
                              textAlign: 'center',
                              transform: 'translateY(40%)'
                            }}
                          >
                            이미지 추가
                          </div>
                        </Paper>
                      </Dropzone>
                    </Col>
                  </Row>
                </Dropzone>
              </Row>
              <TextField
                floatingLabelText="가격"
                floatingLabelFixed={true}
                type="number"
                defaultValue={props.storeItem.price}
                onChange={props.changePrice}
                style={styles.col}
              />
              <TextField
                floatingLabelText="할인가격"
                floatingLabelFixed={true}
                type="number"
                defaultValue={props.storeItem.discountPrice}
                onChange={props.changeDiscountPrice}
                style={styles.col}
              />
              <TextField
                floatingLabelText="옵션 1 이름"
                floatingLabelFixed={true}
                defaultValue={props.storeItem.optionItem1Name}
                onChange={props.changeOptionItem1Name}
                style={styles.col}
              />
              <TextField
                floatingLabelText="옵션 1 가격"
                floatingLabelFixed={true}
                type="number"
                defaultValue={props.storeItem.optionItem1Price}
                onChange={props.changeOptionItem1Price}
                style={styles.col}
              />
              <TextField
                floatingLabelText="옵션 2 이름"
                floatingLabelFixed={true}
                defaultValue={props.storeItem.optionItem2Name}
                onChange={props.changeOptionItem2Name}
                style={styles.col}
              />
              <TextField
                floatingLabelText="옵션 2 가격"
                floatingLabelFixed={true}
                type="number"
                defaultValue={props.storeItem.optionItem2Price}
                onChange={props.changeOptionItem2Price}
                style={styles.col}
              />
              <TextField
                floatingLabelText="옵션 3 이름"
                floatingLabelFixed={true}
                defaultValue={props.storeItem.optionItem3Name}
                onChange={props.changeOptionItem3Name}
                style={styles.col}
              />
              <TextField
                floatingLabelText="옵션 3 가격"
                floatingLabelFixed={true}
                type="number"
                defaultValue={props.storeItem.optionItem3Price}
                onChange={props.changeOptionItem3Price}
                style={styles.col}
              />
              <TextField
                floatingLabelText="옵션 4 이름"
                floatingLabelFixed={true}
                defaultValue={props.storeItem.optionItem4Name}
                onChange={props.changeOptionItem4Name}
                style={styles.col}
              />
              <TextField
                floatingLabelText="옵션 4 가격"
                floatingLabelFixed={true}
                type="number"
                defaultValue={props.storeItem.optionItem4Price}
                onChange={props.changeOptionItem4Price}
                style={styles.col}
              />
              <TextField
                floatingLabelText="중량"
                floatingLabelFixed={true}
                defaultValue={props.storeItem.weight}
                onChange={props.changeWeight}
                style={styles.col}
              />
              <TextField
                floatingLabelText="유통기한"
                floatingLabelFixed={true}
                defaultValue={props.storeItem.expirationDate}
                onChange={props.changeExpirationDate}
                style={styles.col}
              />
              <SelectField
                floatingLabelText="카테고리"
                value={props.storeItem.category}
                onChange={props.changeCategory}
                style={styles.col}
              >
                <MenuItem value={1} primaryText="반찬" />
                <MenuItem value={2} primaryText="간식" />
                <MenuItem value={3} primaryText="영양제" />
              </SelectField>
              <SelectField
                floatingLabelText="품절 여부"
                value={props.storeItem.soldOut}
                onChange={props.changeSoldOut}
                style={styles.col}
              >
                <MenuItem value={true} primaryText="true" />
                <MenuItem value={false} primaryText="false" />
              </SelectField>
              <SelectField
                floatingLabelText="기간 한정 상품 여부"
                value={props.storeItem.limited}
                onChange={props.changeLimited}
                style={styles.col}
              >
                <MenuItem value={true} primaryText="true" />
                <MenuItem value={false} primaryText="false" />
              </SelectField>
              <SelectField
                floatingLabelText="인기상품 여부"
                value={props.storeItem.hot}
                onChange={props.changeHot}
                style={styles.col}
              >
                <MenuItem value={true} primaryText="true" />
                <MenuItem value={false} primaryText="false" />
              </SelectField>
              <SelectField
                floatingLabelText="신상품 여부"
                value={props.storeItem.new}
                onChange={props.changeNew}
                style={styles.col}
              >
                <MenuItem value={true} primaryText="true" />
                <MenuItem value={false} primaryText="false" />
              </SelectField>
              <SelectField
                floatingLabelText="상태"
                value={props.storeItem.status}
                onChange={props.changeStatus}
                style={styles.col}
              >
                <MenuItem value={'actv'} primaryText="active" />
                <MenuItem value={'del'} primaryText="delete" />
              </SelectField>
              <DatePicker
                floatingLabelText="스케쥴 날짜"
                hintText="DATE"
                value={props.sdate}
                onChange={props.changeScheduleDate}
                style={styles.dateAndTimePicker}
                textFieldStyle={styles.col}
              />
              <TimePicker
                floatingLabelText="스케쥴 시간"
                hintText="TIME"
                value={props.sdate}
                onChange={props.changeScheduleTime}
                style={styles.dateAndTimePicker}
                textFieldStyle={styles.col}
              />
              <Row>
                <Dropzone
                  onDrop={files => props.dropImagesToProductDetailCards(files)}
                  style={styles.cardSlideContainer}
                  accept="image/*"
                  disableClick={true}
                >
                  <div>상품 세부 이미지</div>
                  <Row>
                    <SortableList
                      axis={'xy'}
                      cards={props.storeItem.productDetailCards}
                      onSortEnd={props.onSortEndForProductDetailCards}
                      handleDeleteCard={props.deleteProductDetailCard}
                      useDragHandle={false}
                    />
                    <Col xs={4}>
                      <Dropzone
                        onDrop={files =>
                          props.dropImagesToProductDetailCards(files)
                        }
                        accept="image/*"
                        style={{ border: 'none' }}
                      >
                        <Paper style={styles.card}>
                          <div
                            style={{
                              height: 150,
                              textAlign: 'center',
                              transform: 'translateY(40%)'
                            }}
                          >
                            이미지 추가
                          </div>
                        </Paper>
                      </Dropzone>
                    </Col>
                  </Row>
                </Dropzone>
              </Row>
              <Row>
                <Dropzone
                  onDrop={files => props.dropImagesToProductInfoCards(files)}
                  style={styles.cardSlideContainer}
                  accept="image/*"
                  disableClick={true}
                >
                  <div>제품정보고시 이미지</div>
                  <Row>
                    <SortableList
                      axis={'xy'}
                      cards={props.storeItem.productInfoCards}
                      onSortEnd={props.onSortEndForProductInfoCards}
                      handleDeleteCard={props.deleteProductInfoCard}
                      useDragHandle={false}
                    />
                    <Col xs={4}>
                      <Dropzone
                        onDrop={files =>
                          props.dropImagesToProductInfoCards(files)
                        }
                        accept="image/*"
                        style={{ border: 'none' }}
                      >
                        <Paper style={styles.card}>
                          <div
                            style={{
                              height: 150,
                              textAlign: 'center',
                              transform: 'translateY(40%)'
                            }}
                          >
                            이미지 추가
                          </div>
                        </Paper>
                      </Dropzone>
                    </Col>
                  </Row>
                </Dropzone>
              </Row>
            </Col>
          </Row>
        );
      case 'Article':
        return (
          <Row>
            <Col xs={12}>
              <TextField
                floatingLabelText="제목"
                floatingLabelFixed={true}
                defaultValue={props.article.title}
                onChange={props.changeTitle}
                style={styles.col}
              />
              <Row style={{ marginBottom: '40px' }}>
                <Dropzone
                  onDrop={files => props.dropImagesToThumbnail(files)}
                  style={styles.cardSlideContainer}
                  accept="image/*"
                  disableClick={true}
                >
                  <div>지피지기 당뇨 썸네일 이미지</div>
                  <Row>
                    <SortableList
                      axis={'xy'}
                      cards={props.article.thumbnailUrl}
                      onSortEnd={props.onSortEndForThumbnailUrl}
                      handleDeleteCard={props.deleteThumbnailImage}
                      useDragHandle={false}
                    />
                    <Col xs={4}>
                      <Dropzone
                        onDrop={files => props.dropImagesToThumbnail(files)}
                        accept="image/*"
                        style={{ border: 'none' }}
                      >
                        <Paper style={styles.card}>
                          <div
                            style={{
                              height: 150,
                              textAlign: 'center',
                              transform: 'translateY(40%)'
                            }}
                          >
                            이미지 추가
                          </div>
                        </Paper>
                      </Dropzone>
                    </Col>
                  </Row>
                </Dropzone>
              </Row>
              <Row style={{ marginBottom: '40px' }}>
                <Dropzone
                  onDrop={files => props.dropImagesToBannerUrl(files)}
                  style={styles.cardSlideContainer}
                  accept="image/*"
                  disableClick={true}
                >
                  <div>지피지기 당뇨 배너 이미지</div>
                  <Row>
                    <SortableList
                      axis={'xy'}
                      cards={props.article.bannerUrl}
                      onSortEnd={props.onSortEndForBannerUrl}
                      handleDeleteCard={props.deleteBannerUrl}
                      useDragHandle={false}
                    />
                    <Col xs={4}>
                      <Dropzone
                        onDrop={files => props.dropImagesToBannerUrl(files)}
                        accept="image/*"
                        style={{ border: 'none' }}
                      >
                        <Paper style={styles.card}>
                          <div
                            style={{
                              height: 150,
                              textAlign: 'center',
                              transform: 'translateY(40%)'
                            }}
                          >
                            이미지 추가
                          </div>
                        </Paper>
                      </Dropzone>
                    </Col>
                  </Row>
                </Dropzone>
              </Row>
              <Row>
                <Dropzone
                  onDrop={files => props.dropImagesToImageUrl(files)}
                  style={styles.cardSlideContainer}
                  accept="image/*"
                  disableClick={true}
                >
                  <div>지피지기 당뇨 이미지</div>
                  <Row>
                    <SortableList
                      axis={'xy'}
                      cards={props.article.imageUrl}
                      onSortEnd={props.onSortEndForImageUrl}
                      handleDeleteCard={props.deleteImageUrl}
                      useDragHandle={false}
                    />
                    <Col xs={4}>
                      <Dropzone
                        onDrop={files => props.dropImagesToImageUrl(files)}
                        accept="image/*"
                        style={{ border: 'none' }}
                      >
                        <Paper style={styles.card}>
                          <div
                            style={{
                              height: 150,
                              textAlign: 'center',
                              transform: 'translateY(40%)'
                            }}
                          >
                            이미지 추가
                          </div>
                        </Paper>
                      </Dropzone>
                    </Col>
                  </Row>
                </Dropzone>
              </Row>
              <TextField
                floatingLabelText="해쉬태그"
                floatingLabelFixed={true}
                defaultValue={props.article.hashTag}
                onChange={props.changeHashTag}
                style={styles.col}
              />
              <TextField
                floatingLabelText="출처"
                floatingLabelFixed={true}
                defaultValue={props.article.source}
                onChange={props.changeSource}
                style={styles.col}
              />
              <TextField
                floatingLabelText="출처 링크"
                floatingLabelFixed={true}
                defaultValue={props.article.sourceLink}
                onChange={props.changeSourceLink}
                style={styles.col}
              />
              <SelectField
                floatingLabelText="카테고리"
                value={props.article.category}
                onChange={props.changeCategory}
                style={styles.col}
              >
                <MenuItem value={1} primaryText="당뇨란?" />
                <MenuItem value={2} primaryText="당뇨 음식" />
                <MenuItem value={3} primaryText="당뇨 운동" />
              </SelectField>
              <SelectField
                floatingLabelText="상태"
                value={props.article.status}
                onChange={props.changeStatus}
                style={styles.col}
              >
                <MenuItem value={'actv'} primaryText="active" />
                <MenuItem value={'del'} primaryText="delete" />
              </SelectField>
              <DatePicker
                floatingLabelText="스케쥴 날짜"
                hintText="DATE"
                value={props.sdate}
                onChange={props.changeScheduleDate}
                style={styles.dateAndTimePicker}
                textFieldStyle={styles.col}
              />
              <TimePicker
                floatingLabelText="스케쥴 시간"
                hintText="TIME"
                value={props.sdate}
                onChange={props.changeScheduleTime}
                style={styles.dateAndTimePicker}
                textFieldStyle={styles.col}
              />
            </Col>
          </Row>
        );
      default:
        return null;
    }
  }

  return <>{renderSwitch(props.dialogName)}</>;
};

const styles = {
  col: {
    width: '100%'
  },
  dateAndTimePicker: {
    display: 'inline-block',
    width: '50%'
  },
  dropZone: {
    width: '100%',
    maxWidth: 300,
    margin: '5px 0'
  },
  cardSlideContainer: {
    margin: 5,
    padding: 5,
    border: '1px solid grey',
    width: '100%'
  },
  card: {
    margin: 5,
    position: 'relative'
  },
  cardDeleteButton: {
    top: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: palette.colorOne,
    opacity: 0.7,
    zIndex: 9999,
    width: '44px',
    height: '44px',
    fontSize: palette.fontFour + 'px',
    textAlign: 'center',
    lineHeight: '20%',
    padding: '10% 0'
  },
  cardDragHandle: {
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: palette.colorOne,
    opacity: 0.7,
    zIndex: 9999,
    width: '44px',
    height: '44px',
    fontSize: palette.fontFour + 'px',
    textAlign: 'center',
    lineHeight: '20%',
    padding: '10% 0'
  }
};

export default DialogItem;

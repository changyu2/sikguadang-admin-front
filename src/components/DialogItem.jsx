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
      case 'Jipijigi':
        return (
          <Row>
            <Col xs={12}>
              <TextField
                floatingLabelText="제목"
                floatingLabelFixed={true}
                defaultValue={props.jipijigi.title}
                onChange={props.changeTitle}
                style={styles.col}
              />
              <TextField
                floatingLabelText="부제목"
                floatingLabelFixed={true}
                defaultValue={props.jipijigi.description}
                onChange={props.changeDescription}
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
                      cards={props.jipijigi.thumbnailUrl}
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
                      cards={props.jipijigi.imageUrl}
                      onSortEnd={props.onSortEndForImageUrl}
                      handleDeleteCard={props.deleteCard}
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
              <SelectField
                floatingLabelText="카테고리"
                value={props.jipijigi.category}
                onChange={props.changeCategory}
                style={styles.col}
              >
                <MenuItem value={'about'} primaryText="당뇨란?" />
                <MenuItem value={'food'} primaryText="당뇨 음식" />
                <MenuItem value={'exercise'} primaryText="당뇨 운동" />
              </SelectField>
              <SelectField
                floatingLabelText="상태"
                value={props.jipijigi.status}
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

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
import { getOrdersList, editOrder } from '../actions/orders';

const initialOrders = {
  orderId: '',
  userName: '',
  productName: '',
  optionItemName: '',
  optionItemPrice: '',
  totalPrice: '',
  productQty: '',
  purchaseMethod: '',
  cdate: null,
  edate: null
};

const OrdersTool = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState({ ...initialOrders });
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getOrdersList();
  }, []);

  const handleOpenOrder = orderId => {
    if (orderId) {
      let order = props.orderList.filter(order => order.orderId === orderId)[0];
      setModalVisible(true);
      setOrder(order);
      setOrderId(orderId);
    } else {
      setModalVisible(true);
    }
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    const check = confirm('작성을 취소하시겠어요?');
    if (check) {
      setModalVisible(false);
      setOrder({ ...initialOrders });
      setOrderId('');
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
                contentName="Order"
                orderList={props.orderList}
                openOrder={handleOpenOrder}
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
        <DialogItem dialogName="Order" order={order} />
      </Dialog>
    </>
  );
};

const mapStateToProps = state => {
  return {
    orderList: state.orders.orderList.filter(data => data.status !== 'failed'),
    getOrderListStatus: state.orders.orderList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrdersList: (offset, limit) => {
      return dispatch(getOrdersList(offset, limit));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrdersTool)
);

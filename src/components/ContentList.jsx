import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import * as palette from '../styles/palette';

const Table = styled.table`
  width: ${palette.defaultMaxWidth}px;
`;

const TableHeader = styled.th`
  border: 1px solid #f4f4f4;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TableData = TableHeader.withComponent('td');

const Cover = styled.div`
  display: flex;
  width: ${palette.defaultMaxWidth}px;
  min-height: 50vh;
  justify-content: center;
  align-items: center;

  & > h2 {
    font-size: 30px;
  }
`;

const ContentList = props => {
  function storeCategorySwitch(categoryNumber) {
    switch (categoryNumber) {
      case 1:
        return '반찬';
      case 2:
        return '간식';
      case 3:
        return '영양제';
      default:
        return null;
    }
  }

  function articleCategorySwitch(categoryNumber) {
    switch (categoryNumber) {
      case 1:
        return '당뇨란?';
      case 2:
        return '당뇨 음식';
      case 3:
        return '당뇨 운동';
      default:
        return null;
    }
  }

  function renderSwitch(contentName) {
    switch (contentName) {
      case 'Notice':
        return (
          <>
            {props.noticeList.length ? (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>
                      <h2>제작</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>제목</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>유형</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>스케쥴날짜</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>제작날짜</h2>
                    </TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {props.noticeList.map((notice, index) => (
                    <tr
                      key={notice.noticeId}
                      onClick={() => {
                        props.openNotice(notice.noticeId);
                      }}
                    >
                      <TableData>{notice.author.authorName}</TableData>
                      <TableData>{notice.title}</TableData>
                      <TableData>{notice.status}</TableData>
                      <TableData>
                        {moment(notice.sdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                      <TableData>
                        {moment(notice.cdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Cover>
                <h2>공지사항이 없습니다.</h2>
              </Cover>
            )}
          </>
        );
      case 'Inquiry':
        return (
          <>
            {props.inquiryList.length ? (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>
                      <h2>제목</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>작성날짜</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>답변날짜</h2>
                    </TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {props.inquiryList.map((inquiry, index) => (
                    <tr
                      key={inquiry.inquiryId}
                      onClick={() => {
                        props.openInquiry(inquiry.inquiryId);
                      }}
                    >
                      <TableData>{inquiry.title}</TableData>
                      <TableData>
                        {moment(inquiry.cdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                      <TableData>
                        {inquiry.answer
                          ? moment(inquiry.answer.answerDate)
                              .utcOffset(9)
                              .format('YY.MM.DD HH:mm')
                          : null}
                      </TableData>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Cover>
                <h2>공지사항이 없습니다.</h2>
              </Cover>
            )}
          </>
        );
      case 'Store':
        return (
          <>
            {props.storeItemList.length ? (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>
                      <h2>제작</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>상품명</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>가격</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>할인가격</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>카테고리</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>상태</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>스케쥴날짜</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>제작날짜</h2>
                    </TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {props.storeItemList.map((storeItem, index) => (
                    <tr
                      key={storeItem.storeItemId}
                      onClick={() => {
                        props.openStoreItem(storeItem.storeItemId);
                      }}
                    >
                      <TableData>{storeItem.author.authorName}</TableData>
                      <TableData>{storeItem.title}</TableData>
                      <TableData>{storeItem.price}</TableData>
                      <TableData>{storeItem.discountPrice}</TableData>
                      <TableData>
                        {storeCategorySwitch(storeItem.category)}
                      </TableData>
                      <TableData>{storeItem.status}</TableData>
                      <TableData>
                        {moment(storeItem.sdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                      <TableData>
                        {moment(storeItem.cdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Cover>
                <h2>스토어 아이템이 없습니다.</h2>
              </Cover>
            )}
          </>
        );
      case 'Article':
        return (
          <>
            {props.articleList.length ? (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>
                      <h2>제작</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>제목</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>카테고리</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>상태</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>스케쥴날짜</h2>
                    </TableHeader>
                    <TableHeader>
                      <h2>제작날짜</h2>
                    </TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {props.articleList.map((article, index) => (
                    <tr
                      key={article.articleId}
                      onClick={() => {
                        props.openArticle(article.articleId);
                      }}
                    >
                      <TableData>{article.author.authorName}</TableData>
                      <TableData>{article.title}</TableData>
                      <TableData>
                        {articleCategorySwitch(article.category)}
                      </TableData>
                      <TableData>{article.status}</TableData>
                      <TableData>
                        {moment(article.sdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                      <TableData>
                        {moment(article.cdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Cover>
                <h2>게시글이 없습니다.</h2>
              </Cover>
            )}
          </>
        );
      default:
        return null;
    }
  }

  return <>{renderSwitch(props.contentName)}</>;
};

export default ContentList;

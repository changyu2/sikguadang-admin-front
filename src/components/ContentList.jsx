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
  function renderSwitch(contentName) {
    switch (contentName) {
      case 'Jipijigi':
        return (
          <>
            {props.jipijigiList.length ? (
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
                  {props.jipijigiList.map((jipijigi, index) => (
                    <tr
                      key={jipijigi.jipijigiId}
                      onClick={() => {
                        props.openJipijigi(jipijigi.jipijigiId);
                      }}
                    >
                      <TableData>{jipijigi.author.authorName}</TableData>
                      <TableData>{jipijigi.title}</TableData>
                      <TableData>{jipijigi.category}</TableData>
                      <TableData>{jipijigi.status}</TableData>
                      <TableData>
                        {moment(jipijigi.sdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                      <TableData>
                        {moment(jipijigi.cdate)
                          .utcOffset(9)
                          .format('YY.MM.DD HH:mm')}
                      </TableData>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Cover>
                <h2>게시물이 없습니다.</h2>
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

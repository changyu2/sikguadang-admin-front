import styled from 'styled-components';

import * as palette from '../styles/palette';

const FeedContainer = styled.div`
  padding: ${palette.defaultSidePadding}px;
  padding-top: ${palette.topbarHeight + palette.defaultSidePadding}px;
  max-width: ${palette.defaultMaxWidth}px;
  width: 100%;
  margin: 0 auto;
`;

export default FeedContainer;

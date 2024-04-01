import React from 'react';
import { Col, Row, Statistic } from 'antd';
import moment from 'moment';

const CustomCountdown = ({ BidDate, ActiveDays }) => {
  const { Countdown } = Statistic;
  const deadline = moment(BidDate).add(ActiveDays + 30, 'days').valueOf(); // 加上额外的10天

  return (
  <Row gutter={16}>
    <Col
      span={24}
      style={{
        marginTop: 32,
      }}
    >
      <Countdown title="Days left for seller to accept your bid" value={deadline} format="DD [DAYS] HH [HOURS] mm [MINUTES] ss [SECONDS]" />
    </Col>
  </Row>
  );
};
export default CustomCountdown;
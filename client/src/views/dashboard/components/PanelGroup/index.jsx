import React from "react";
import { Row, Col, Icon } from "antd";
import CountUp from "react-countup";
import "./index.less";

const chartList = [
  {
    type: "设备数",
    icon: "tablet",
    num: 102400,
    color: "#40c9c6",
  },
  {
    type: "数据包",
    icon: "gift",
    num: 81212,
    color: "#36a3f7",
  },
  {
    type: "数据量",
    icon: "database",
    num: 9280,
    color: "#f4516c",
  },
  {
    type: "暂未开放",
    icon: "question",
    num: 0,
    color: "#f6ab40",
  },
];

const PanelGroup = (props) => {
  const { handleSetLineChartData } = props;
  return (
    <div className="panel-group-container">
      <Row gutter={40} className="panel-group">
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            onClick={handleSetLineChartData.bind(this, chart.type)}
            className="card-panel-col"
          >
            <div className="card-panel">
              <div className="card-panel-icon-wrapper">
                <Icon
                  style={{ fontSize: 55, color: chart.color }}
                  type={chart.icon}
                />
              </div>
              <div className="card-panel-description">
                <p className="card-panel-text">{chart.type}</p>
                <CountUp end={chart.num} start={0} className="card-panel-num" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;

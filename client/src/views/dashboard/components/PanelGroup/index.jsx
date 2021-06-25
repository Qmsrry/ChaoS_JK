import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Icon,
  Table,
  Tag,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  Divider,
  message,
  Select
} from "antd";
import CountUp from "react-countup";
import { reqnStats } from "@/api/dashboard";
import "./index.less";

const chartList = [
  {
    type: "设备数",
    icon: "tablet",
    num: 0,
    color: "#40c9c6",
  },
  {
    type: "数据包",
    icon: "gift",
    num: 0,
    color: "#36a3f7",
  },
  {
    type: "数据量",
    icon: "database",
    num: 0,
    color: "#f4516c",
  }
];

const PanelGroup = (props) => {
  const { handleSetLineChartData } = props;
  const [nStats, setnStats] = useState([0,0,0]);
  useEffect(() => {
    reqnStats().then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setnStats(response.data);
      }
      else {
        message.warning("获取统计数出错!")
      }
    });
  },[])
  return (
    <div className="panel-group-container">
      <Row gutter={40} className="panel-group">
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={8}
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
                <CountUp end={nStats[i]} start={0} className="card-panel-num" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;

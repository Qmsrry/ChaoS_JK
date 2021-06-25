import React, { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import "./index.less";
import { reqWeek } from "@/api/dashboard";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

const lineChartDefaultData = {
  "设备数": {
    actualData: [0, 0, 0, 0, 0, 0, 0]
  },
  "数据包": {
    actualData: [0, 0, 0, 0, 0, 0, 0]
  },
  "数据量": {
    actualData: [0, 0, 0, 0, 0, 0, 0]
  }
};

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState(
    lineChartDefaultData
  );
  const [lineChartType, setlineChartType] = useState(
    "设备数"
  );
  useEffect(() => {
    reqWeek().then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setLineChartData(response.data);
      }
      else {
        message.warning("获取周统计出错!")
      }
    });
  },[])
  const handleSetlineChartType = (type) => setlineChartType(type);

  return (
    <div className="app-container">

      <PanelGroup handleSetLineChartData={handleSetlineChartType} />

      <LineChart
        chartData={lineChartData[lineChartType]}
        styles={{
          padding: 12,
          backgroundColor: "#fff",
          marginBottom: "25px",
        }}
      />

      <Row gutter={32}>
        <Col xs={24} sm={24} lg={12}>
          <div className="chart-wrapper">
            <PieChart />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

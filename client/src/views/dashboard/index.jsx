import React, { useState } from "react";
import { Row, Col } from "antd";
import "./index.less";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
// import TransactionTable from "./components/TransactionTable";
// import BoxCard from "./components/BoxCard";

const lineChartDefaultData = {
  "设备数": {
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  "数据包": {
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  "数据量": {
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  "暂未开放": {
    actualData: [1, 1, 1, 1, 1, 1, 1]
  },
};

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState(
    lineChartDefaultData["设备数"]
  );

  const handleSetLineChartData = (type) => setLineChartData(lineChartDefaultData[type]);

  return (
    <div className="app-container">

      <PanelGroup handleSetLineChartData={handleSetLineChartData} />

      <LineChart
        chartData={lineChartData}
        styles={{
          padding: 12,
          backgroundColor: "#fff",
          marginBottom: "25px",
        }}
      />

      <Row gutter={32}>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <PieChart />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

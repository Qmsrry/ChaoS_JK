import React, { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import "./index.less";
import { reqWeek, reqPie ,reqBar} from "@/api/dashboard";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

const lineChartDefaultData = {
  "设备数": {
    actualData: [1, 1, 1, 1, 1, 1, 1]
  },
  "数据包": {
    actualData: [1, 1, 1, 1, 1, 1, 1]
  },
  "数据量": {
    actualData: [1, 1, 1, 1, 1, 1, 1]
  }
};

const barChartDefaultData = [
  {
    name: 'test0',
    value: 10,
  },
  {
    name: 'test1',
    value: 1,
  },
  {
    name: 'test2',
    value: 2,
  },
  {
    name: 'test3',
    value: 3,
  },
  {
    name: 'test4',
    value: 4,
  },
]

const pieChartDefaultData = [
  {
    name: '离线',
    value: 0,
  },
  {
    name: '在线',
    value: 0,
  },
]
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
  }, [])
  const handleSetlineChartType = (type) => setlineChartType(type);

  const [barChartData, setBarChartData] = useState(
    barChartDefaultData
  );
  useEffect(() => {
    reqBar().then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setBarChartData(response.data.map((cur) => {
          return { name: cur.name, value: cur.data };
        }));
      }
      else {
        message.warning("获取前五名设备出错!")
      }
    });
  }, [])

  const [pieChartData, setPieChartData] = useState(
    pieChartDefaultData
  );
  useEffect(() => {
    reqPie().then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setPieChartData(response.data);
      }
      else {
        message.warning("获取前五名设备出错!")
      }
    });
  }, [])
  
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
            <PieChart
              chartData={pieChartData}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <div className="chart-wrapper">
            <BarChart
              chartData={barChartData}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

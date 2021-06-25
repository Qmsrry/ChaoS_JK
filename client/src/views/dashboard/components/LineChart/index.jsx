import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";
import moment from 'moment';

class LineChart extends Component {
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.object,
    chartData: PropTypes.object.isRequired,
  };
  static defaultProps = {
    width: "100%",
    height: "350px",
    styles: {},
    className: "",
  };
  state = {
    chart: null,
  };

  componentDidMount() {
    debounce(this.initChart.bind(this), 300)();
    window.addEventListener("resize", () => this.resize());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
      this.resize();
    }
    if (nextProps.chartData !== this.props.chartData) {
      debounce(this.initChart.bind(this), 300)();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  resize() {
    const chart = this.state.chart;
    if (chart) {
      debounce(chart.resize.bind(this), 300)();
    }
  }

  dispose() {
    if (!this.state.chart) {
      return;
    }
    window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
    this.setState({ chart: null });
  }

  setOptions({ actualData } = {}) {
    const animationDuration = 1000;
    this.state.chart.clear();
    this.state.chart.setOption({
      backgroundColor: "#fff",
      xAxis: {
        data: [...new Array(7).keys()].map((i) => {
          return moment().add(i-6, 'days').format('MM/DD')
        }),
        boundaryGap: false,
        axisTick: {
          show: false,
        },
        axisLabel: {
          rotate: 30,
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 10,
        top: 30,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        padding: [5, 10],
      },
      yAxis: {
        axisTick: {
          show: false,
        },
      },
      legend: {
        data: ["近一周统计"],
      },
      series: [
        {
          name: "近一周统计",
          smooth: true,
          type: "line",
          itemStyle: {
            normal: {
              color: "#3888fa",
              lineStyle: {
                color: "#3888fa",
                width: 2,
              },
              areaStyle: {
                color: "#f3f8ff",
              },
            },
          },
          data: actualData,
          animationDuration,
          animationEasing: "quadraticOut",
        },
      ],
    });
  }

  initChart() {
    if (!this.el) return;
    this.setState({ chart: echarts.init(this.el,"macarons") }, () => {
      this.setOptions(this.props.chartData);
    });
  }

  render() {
    const { className, height, width,styles } = this.props;
    return (
      <div
        className={className}
        ref={(el) => (this.el = el)}
        style={{
          ...styles,
          height,
          width,
        }}
      />
    );
  }
}

export default connect(state=>state.app)(LineChart);

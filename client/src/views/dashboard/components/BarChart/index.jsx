import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import echarts from "@/lib/echarts";
import { debounce } from "@/utils";

class BarChart extends Component {
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.object,
    chartData: PropTypes.array.isRequired,
  };
  static defaultProps = {
    width: "100%",
    height: "300px",
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

  setOptions(barData = [], loading = false) {
    const animationDuration = 1000;
    this.state.chart.clear();
    if (loading) {
      this.state.chart.showLoading();
    }
    else {
      this.state.chart.hideLoading();
      this.state.chart.setOption({
        title: {
          textStyle:
          {
            color: '#333'
          },
          text: '发布数据最多设备',
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: "10%",
          left: "0%",
          right: "0%",
          bottom: "5%",
          containLabel: true,
        },
        yAxis: [
          {
            type: "category",
            data: barData.map((v) => {
              return v.name;
            }),
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: '{value}(bytes)',
              rotate: 30,
            },
          },
        ],
        series: [
          {
            name: "上传数据量",
            type: "bar",
            data: barData,
            animationDuration,
          }
        ],
      });
    }
  }

  initChart() {
    if (!this.el) return;
    this.setState({ chart: echarts.init(this.el, "macarons") }, () => {
      console.log(this.props.loading);
      this.setOptions(this.props.chartData, this.props.loading);
    });
  }

  render() {
    const { className, height, width, styles } = this.props;
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

export default connect((state) => state.app)(BarChart);

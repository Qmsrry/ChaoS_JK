import React, { useEffect, useState, useRef } from "react";
import echarts from "@/lib/echarts";
import "./index.less";
const Map = () => {

  const mapRef = useRef();


  useEffect(() => {
    var option;

    var data = [
      { name: '长沙', value: 175 },
      { name: '衢州', value: 177 },
      { name: '廊坊', value: 193 },
      { name: '菏泽', value: 194 },
      { name: '合肥', value: 229 },
      { name: '武汉', value: 273 },
      { name: '大庆', value: 279 }
    ];
    var geoCoordMap = {
      '长沙': [113, 28.21],
      '衢州': [118.88, 28.97],
      '廊坊': [116.7, 39.53],
      '菏泽': [115.480656, 35.23375],
      '合肥': [117.27, 31.86],
      '武汉': [114.31, 30.52],
      '大庆': [125.03, 46.58]
    };

    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          console.log(data[i].value)
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
          //获得半径
          console.log(geoCoord.concat(data[i].value))
        }
      }
      return res;
    };

    option = {
      title: {
        text: '设备历史轨迹 - 百度地图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        center: [120.5, 30.1],
        zoom: 5,
        roam: true,
        mapStyle: {
          styleJson: [{
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          }, {
            'featureType': 'land',
            'elementType': 'all',
            'stylers': {
              'color': '#f3f3f3'
            }
          }, {
            'featureType': 'railway',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'highway',
            'elementType': 'all',
            'stylers': {
              'color': '#fdfdfd'
            }
          }, {
            'featureType': 'highway',
            'elementType': 'labels',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'arterial',
            'elementType': 'geometry',
            'stylers': {
              'color': '#fefefe'
            }
          }, {
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#fefefe'
            }
          }, {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'green',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'subway',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'manmade',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          }, {
            'featureType': 'local',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          }, {
            'featureType': 'arterial',
            'elementType': 'labels',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#fefefe'
            }
          }, {
            'featureType': 'building',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          }, {
            'featureType': 'label',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#999999'
            }
          }]
        }
      },
      series: [
        {
          name: 'pm2.5',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: convertData(data),
          symbolSize: function (val) {
            return val[2] / 10;
          },
          encode: {
            value: 2
          },
          label: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            label: {
              show: true
            }
          }
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: convertData(data.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 6)),
          symbolSize: function (val) {
            return val[2] / 10;
          },
          encode: {
            value: 2
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: '#333'
          },
          zlevel: 1
        }
      ]
    };

    let mapInstance;
    function renderChart() {
      const renderedInstance = echarts.getInstanceByDom(mapRef.current);
      if (renderedInstance) {
        mapInstance = renderedInstance;
      } else {
        mapInstance = echarts.init(mapRef.current);
      }
      mapInstance.setOption(option);
    };
    renderChart();
  }, []);

  return (
    <div>
      <div style={{ width: 1300, height: 720, }} id="m" ref={mapRef} />
    </div>
  );

};

export default Map;

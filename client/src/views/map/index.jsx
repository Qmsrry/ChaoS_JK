import React, { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import "./index.less";
import { Map, Marker, NavigationControl, InfoWindow, Polyline } from 'react-bmap'
import { reqMap } from "@/api/map";
const yqData = { lng: 120.13, lat: 30.27 }
const MapDefaultData = [{ name: 'tmp', path: [yqData], warning: [false] }];
const colorArr = ['white', 'black', 'green', 'blue', 'yellow']
const Dmap = () => {
  const [MapData, setMapData] = useState(MapDefaultData);
  useEffect(() => {
    reqMap().then((response) => {
      if (response.status === 200) {
        const newdata = response.data.map((cur) => {
          return {
            name: cur.name,
            path: cur.location.map((curpos) => {
              return {
                lng: curpos.coordinates[0],
                lat: curpos.coordinates[1],
              }
            }
            ),
            warning: cur.warning
          }
        });
        console.log(newdata[0]);
        console.log(MapDefaultData[0]);
        setMapData(newdata);
      }
      else {
        message.warning("获取地图数据出错!")
      }
    });
  }, [])
  return (
    <div className="app-container">
      <Map
        center={
          // MapDefaultData[0].path[0]
          MapData[0].path[0]
      }
        zoom="5"
        style={{ height: 600, }}>
        <NavigationControl />
        {
          MapData.map((cur,index) => {
            return <Polyline path={cur.path} strokeColor={colorArr[index]}></Polyline>
          })
        }
    </Map>
    </div>
  );

};

export default Dmap;

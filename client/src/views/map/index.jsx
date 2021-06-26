import React, { useEffect, useState } from "react";
import { message, Card } from "antd";
import "./index.less";
import { Map, Marker, NavigationControl, InfoWindow, Polyline } from 'react-bmap'
import { reqMap } from "@/api/map";
const yqData = { lng: 120.13, lat: 30.27 }
const MapDefaultData = [{ name: 'tmp', path: [yqData], warnings: [false],texts:['tmp']}];
const colorArr = ['red', 'black', 'green', 'blue', 'yellow']
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
            warnings: cur.warning,
            texts:cur.text
          }
        });
        console.log(newdata);
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
        zoom="10"
        style={{ height: 650, }}>
        <NavigationControl />
        {
          MapData.map((cur,index) => {
            return <Polyline path={cur.path} strokeColor={colorArr[index]}></Polyline>
          })
        }
        {
          MapData.map((curd) =>
            (curd.path).filter((curp, pindex) =>
              (curd.warnings[pindex])).map((cur, cindex) =>
                (<Marker position={cur} icon="loc_red" title={'WARNING!'+curd.texts[cindex]}/>)
            )
          )
        }
        {
          MapData.map((curd) =>
            (curd.path).filter((curp, pindex) =>
              (!curd.warnings[pindex])).map((cur, cindex) =>
                (<Marker position={cur} icon="loc_blue" title={curd.texts[cindex]} />)
            )
          )
        }
    </Map>
    </div>
  );

};

export default Dmap;

import React from "react";
import "./index.less";
import Mymap from "./components/mymap";
var DATA = [
  { name: '长沙', value: 175 },
  { name: '衢州', value: 177 },
  { name: '廊坊', value: 193 },
  { name: '菏泽', value: 194 },
  { name: '合肥', value: 229 },
  { name: '武汉', value: 273 },
  { name: '大庆', value: 279 }
];
const Map = () => {
  return (
    <Mymap
      mapdata={DATA}
    />
  );

};

export default Map;

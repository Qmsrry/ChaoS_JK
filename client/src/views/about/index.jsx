import React from "react";
import TypingCard from "@/components/TypingCard";
const About = () => {
  const cardContent = `
    <p>我是SJoJoK</p>
    <p>浙江大学计算机学院2018级本科生</p>
    <p>该网站为我校2020-2021春夏学期B/S体系软件设计课程大作业</p>
  `;
  return (
    <div className="app-container">
      <TypingCard title="关于作者" source={cardContent} />
    </div>
  );
};

export default About;

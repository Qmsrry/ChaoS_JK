import React, { useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import DocumentTitle from "react-document-title";
import { reqRegister } from "../../api/login";
import "./index.less";

const Register = (props) => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);
  const handleRegister = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    reqRegister(username, password)
      .then((data) => {
        message.success("注册成功");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleRegister(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };
  
  return (
    <DocumentTitle title={"用户注册"}>
      <div className="register-container">
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>用户注册</h2>
          </div>
          <Spin spinning={loading} tip="登录中...">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名",
                  },
                ],
                initialValue: "", // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入密码",
                  },
                ],
                initialValue: "", // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button">
                注册
              </Button>
              已有账号？ <Link to="login">马上登录!</Link>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

const WrapRegister = Form.create()(Register);

export default WrapRegister;

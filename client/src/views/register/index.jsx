import React, { useState } from "react";
import { Redirect, Link, withRouter} from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { login, getUserInfo } from "@/store/actions";
import "./index.less";

const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);
  const [SignModalVisible, setSignModalVisible] = useState(false);
  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("登录成功");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        message.error(error);
      });
  };

  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };

  const handleRegister = () => {
    setSignModalVisible(true);
  };
  if (token) {
    return <Redirect to="/dashboard" />;
  }
  
  return (
    <DocumentTitle title={"日你妈"}>
      <div className="login-container">
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>日死你妈</h2>
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
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              或 <Button>现在注册</Button>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);

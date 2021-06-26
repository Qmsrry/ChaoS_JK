import React, { useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin, Row, Col} from "antd";
import DocumentTitle from "react-document-title";
import { reqRegister } from "../../api/login";
import "./index.less";
import { number, string } from "yargs";

const Register = (props) => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);
  const handleRegister = (values) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    reqRegister(values)
      .then((data) => {
        message.success("注册成功!请返回登陆界面");
        setLoading(false);
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
        console.log(values);
        handleRegister(values);
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
          <Spin spinning={loading} tip="注册中...">
            <Form.Item>
              {getFieldDecorator("username", {
                type:String,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名",
                  },
                  {
                    type: 'string',
                    min: 6,
                    message: "用户名不得少于六字符",
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
                  {
                    type:'string',
                    min: 6,
                    message: "密码不得少于六字符",
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
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入邮箱",
                  },
                  {
                    type: 'email',
                    message: '邮箱格式不正确',
                  },
                ],
                initialValue: "", // 初始值
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="email"
                  placeholder="邮箱"
                />
              )}
            </Form.Item>     
            <Form.Item>
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("code", {
                    type:Number,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入验证码",
                      },
                      {
                        len: 6,
                        message: "验证码格式不正确",
                      },
                    ],
                    initialValue: "", // 初始值
                  })(
                    <Input
                      prefix={
                        <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="验证码"
                    />
                  )}
              </Col>
              <Col span={12}>
                <Button>获得验证码</Button>
              </Col>
              </Row>
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

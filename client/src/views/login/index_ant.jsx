import React, { useState } from "react";
import { Form, Input, Button, Icon, message, Spin } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, getUserInfo } from "@/store/actions";
import DocumentTitle from "react-document-title";
import "./index.less";
const NormalLoginForm = (props) => {
    const { form, token, login, getUserInfo } = props;
    const { getFieldDecorator } = form;

    const [loading, setLoading] = useState(false);
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
            .then((data) => { })
            .catch((error) => {
                message.error(error);
            });
    };

    const handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault();
        // 对所有表单字段进行检验
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

    if (token) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <DocumentTitle title={"用户登录"}>
            <div className="login-container">
                <Form
                    name="normal_login"
                    className="content"
                    onSubmit={handleSubmit}
                >
                    <div className="title">
                        <h2>用户登录</h2>
                    </div>
                    <Spin spinning={loading} tip="登录中...">
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "请输入密码",
                                },
                            ]}
                        >
                            <Input
                                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            或 <Button onClick={() => { alert('rnm') }}>现在注册!</Button>
                        </Form.Item>
                    </Spin>
                </Form>
            </div>
        </DocumentTitle>

    );
};

const WrapLogin = Form.create()(NormalLoginForm);

export default connect((state) => state.user, { login, getUserInfo })(
    WrapLogin
);

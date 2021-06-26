import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
class RegisterForm extends Component {
  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="注册"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="用户名:">
            {getFieldDecorator("username", {
              initialValue: '',
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="密码:">
            {getFieldDecorator("password", {
              initialValue: '',
            })(<Input placeholder="密码" />)}
          </Form.Item>
          <Form.Item label="邮箱:">
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "请输入设备名!" }],
              initialValue: '',
            })(<Input placeholder="邮箱" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "RegisterForm" })(RegisterForm);

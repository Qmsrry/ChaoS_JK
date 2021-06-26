import React, { Component } from "react";
import { Form, Input, DatePicker, Select, Modal } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
class EditForm extends Component {
  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
    } = this.props;
    const { getFieldDecorator } = form;
    const { id, date, data, status, location, name } = currentRowData;
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
        title="编辑"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="序号:">
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="上传量:">
            {getFieldDecorator("data", {
              initialValue: data,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="设备名:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入设备名!" }],
              initialValue: name,
            })(<Input placeholder="设备名" />)}
          </Form.Item>
          <Form.Item label="状态:">
            {getFieldDecorator("status", {
              initialValue: status,
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value="online">在线</Select.Option>
                <Select.Option value="offline">离线</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="时间:">
            {getFieldDecorator("date", {
              rules: [{ type: 'object', required: false, message: '请选择时间!' }],
              initialValue: moment(date || "YYYY-MM-DD HH:mm:ss"),
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled />)}
          </Form.Item>
          <Form.Item label="地点:">
            {getFieldDecorator("location", {
              initialValue: location,
            })(<Input disabled />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditForm" })(EditForm);

import React, { Component } from "react";
import moment from "moment";
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  Divider,
  message,
  Select
} from "antd";
import { deviceList, deleteDevice, editDevice, addDevice } from "@/api/table";
import EditForm from "./forms/editForm"
const { Column } = Table;
const { Panel } = Collapse;
class TableComponent extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    loading: false,
    total: 0,
    addname:"",
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      name: "",
      status: ""
    },
    editModalVisible: false,
    editModalLoading: false,
    currentRowData: {
      id: 0,
      name: "",
      data: 0,
      date: null,
      location: "",
      status: "online",
    }
  };
  fetchData = () => {
    this.setState({ loading: true });
    deviceList(this.state.listQuery).then((response) => {
      // console.log(response.data.data.items);
      // console.log(response.data.data.total);
      if (response.status === 200)
      {
        this.setState({ loading: false });
        const list = response.data.data.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            data: item.data,
            date: moment(item.time).format('YYYY-MM-DD HH:mm:ss'),
            status: item.online ? 'online' : 'offline'
          };
        });
        const total = response.data.data.total;
        if (this._isMounted) {
          this.setState({ list, total });
        }
      }
      else
      {
        message.warning("获取设备列表出错!")  
      }
    });
  };
  addData = () => {
    this.setState({ loading: true });
    addDevice(this.state.addname).then((response) => {
      if (response.status === 201)
      {
        message.success("添加成功！")
        this.fetchData();
      }
      else
      {
        message.warning("添加失败！")
      }
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  filterNameChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        name: value,
      }
    }));
  };
  filterStatusChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        status: value,
      }
    }));
  };
  addNameChange = (e) => {
    const value = e.target.value
    this.setState({
      addname: value
    });
  };
  changePage = (pageNumber, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber: 1,
          pageSize,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };
  handleDelete = (row) => {
    deleteDevice({ id: row.id }).then(res => {
      message.success("删除成功")
      this.fetchData();
    })
  }
  handleEdit = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editModalVisible: true,
    });
  };

  handleOk = _ => {
    const { form } = this.formRef.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        // 'date': fieldsValue['date'].format('YYYY-MM-DD HH:mm:ss'),
      };
      this.setState({ editModalLoading: true, });
      editDevice(values).then((response) => {
        if (response.status === 201)
        {
          form.resetFields();
          this.setState({ editModalVisible: false, editModalLoading: false });
          message.success("编辑成功!")
          this.fetchData()
        }
        else
        {
          message.success("编辑失败!")
        }
      }).catch(e => {
        message.success("编辑失败,请重试!")
      })

    });
  };

  handleCancel = _ => {
    this.setState({
      editModalVisible: false,
    });
  };
  render() {
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="设备名:">
                <Input onChange={this.filterNameChange} />
              </Form.Item>
              <Form.Item label="状态:">
                <Select
                  style={{ width: 120 }}
                  onChange={this.filterStatusChange}>
                  <Select.Option value="online">online</Select.Option>
                  <Select.Option value="offline">offline</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.fetchData}>
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="添加" key="1">
            <Form layout="inline">
              <Form.Item label="设备名:">
                <Input onChange={this.addNameChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="plus" onClick={this.addData}>
                  新增
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Table
          bordered
          rowKey={(record) => record.id}
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={false}
        >
          <Column title="序号" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id} />
          <Column title="设备名" dataIndex="name" key="name" width={200} align="center" />
          <Column title="上传量" dataIndex="data" key="data" width={195} align="center" sorter={(a, b) => a.data - b.data} />
          <Column title="状态" dataIndex="status" key="status" width={195} align="center" render={(status) => {
            let color =
              status === "online" ? "green" : status === "offline" ? "red" : "";
            return (
              <Tag color={color} key={status}>
                {status}
              </Tag>
            );
          }} />
          <Column title="最近通信时间" dataIndex="date" key="date" width={195} align="center" />
          {/* <Column title="最近通信地点" dataIndex="location" key="location" width={195} align="center" /> */}
          <Column title="操作" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" title="编辑" onClick={this.handleEdit.bind(null, row)} />
              <Divider type="vertical" />
              <Button type="primary" shape="circle" icon="delete" title="删除" onClick={this.handleDelete.bind(null, row)} />
            </span>
          )} />
        </Table>
        <br />
        <Pagination
          total={this.state.total}
          pageSizeOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.pageNumber}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={true}
        />
        <EditForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.formRef = formRef}
          visible={this.state.editModalVisible}
          confirmLoading={this.state.editModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        />
      </div>
    );
  }
}

export default TableComponent;

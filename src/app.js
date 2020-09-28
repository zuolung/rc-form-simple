import { InputItem, Button, Toast, Picker, List } from "antd-mobile";
import Form from "./components/Form.js";
import React from "react";

@Form.create({
  callback_onErr: (mess) => {
    console.log(mess)
    Toast.fail(mess)
  }
})
class Demo extends React.Component {

  submit = () => {
    const { form: { validateFields } } = this.props;
    validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue, "表单数据集合》》》》》》》》》》》》》》》》》》》")
    })
  }
  render() {
    const { form: { getFieldDecorator, getFieldValue, store } } = this.props;
    const itemStyle = {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: 40
    }
    return (
      <div>
        <div style={itemStyle}>
          <div style={{ marginRight: 20 }}>下拉选择</div>
          {
            getFieldDecorator("a", {
              initialValue: [1],
              rules: [{ required: true, message: "手机号不能为空" }],
            })(
              <Picker
                data={[{ label: "是", value: 2 }, { label: "是213", value: 1 }]}
                cols={1}
                style={{ width: 250 }}
              >
                <List.Item arrow="horizontal"></List.Item>
              </Picker>
            )
          }
        </div>
        <div style={itemStyle}>
          <div style={{ marginRight: 20 }}>下拉=1有我</div>
          {
            getFieldValue('a') == 1 ? getFieldDecorator("bbbbbbbbb", {
              initialValue: 1,
              rules: [{ required: true, message: "手机号不能为空" }],
            })(
              <input placeholder="请输入手机号1" type='number' />
            ) : ''
          }
        </div>
        <div style={itemStyle}>
          <div style={{ marginRight: 20 }}>手机号1大于2有我</div>
          {
            getFieldValue('bbbbbbbbb') > 2 ? getFieldDecorator("ccccccccc", {
              initialValue: 'ccccccccc',
              rules: [{ required: true, message: "手机号不能为空" }],
            })(
              <input placeholder="请输入手机号" />
            ) : ''
          }
        </div>
        <div style={itemStyle}>
          <div style={{ marginRight: 20 }}>手机号2小于3有我</div>
          {
            getFieldValue('bbbbbbbbb') <= 2 ? getFieldDecorator("ddd", {
              initialValue: 'ddddd',
              rules: [{ required: true, message: "手机号不能为空" }],
            })(
              <input placeholder="请输入手机号" />
            ) : ''
          }
        </div>
        <Button onClick={this.submit}>提交</Button>
      </div>
    )
  }
}

export default Demo;
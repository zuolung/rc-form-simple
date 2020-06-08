import { InputItem, Button, Toast } from "antd-mobile";
import Form from "./components/Form";
import React from "react";

@Form.create({
  callback_onErr: (mess) => {
    console.log(mess)
    Toast.fail(mess)
  }
})
class Demo extends React.PureComponent {

  submit = () => {
    const { form: { validateFields } } = this.props;
    validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue, "表单数据集合》》》》》》》》》》》》》》》》》》》")
    })
  }
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div>
        <div>
          {
            getFieldDecorator("phone", {
              initialValue: '13133234234',
              rules: [{ required: true, message: "手机号不能为空" }, {
                validator: (value, call) => {
                  const telephoneReg = /^1\d{10}$/;
                  if (telephoneReg.test(value) || value == "") {
                    call();
                  } else {
                    call("该号码不符合手机号码格式");
                  }
                }
              }],
            })(
              <input placeholder="请输入手机号" />
            )
          }
        </div>
        <Button onClick={this.submit}>提交</Button>
      </div>
    )
  }
}

export default Demo;
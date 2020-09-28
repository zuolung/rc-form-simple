# rc-form-simple
    简单的实现rc-form的功能，支持自定义组件value+onChange事件，支持antdMobile的InputItem、Picker、switch等组件，
    适用于antdMobile的框架下表单Toast提示
### Demo查看
[在线查看](https://zuolung.github.io/rc-form-simple/dist/index.html)
### 安装
    npm i rc-form-simple -S
###  使用
```
import { InputItem, Button, Toast } from "antd-mobile";
import Form from "rc-form-simple";
import React from "react";

@Form.create({
    callback_onErr: (mess) => {
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
              initialValue: '',
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
              <InputItem placeholder="请输入手机号" />             
            )
          }
        </div>
        <Button onClick={this.submit}>提交</Button>
      </div>
    )
  }
}

export default Demo;
```

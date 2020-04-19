import React from "react";
import { comparisonObject } from "../../utils/common";
/**
 * 简单实现antd下Form组件的双向数据绑定功能
 * @param                 传入组件      可采用@Form.create()
 * @getFieldDecorator     支持组件 antMobile(InputItem、Picker、DatePicker、Switch等)、input
 * @支持自定义组件          { value/checked, onChange }
 */
class Form extends React.Component {}

/**
 * @param       Params
 * @param       scrollIntoView      表单提交异常时滚动表单项到视图中央
 * @param       callback_onErr      表单提交异常回调函数  
 */
Form.create = (Params = {}) => {
  return (WrappedComponent) => {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          formInfo: {},
          formInfoInitial: {},
          rules: [],
        }
      }
      /**
       * @param     key               表单字段名称
       * @param     config            配置项
       * @param     WComponent        表单JSX
       */
      getFieldDecorator = (key, config = { rules: [], initialValue: '' }) => {
        if (!key) return console.error("getFieldDecorator Error: lost formItem key");
        const { formInfo, rules, formInfoInitial } = this.state;
        return (ComponentJSX) => {
          if (formInfo[key] === undefined && formInfoInitial[key] === undefined) {
            const newAttribute = {};
            newAttribute[key] = config.initialValue;
            this.setState({ formInfoInitial: { ...newAttribute, ...this.state.formInfoInitial, } });
          }
          if (rules[key] === undefined || (rules[key].length && !comparisonObject(rules[key][0], config.rules[0]))) {
            this.handleRules(key, config.rules);
          }
          const addtionalProps = {};
          if (JSON.stringify(Params) !== {} && Params.scrollIntoView) {
            addtionalProps.id = `${key}ByGetFieldDecorator`;
          }
          let ComponentF = ComponentJSX.type;
          let value = formInfo[key] || formInfo[key] === 0 || formInfo[key] === ""
            || formInfo[key] === false ? formInfo[key] : formInfoInitial[key];
          let EleType = ComponentJSX.type.name;
          if (EleType === "Switch") addtionalProps.checked = !!value;
          return (
            <ComponentF
              {...ComponentJSX.props}
              value={EleType === "Picker" ? (value + "").split(",") : value}      // 支持Picker、
              onChange={val => this.handleFormInfo(key, val, ComponentJSX.onChange)}
              {...addtionalProps}
            />
          )
        }
      }
      /** 表单值操作 */
      handleFormInfo = (key, value, oldOnchange) => {
        const type = Object.prototype.toString.call(value);
        const value__ = type === "[object Object]" ? value.target.value : value;
        // 执行传入的原始onChange
        if (oldOnchange) { oldOnchange() }
        const newAttribute = {};
        newAttribute[key] = value__;
        this.setState({ formInfo: { ...this.state.formInfo, ...newAttribute } });
      }
      /** 表单配置初始化 */
      handleRules = (key, rules) => {
        const addtionalRules = {};
        addtionalRules[key] = rules;
        this.setState({ rules: { ...this.state.rules, ...addtionalRules } });
      }
      /**
       * @param       items     传入表单字段和表单值的组合对象 
       */
      setFieldsValue = (items = {}) => {
        const newAttribute = { ...this.state.formInfo };
        Object.keys(items).forEach(key => {
          newAttribute[key] = items[key];
        });
        this.setState({ formInfo: { ...newAttribute } });
      }
      /**
      * @param       key         传入表单字段
      * @return                  返回表单字段值
      */
      getFieldValue = (key) => {
        return this.state.formInfo && this.state.formInfo[key] ?
          this.state.formInfo[key] : (this.state.formInfoInitial[key] || '');
      }
      /**
       * 提交回调
       */
      validateFields = (submitting) => {
        const { rules } = this.state;
        const formInfo = Object.assign(this.state.formInfoInitial, this.state.formInfo);
        let errFlag = false, errMessage = "", errKey = "";
        for (let i = 0; i < Object.keys(formInfo).length; i++) {
          let item = formInfo[Object.keys(formInfo)[i]];
          if (rules && rules[Object.keys(formInfo)[i]]) {
            let r = rules[Object.keys(formInfo)[i]];
            if (r && r.length && r[0].required && (!item && item !== 0 && item !== false)) {
              errFlag = true;
              errMessage = r[0].message || "表单填写不完全";
              errKey = Object.keys(formInfo)[i];
            } else if (r.length === 2 && r[1].validator) { // 自定义校验可正则
              function call(mess) {
                if (mess) {
                  errMessage = mess || "表单项格式不正确";
                  errFlag = true;
                  errKey = Object.keys(formInfo)[i];
                }
              }
              // 传入表单值、回调函数, 回调函数是否返回errMessage控制
              try {
                r[1].validator(item, call);
              } catch (error) {
                errMessage = error;
              }
            }
            if (errMessage) break;
          }
        }
        if (Params && !!Params.callback_onErr !== false) Params.callback_onErr(errMessage);
        if (Params && Params.scrollIntoView && document.querySelector(`#${errKey}ByGetFieldDecorator`)) { // 
          document.querySelector(`#${errKey}ByGetFieldDecorator`).scrollIntoView({ block: "center", behavior: "smooth" });
        }
        if(errMessage) console.error(errMessage)
        submitting(errMessage, formInfo);
      }
      /** 挂载form属性 */
      addtionaProps = () => {
        return {
          form: {
            getFieldDecorator: this.getFieldDecorator,
            setFieldsValue: this.setFieldsValue,
            getFieldValue: this.getFieldValue,
            validateFields: this.validateFields,
          }
        }
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...this.addtionaProps()}
          />
        )
      }
    }
  }
}

export default Form;
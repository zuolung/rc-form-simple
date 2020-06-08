
import React from "react";
import fieldStore from "./fieldStore";
import { comparisonObject } from "./utils/common";

export default class Form extends React.Component { }

Form.create = (option) => {
  const {
    scrollIntoView, // 表单提交异常时滚动表单项到视图中央
    callback_onErr, // 接收表单异常处理方法
  } = option;
  return (WrappedComponent) => {
    return class extends React.Component {
      constructor() {
        super();
        this.fieldStore = fieldStore();
      }

      getFieldDecorator = (key, config = { rules: [], initialValue }) => {
        if (!key) throw Error("getFieldDecorator Error: lost formItem key");
        let rules = this.fieldStore.rules;
        let store = this.fieldStore.store;
        let initialMata = this.fieldStore.initialMata;
        if (rules[key] === undefined || (rules[key].length && !comparisonObject(rules[key][0], config.rules[0]))) {
          this.fieldStore.dispatchRules(key, config.rules);
        }
        this.fieldStore.dispatchInitialMeta(key, config.initialValue);
        return (ComponentF) => {
          const onChange = (v) => {
            if (ComponentF.props.onChange) onChange(v);
            const type = Object.prototype.toString.call(v);
            this.fieldStore.dispatchStore(key, type === "[object Object]" ? v.target.value : v);
          }
          const propsNew = {
            ...ComponentF.props,
            onChange,
            defaultValue: initialMata[key] || ComponentF.value,
          }
          if (scrollIntoView) {
            propsNew.id = `${key}ByGetFieldDecorator`;
          }
          const newTree = React.cloneElement(ComponentF, propsNew, ComponentF.props.children);
          return newTree;
        }
      }

      validateFieldsWraped = (submit) => {
        this.fieldStore.validateFields((errMess, store) => {
          if (scrollIntoView) {
            return document.querySelector(`#${errKey}ByGetFieldDecorator`).scrollIntoView({ block: "center", behavior: "smooth" });
          }
          if (callback_onErr && errMess) {
            return callback_onErr(errMess);
          }
          if (errMessage) return console.error(errMessage);
          submit(errMess, store);
        })
      }

      addtionaProps = () => {
        return {
          form: {
            getFieldDecorator: this.getFieldDecorator,
            setFieldsValue: this.fieldStore.setFieldsValue,
            getFieldValue: this.fieldStore.getFieldValue,
            validateFields: this.validateFieldsWraped,
            resetFields: this.fieldStore.resetFields,
            store: this.fieldStore.store,
          }
        }
      }

      render() {
        return (
          <WrappedComponent
            {...this.addtionaProps()}
          />
        )
      }
    }
  }
}
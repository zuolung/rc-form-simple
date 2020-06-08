/**
 * 表单仓库
 */
class FieldStore {
  constructor(fields) {
    this.store = { ...fields };
    this.rules = {};
    this.initialMata = {};
  }
  dispatchStore = (key, value) => {
    console.log(value)
    this.store[key] = value;
  }

  dispatchInitialMeta = (key, value) => {
    this.initialMata[key] = value;
  }

  dispatchRules = (key, rule) => {
    this.rules[key] = rule;
  }

  getFieldValue = (key) => {
    return this.store[key];
  }

  setFieldsValue = (props) => {
    this.store = {
      ...this.store,
      ...props,
    }
  }

  resetFields = () => {
    this.store = { ...fields };
    this.rules = {};
    this.initialMata = {};
  }

  validateFields = (submitting) => {
    let errFlag = false,
      errMessage = "",
      errKey = "",
      rules = this.rules;

    let store = Object.assign(this.initialMata, this.store);
    for (let i = 0; i < Object.keys(store).length; i++) {

      let item = store[Object.keys(store)[i]];
      if (rules && rules[Object.keys(store)[i]]) {
        let r = rules[Object.keys(store)[i]];

        if (r && r.length && r[0].required && (!item && item !== 0 && item !== false)) {
          errFlag = true;
          errMessage = r[0].message || "表单填写不完全";
          errKey = Object.keys(store)[i];
        } else if (r.length === 2 && r[1].validator) { // 自定义校验可正则
          function call(mess) {
            if (mess) {
              errMessage = mess || "表单项格式不正确";
              errFlag = true;
              errKey = Object.keys(store)[i];
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
    submitting(errMessage, store);
  }
}

export default function createFieldsStore(fields) {
  return new FieldStore(fields);
}
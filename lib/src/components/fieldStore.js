"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

exports.default = createFieldsStore;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 表单仓库
 */
var FieldStore = (_temp = _class = function FieldStore(fields) {
  _classCallCheck(this, FieldStore);

  _initialiseProps.call(this);

  this.store = _extends({}, fields);
  this.rules = {};
  this.initialMata = {};
}, _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.dispatchStore = function (key, value) {
    console.log(value);
    _this.store[key] = value;
  };

  this.dispatchInitialMeta = function (key, value) {
    _this.initialMata[key] = value;
  };

  this.dispatchRules = function (key, rule) {
    _this.rules[key] = rule;
  };

  this.getFieldValue = function (key) {
    return _this.store[key];
  };

  this.setFieldsValue = function (props) {
    _this.store = _extends({}, _this.store, props);
  };

  this.resetFields = function () {
    _this.store = _extends({}, fields);
    _this.rules = {};
    _this.initialMata = {};
  };

  this.validateFields = function (submitting) {
    var errFlag = false,
        errMessage = "",
        errKey = "",
        rules = _this.rules;

    var store = Object.assign(_this.initialMata, _this.store);

    var _loop = function _loop(i) {

      var item = store[Object.keys(store)[i]];
      if (rules && rules[Object.keys(store)[i]]) {
        var r = rules[Object.keys(store)[i]];

        if (r && r.length && r[0].required && !item && item !== 0 && item !== false) {
          errFlag = true;
          errMessage = r[0].message || "表单填写不完全";
          errKey = Object.keys(store)[i];
        } else if (r.length === 2 && r[1].validator) {
          // 自定义校验可正则
          var call = function call(mess) {
            if (mess) {
              errMessage = mess || "表单项格式不正确";
              errFlag = true;
              errKey = Object.keys(store)[i];
            }
          };
          // 传入表单值、回调函数, 回调函数是否返回errMessage控制


          try {
            r[1].validator(item, call);
          } catch (error) {
            errMessage = error;
          }
        }
        if (errMessage) return "break";
      }
    };

    for (var i = 0; i < Object.keys(store).length; i++) {
      var _ret = _loop(i);

      if (_ret === "break") break;
    }
    submitting(errMessage, store);
  };
}, _temp);
function createFieldsStore(fields) {
  return new FieldStore(fields);
}
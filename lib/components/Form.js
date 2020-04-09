"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("../../utils/common");

var _antdMobile = require("antd-mobile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 简单实现antd下Form组件的双向数据绑定功能
 * @param                 传入组件      可采用@Form.create()
 * @getFieldDecorator     支持组件 antMobile(InputItem、Picker、DatePicker、Switch等)、input
 * @支持自定义组件          { value/checked, onChange }
 */
var Form = function (_React$PureComponent) {
  _inherits(Form, _React$PureComponent);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  return Form;
}(_react2.default.PureComponent);

/**
 * @param       scrollIntoView      表单提交异常时滚动表单项到视图中央
 * @param       toastConfig         toast提示配置, 传入fasle不触发Toast
 */


Form.create = function () {
  var Params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (Params && Params.toastConfig) _antdMobile.Toast.config(toastConfig);
  return function (WrappedComponent) {
    return function (_React$Component) {
      _inherits(_class2, _React$Component);

      function _class2(props) {
        _classCallCheck(this, _class2);

        var _this2 = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, props));

        _this2.getFieldDecorator = function (key) {
          var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { rules: [], initialValue: '' };

          if (!key) return console.error("getFieldDecorator Error: lost formItem key");
          var _this2$state = _this2.state,
              formInfo = _this2$state.formInfo,
              rules = _this2$state.rules,
              formInfoInitial = _this2$state.formInfoInitial;

          return function (ComponentJSX) {
            if (formInfo[key] === undefined && formInfoInitial[key] === undefined) {
              var newAttribute = {};
              newAttribute[key] = config.initialValue;
              _this2.setState({ formInfoInitial: _extends({}, newAttribute, _this2.state.formInfoInitial) });
            }
            if (rules[key] === undefined || rules[key].length && !(0, _common.comparisonObject)(rules[key][0], config.rules[0])) {
              _this2.handleRules(key, config.rules);
            }
            var addtionalProps = {};
            if (JSON.stringify(Params) !== {} && Params.scrollIntoView) {
              addtionalProps.id = key + "ByGetFieldDecorator";
            }
            var ComponentF = ComponentJSX.type;
            var value = formInfo[key] || formInfo[key] === 0 || formInfo[key] === "" || formInfo[key] === false ? formInfo[key] : formInfoInitial[key];
            var EleType = ComponentJSX.type.name;
            if (EleType === "Switch") addtionalProps.checked = !!value;
            return _react2.default.createElement(ComponentF, _extends({}, ComponentJSX.props, {
              value: EleType === "Picker" ? (value + "").split(",") : value // 支持Picker、
              , onChange: function onChange(val) {
                return _this2.handleFormInfo(key, val, ComponentJSX.onChange);
              }
            }, addtionalProps));
          };
        };

        _this2.handleFormInfo = function (key, value, oldOnchange) {
          var type = Object.prototype.toString.call(value);
          var value__ = type === "[object Object]" ? value.target.value : value;
          // 执行传入的原始onChange
          if (oldOnchange) {
            oldOnchange();
          }
          var newAttribute = {};
          newAttribute[key] = value__;
          _this2.setState({ formInfo: _extends({}, _this2.state.formInfo, newAttribute) });
        };

        _this2.handleRules = function (key, rules) {
          var addtionalRules = {};
          addtionalRules[key] = rules;
          _this2.setState({ rules: _extends({}, _this2.state.rules, addtionalRules) });
        };

        _this2.setFieldsValue = function () {
          var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var newAttribute = _extends({}, _this2.state.formInfo);
          Object.keys(items).forEach(function (key) {
            newAttribute[key] = items[key];
          });
          _this2.setState({ formInfo: _extends({}, newAttribute) });
        };

        _this2.getFieldValue = function (key) {
          return _this2.state.formInfo && _this2.state.formInfo[key] ? _this2.state.formInfo[key] : _this2.state.formInfoInitial[key] || '';
        };

        _this2.validateFields = function (submitting) {
          var rules = _this2.state.rules;

          var formInfo = Object.assign(_this2.state.formInfoInitial, _this2.state.formInfo);
          var errFlag = false,
              errMessage = "",
              errKey = "";

          var _loop = function _loop(i) {
            var item = formInfo[Object.keys(formInfo)[i]];
            if (rules && rules[Object.keys(formInfo)[i]]) {
              var r = rules[Object.keys(formInfo)[i]];
              if (r && r.length && r[0].required && !item && item !== 0 && item !== false) {
                errFlag = true;
                errMessage = r[0].message || "表单填写不完全";
                errKey = Object.keys(formInfo)[i];
              } else if (r.length === 2 && r[1].validator) {
                // 自定义校验可正则
                var call = function call(mess) {
                  if (mess) {
                    errMessage = mess || "表单项格式不正确";
                    errFlag = true;
                    errKey = Object.keys(formInfo)[i];
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

          for (var i = 0; i < Object.keys(formInfo).length; i++) {
            var _ret = _loop(i);

            if (_ret === "break") break;
          }
          if (errFlag) {
            if (Params.toastConfig !== false) _antdMobile.Toast.fail(errMessage);
            if (Params && Params.scrollIntoView && document.querySelector("#" + errKey + "ByGetFieldDecorator")) {
              // 
              document.querySelector("#" + errKey + "ByGetFieldDecorator").scrollIntoView({ block: "center", behavior: "smooth" });
            }
          } else {
            submitting(errMessage, formInfo);
          }
        };

        _this2.addtionaProps = function () {
          return {
            form: {
              getFieldDecorator: _this2.getFieldDecorator,
              setFieldsValue: _this2.setFieldsValue,
              getFieldValue: _this2.getFieldValue,
              validateFields: _this2.validateFields
            }
          };
        };

        _this2.state = {
          formInfo: {},
          formInfoInitial: {},
          rules: []
        };
        return _this2;
      }
      /**
       * @param     key               表单字段名称
       * @param     config            配置项
       * @param     WComponent        表单JSX
       */

      /** 表单值操作 */

      /** 表单配置初始化 */

      /**
       * @param       items     传入表单字段和表单值的组合对象 
       */

      /**
      * @param       key         传入表单字段
      * @return                  返回表单字段值
      */

      /**
       * 提交回调
       */

      /** 挂载form属性 */


      _createClass(_class2, [{
        key: "render",
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.addtionaProps()));
        }
      }]);

      return _class2;
    }(_react2.default.Component);
  };
};

exports.default = Form;

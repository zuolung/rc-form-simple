"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _fieldStore = require("./fieldStore");

var _fieldStore2 = _interopRequireDefault(_fieldStore);

var _common = require("./utils/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  return Form;
}(_react2.default.Component);

exports.default = Form;


Form.create = function () {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var scrollIntoView = option.scrollIntoView,
      callback_onErr = option.callback_onErr;

  return function (WrappedComponent) {
    return function (_React$Component2) {
      _inherits(_class2, _React$Component2);

      function _class2() {
        _classCallCheck(this, _class2);

        var _this2 = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this));

        _this2.getFieldDecorator = function (key) {
          var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { rules: [], initialValue: initialValue };

          if (!key) throw Error("getFieldDecorator Error: lost formItem key");
          var rules = _this2.fieldStore.rules;
          var store = _this2.fieldStore.store;
          var initialMata = _this2.fieldStore.initialMata;
          if (rules[key] === undefined || rules[key].length && !(0, _common.comparisonObject)(rules[key][0], config.rules[0])) {
            _this2.fieldStore.dispatchRules(key, config.rules);
          }
          if (!(key in initialMata)) {
            _this2.fieldStore.dispatchInitialMeta(key, config.initialValue);
          }
          return function (ComponentF) {
            var _onChange = function _onChange(v) {
              if (ComponentF.props.onChange) ComponentF.props.onChange(v);
              var type = Object.prototype.toString.call(v);
              _this2.fieldStore.dispatchStore(key, type === "[object Object]" ? v.target.value || e.target.checked : v);
              _this2.forceUpdate();
            };
            var propsNew = _extends({}, ComponentF.props, {
              onChange: function onChange(e) {
                return _onChange(e);
              },
              defaultValue: initialMata[key] || ComponentF.value
            });
            var EleType = ComponentF.type.name;
            if (typeof ComponentF.type === 'function') propsNew.value = store[key] || initialMata[key] || ComponentF.value;
            if (EleType === "Switch") propsNew.checked = store[key] || initialMata[key] || ComponentF.checked;
            if (scrollIntoView) {
              propsNew.id = key + "ByGetFieldDecorator";
            }
            var newTree = _react2.default.cloneElement(ComponentF, propsNew, ComponentF.props.children);
            return newTree;
          };
        };

        _this2.validateFieldsWraped = function (submit) {
          if (_this2.state.submitting) return;
          _this2.fieldStore.validateFields(function (errMess, store) {
            if (scrollIntoView) {
              return document.querySelector("#" + errKey + "ByGetFieldDecorator").scrollIntoView({ block: "center", behavior: "smooth" });
            }
            if (callback_onErr && errMess) {
              return callback_onErr(errMess);
            }
            if (errMess) return console.error(errMessage);
            _this2.setState({ submitting: false });
            submit(errMess, store);
          });
        };

        _this2.submitting = function () {
          return Boolean(_this2.state.submitting);
        };

        _this2.addtionaProps = function () {
          return {
            getFieldDecorator: _this2.getFieldDecorator,
            setFieldsValue: _this2.fieldStore.setFieldsValue,
            getFieldValue: _this2.fieldStore.getFieldValue,
            validateFields: _this2.validateFieldsWraped,
            resetFields: _this2.fieldStore.resetFields,
            store: _this2.fieldStore.store,
            submitting: _this2.submitting()
          };
        };

        _this2.state = {};
        _this2.fieldStore = (0, _fieldStore2.default)();
        return _this2;
      }

      _createClass(_class2, [{
        key: "render",
        value: function render() {
          var props = { form: this.addtionaProps() };
          return _react2.default.createElement(WrappedComponent, props);
        }
      }]);

      return _class2;
    }(_react2.default.Component);
  };
};
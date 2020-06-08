"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparisonObject = comparisonObject;

function getType(data) {
  return Object.prototype.toString.call(data).substring(8).split(/]/)[0];
}
/**
 * 深度比较两对象
 * @param {*} sourceObj 
 * @param {*} compareObj 
 */
function comparisonObject(sourceObj, compareObj) {
  if (arguments.length < 2) throw "Incorrect number of parameters";
  var sourceType = getType(sourceObj);
  if (sourceType !== getType(compareObj)) return false;
  // Not objects and arrays
  if (sourceType !== "Array" && sourceType !== "Object" && sourceType !== "Set" && sourceType !== "Map") {
    if (sourceType === "Number" && sourceObj.toString() === "NaN") {
      return compareObj.toString() === "NaN";
    }
    if (sourceType === "Date" || sourceType === "RegExp") {
      return sourceObj.toString() === compareObj.toString();
    }
    return sourceObj === compareObj;
  } else if (sourceType === "Array") {
    if (sourceObj.length !== compareObj.length) return false;
    if (sourceObj.length === 0) return true;
    for (var i = 0; i < sourceObj.length; i++) {
      if (!comparisonObject(sourceObj[i], compareObj[i])) return false;
    }
  } else if (sourceType === "Object") {
    var sourceKeyList = Reflect.ownKeys(sourceObj);
    var compareKeyList = Reflect.ownKeys(compareObj);
    var key = void 0;
    if (sourceKeyList.length !== compareKeyList.length) return false;
    for (var _i = 0; _i < sourceKeyList.length; _i++) {
      key = sourceKeyList[_i];
      if (key !== compareKeyList[_i]) return false;
      if (!comparisonObject(sourceObj[key], compareObj[key])) return false;
    }
  } else if (sourceType === "Set" || sourceType === "Map") {
    // 把 Set Map 转为 Array
    if (!comparisonObject(Array.from(sourceObj), Array.from(compareObj))) return false;
  }
  return true;
}
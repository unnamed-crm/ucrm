import { isClient } from '@vueuse/core';
import '../types.mjs';
import '../strings.mjs';
import { entriesOf, keysOf } from '../objects.mjs';
import { camelize, isObject } from '@vue/shared';

const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
  if (!el || !cls)
    return false;
  if (cls.includes(" "))
    throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
const addClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.remove(...classNameToArray(cls));
};
const getStyle = (element, styleName) => {
  var _a;
  if (!isClient || !element || !styleName)
    return "";
  let key = camelize(styleName);
  if (key === "float")
    key = "cssFloat";
  try {
    const style = element.style[styleName];
    if (style)
      return style;
    const computed = (_a = document.defaultView) == null ? void 0 : _a.getComputedStyle(element, "");
    return computed ? computed[styleName] : "";
  } catch (e) {
    return element.style[styleName];
  }
};
const setStyle = (element, styleName, value) => {
  if (!element || !styleName)
    return;
  if (isObject(styleName)) {
    entriesOf(styleName).forEach(([prop, value2]) => setStyle(element, prop, value2));
  } else {
    const key = camelize(styleName);
    element.style[key] = value;
  }
};
const removeStyle = (element, style) => {
  if (!element || !style)
    return;
  if (isObject(style)) {
    keysOf(style).forEach((prop) => removeStyle(element, prop));
  } else {
    setStyle(element, style, "");
  }
};

export { addClass, classNameToArray, getStyle, hasClass, removeClass, removeStyle, setStyle };
//# sourceMappingURL=style.mjs.map

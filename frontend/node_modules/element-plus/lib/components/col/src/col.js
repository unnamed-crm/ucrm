'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
require('../../../hooks/index.js');
require('../../../tokens/index.js');
var props = require('../../../utils/vue/props.js');
var typescript = require('../../../utils/typescript.js');
var row = require('../../../tokens/row.js');
var index = require('../../../hooks/use-namespace/index.js');

const colProps = props.buildProps({
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xs: {
    type: props.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  },
  sm: {
    type: props.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  },
  md: {
    type: props.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  },
  lg: {
    type: props.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  },
  xl: {
    type: props.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  }
});
var Col = vue.defineComponent({
  name: "ElCol",
  props: colProps,
  setup(props, {
    slots
  }) {
    const {
      gutter
    } = vue.inject(row.rowContextKey, {
      gutter: vue.computed(() => 0)
    });
    const ns = index.useNamespace("col");
    const style = vue.computed(() => {
      if (gutter.value) {
        return {
          paddingLeft: `${gutter.value / 2}px`,
          paddingRight: `${gutter.value / 2}px`
        };
      }
      return {};
    });
    const classes = vue.computed(() => {
      const classes2 = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (typeof size === "number") {
          if (prop === "span")
            classes2.push(ns.b(`${props[prop]}`));
          else if (size > 0)
            classes2.push(ns.b(`${prop}-${props[prop]}`));
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (typeof props[size] === "number") {
          classes2.push(ns.b(`${size}-${props[size]}`));
        } else if (typeof props[size] === "object") {
          const sizeProps = props[size];
          Object.keys(sizeProps).forEach((prop) => {
            classes2.push(prop !== "span" ? ns.b(`${size}-${prop}-${sizeProps[prop]}`) : ns.b(`${size}-${sizeProps[prop]}`));
          });
        }
      });
      if (gutter.value) {
        classes2.push(ns.is("guttered"));
      }
      return classes2;
    });
    return () => vue.createVNode(props.tag, {
      "class": [ns.b(), classes.value],
      "style": style.value
    }, slots);
  }
});

exports.colProps = colProps;
exports["default"] = Col;
//# sourceMappingURL=col.js.map

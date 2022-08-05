import { defineComponent, inject, computed, createVNode } from 'vue';
import '../../../utils/index.mjs';
import '../../../hooks/index.mjs';
import '../../../tokens/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props.mjs';
import { mutable } from '../../../utils/typescript.mjs';
import { rowContextKey } from '../../../tokens/row.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const colProps = buildProps({
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
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  sm: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  md: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  lg: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  xl: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  }
});
var Col = defineComponent({
  name: "ElCol",
  props: colProps,
  setup(props, {
    slots
  }) {
    const {
      gutter
    } = inject(rowContextKey, {
      gutter: computed(() => 0)
    });
    const ns = useNamespace("col");
    const style = computed(() => {
      if (gutter.value) {
        return {
          paddingLeft: `${gutter.value / 2}px`,
          paddingRight: `${gutter.value / 2}px`
        };
      }
      return {};
    });
    const classes = computed(() => {
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
    return () => createVNode(props.tag, {
      "class": [ns.b(), classes.value],
      "style": style.value
    }, slots);
  }
});

export { colProps, Col as default };
//# sourceMappingURL=col.mjs.map

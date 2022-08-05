'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../utils/index.js');
require('../../../hooks/index.js');
var props = require('../../../utils/vue/props.js');
var index = require('../../../hooks/use-global-config/index.js');

const messageConfig = {};
const configProviderProps = props.buildProps({
  locale: {
    type: props.definePropType(Object)
  },
  size: {
    type: String,
    values: ["large", "default", "small"]
  },
  button: {
    type: props.definePropType(Object)
  },
  message: {
    type: props.definePropType(Object)
  },
  zIndex: {
    type: Number
  },
  namespace: {
    type: String,
    default: "el"
  }
});
var ConfigProvider = vue.defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    vue.watch(() => props.message, (val) => {
      Object.assign(messageConfig, val != null ? val : {});
    }, { immediate: true, deep: true });
    const config = index.provideGlobalConfig(props);
    return () => vue.renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
  }
});

exports.configProviderProps = configProviderProps;
exports["default"] = ConfigProvider;
exports.messageConfig = messageConfig;
//# sourceMappingURL=config-provider.js.map

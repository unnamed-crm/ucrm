import '../../../hooks/index.mjs';
import '../../../utils/index.mjs';
import { Loading } from '@element-plus/icons-vue';
import { buildProps } from '../../../utils/vue/props.mjs';
import { useSizeProp } from '../../../hooks/use-common-props/index.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';

const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
];
const buttonNativeTypes = ["button", "submit", "reset"];
const buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: ""
  },
  icon: {
    type: iconPropType,
    default: ""
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => Loading
  },
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  }
});
const buttonEmits = {
  click: (evt) => evt instanceof MouseEvent
};

export { buttonEmits, buttonNativeTypes, buttonProps, buttonTypes };
//# sourceMappingURL=button.mjs.map

import '../../button/index.mjs';
import { QuestionFilled } from '@element-plus/icons-vue';
import '../../../utils/index.mjs';
import '../../tooltip/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props.mjs';
import { buttonTypes } from '../../button/src/button.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';
import { useTooltipContentProps } from '../../tooltip/src/tooltip.mjs';

const popconfirmProps = buildProps({
  title: {
    type: String
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonType: {
    type: String,
    values: buttonTypes,
    default: "primary"
  },
  cancelButtonType: {
    type: String,
    values: buttonTypes,
    default: "text"
  },
  icon: {
    type: iconPropType,
    default: QuestionFilled
  },
  iconColor: {
    type: String,
    default: "#f90"
  },
  hideIcon: {
    type: Boolean,
    default: false
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  onConfirm: {
    type: definePropType(Function)
  },
  onCancel: {
    type: definePropType(Function)
  },
  teleported: useTooltipContentProps.teleported,
  persistent: useTooltipContentProps.persistent
});

export { popconfirmProps };
//# sourceMappingURL=popconfirm.mjs.map

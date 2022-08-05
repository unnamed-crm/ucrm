import '../../../utils/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props.mjs';
import { mutable } from '../../../utils/typescript.mjs';
import { isNumber } from '@vueuse/core';

const imageProps = buildProps({
  appendToBody: {
    type: Boolean,
    default: void 0
  },
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    default: ""
  },
  fit: {
    type: String,
    values: ["", "contain", "cover", "fill", "none", "scale-down"],
    default: ""
  },
  lazy: {
    type: Boolean,
    default: false
  },
  scrollContainer: {
    type: definePropType([String, Object])
  },
  previewSrcList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  previewTeleported: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  }
});
const imageEmits = {
  error: (evt) => evt instanceof Event,
  switch: (val) => isNumber(val),
  close: () => true
};

export { imageEmits, imageProps };
//# sourceMappingURL=image.mjs.map

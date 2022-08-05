import '../../../utils/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props.mjs';
import { mutable } from '../../../utils/typescript.mjs';

const imageViewerProps = buildProps({
  urlList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  infinite: {
    type: Boolean,
    default: true
  },
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  teleported: {
    type: Boolean,
    default: false
  }
});
const imageViewerEmits = {
  close: () => true,
  switch: (index) => typeof index === "number"
};

export { imageViewerEmits, imageViewerProps };
//# sourceMappingURL=image-viewer.mjs.map

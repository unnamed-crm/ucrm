'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var typescript = require('../../../utils/typescript.js');

const imageViewerProps = props.buildProps({
  urlList: {
    type: props.definePropType(Array),
    default: () => typescript.mutable([])
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

exports.imageViewerEmits = imageViewerEmits;
exports.imageViewerProps = imageViewerProps;
//# sourceMappingURL=image-viewer.js.map

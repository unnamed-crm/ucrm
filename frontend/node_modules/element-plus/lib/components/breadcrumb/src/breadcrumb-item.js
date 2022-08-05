'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const breadcrumbItemProps = props.buildProps({
  to: {
    type: props.definePropType([String, Object]),
    default: ""
  },
  replace: {
    type: Boolean,
    default: false
  }
});

exports.breadcrumbItemProps = breadcrumbItemProps;
//# sourceMappingURL=breadcrumb-item.js.map

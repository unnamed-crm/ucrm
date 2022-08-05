'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var icon = require('../../../utils/vue/icon.js');

const breadcrumbProps = props.buildProps({
  separator: {
    type: String,
    default: "/"
  },
  separatorIcon: {
    type: icon.iconPropType,
    default: ""
  }
});

exports.breadcrumbProps = breadcrumbProps;
//# sourceMappingURL=breadcrumb.js.map

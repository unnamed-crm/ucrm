'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var popper$1 = require('./src/popper2.js');
var arrow = require('./src/arrow.js');
var trigger = require('./src/trigger.js');
var content = require('./src/content.js');
var popper = require('./src/popper.js');
var tokens = require('./src/tokens.js');
var deprecation = require('./src/deprecation.js');
var install = require('../../utils/vue/install.js');

const ElPopper = install.withInstall(popper$1["default"]);

exports.ElPopperArrow = arrow["default"];
exports.ElPopperTrigger = trigger["default"];
exports.ElPopperContent = content["default"];
exports.Effect = popper.Effect;
exports.usePopperArrowProps = popper.usePopperArrowProps;
exports.usePopperContentProps = popper.usePopperContentProps;
exports.usePopperCoreConfigProps = popper.usePopperCoreConfigProps;
exports.usePopperProps = popper.usePopperProps;
exports.usePopperTriggerProps = popper.usePopperTriggerProps;
exports.POPPER_CONTENT_INJECTION_KEY = tokens.POPPER_CONTENT_INJECTION_KEY;
exports.POPPER_INJECTION_KEY = tokens.POPPER_INJECTION_KEY;
exports.useDeprecateAppendToBody = deprecation.useDeprecateAppendToBody;
exports.ElPopper = ElPopper;
exports["default"] = ElPopper;
//# sourceMappingURL=index.js.map

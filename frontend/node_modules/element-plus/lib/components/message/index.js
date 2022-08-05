'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var messageMethod = require('./src/message-method.js');
var message = require('./src/message.js');
var install = require('../../utils/vue/install.js');

const ElMessage = install.withInstallFunction(messageMethod["default"], "$message");

exports.messageEmits = message.messageEmits;
exports.messageProps = message.messageProps;
exports.messageTypes = message.messageTypes;
exports.ElMessage = ElMessage;
exports["default"] = ElMessage;
//# sourceMappingURL=index.js.map

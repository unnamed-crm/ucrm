'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var col = require('./src/col.js');
var install = require('../../utils/vue/install.js');

const ElCol = install.withInstall(col["default"]);

exports.colProps = col.colProps;
exports.ElCol = ElCol;
exports["default"] = ElCol;
//# sourceMappingURL=index.js.map

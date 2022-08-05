'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var checkbox = require('./src/checkbox.js');
var checkboxButton = require('./src/checkbox-button.js');
var checkboxGroup = require('./src/checkbox-group.js');
var install = require('../../utils/vue/install.js');

const ElCheckbox = install.withInstall(checkbox["default"], {
  CheckboxButton: checkboxButton["default"],
  CheckboxGroup: checkboxGroup["default"]
});
const ElCheckboxButton = install.withNoopInstall(checkboxButton["default"]);
const ElCheckboxGroup = install.withNoopInstall(checkboxGroup["default"]);

exports.ElCheckbox = ElCheckbox;
exports.ElCheckboxButton = ElCheckboxButton;
exports.ElCheckboxGroup = ElCheckboxGroup;
exports["default"] = ElCheckbox;
//# sourceMappingURL=index.js.map

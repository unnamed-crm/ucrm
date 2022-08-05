'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var index = require('./src/index.js');
var descriptionItem = require('./src/description-item.js');
var install = require('../../utils/vue/install.js');

const ElDescriptions = install.withInstall(index["default"], {
  DescriptionsItem: descriptionItem["default"]
});
const ElDescriptionsItem = install.withNoopInstall(descriptionItem["default"]);

exports.ElDescriptions = ElDescriptions;
exports.ElDescriptionsItem = ElDescriptionsItem;
exports["default"] = ElDescriptions;
//# sourceMappingURL=index.js.map

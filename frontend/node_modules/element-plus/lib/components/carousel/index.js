'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var main = require('./src/main.js');
var item = require('./src/item.js');
var install = require('../../utils/vue/install.js');

const ElCarousel = install.withInstall(main["default"], {
  CarouselItem: item["default"]
});
const ElCarouselItem = install.withNoopInstall(item["default"]);

exports.ElCarousel = ElCarousel;
exports.ElCarouselItem = ElCarouselItem;
exports["default"] = ElCarousel;
//# sourceMappingURL=index.js.map

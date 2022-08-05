import '../../utils/index.mjs';
import Carousel from './src/main.mjs';
import CarouselItem from './src/item.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElCarousel = withInstall(Carousel, {
  CarouselItem
});
const ElCarouselItem = withNoopInstall(CarouselItem);

export { ElCarousel, ElCarouselItem, ElCarousel as default };
//# sourceMappingURL=index.mjs.map

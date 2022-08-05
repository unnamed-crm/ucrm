import Slider from './src/index.mjs';
import './src/slider.type.mjs';

Slider.install = (app) => {
  app.component(Slider.name, Slider);
};
const _Slider = Slider;
const ElSlider = _Slider;

export { ElSlider, _Slider as default };
//# sourceMappingURL=index.mjs.map

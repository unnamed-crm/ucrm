import '../../utils/index.mjs';
import Checkbox from './src/checkbox.mjs';
import CheckboxButton from './src/checkbox-button.mjs';
import _sfc_main from './src/checkbox-group.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElCheckbox = withInstall(Checkbox, {
  CheckboxButton,
  CheckboxGroup: _sfc_main
});
const ElCheckboxButton = withNoopInstall(CheckboxButton);
const ElCheckboxGroup = withNoopInstall(_sfc_main);

export { ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElCheckbox as default };
//# sourceMappingURL=index.mjs.map

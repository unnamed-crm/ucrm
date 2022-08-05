import '../../utils/index.mjs';
import Descriptions from './src/index.mjs';
import DescriptionsItem from './src/description-item.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElDescriptions = withInstall(Descriptions, {
  DescriptionsItem
});
const ElDescriptionsItem = withNoopInstall(DescriptionsItem);

export { ElDescriptions, ElDescriptionsItem, ElDescriptions as default };
//# sourceMappingURL=index.mjs.map

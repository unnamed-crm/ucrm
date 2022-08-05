import '../../utils/index.mjs';
import Steps from './src/index.mjs';
import Step from './src/item.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElSteps = withInstall(Steps, {
  Step
});
const ElStep = withNoopInstall(Step);

export { ElStep, ElSteps, ElSteps as default };
//# sourceMappingURL=index.mjs.map

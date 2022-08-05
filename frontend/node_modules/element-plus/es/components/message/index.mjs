import '../../utils/index.mjs';
import message from './src/message-method.mjs';
export { messageEmits, messageProps, messageTypes } from './src/message.mjs';
import { withInstallFunction } from '../../utils/vue/install.mjs';

const ElMessage = withInstallFunction(message, "$message");

export { ElMessage, ElMessage as default };
//# sourceMappingURL=index.mjs.map

import Transfer from './src/index.mjs';
import './src/transfer.mjs';
export { CHANGE_EVENT } from '../../constants/event.mjs';

Transfer.install = (app) => {
  app.component(Transfer.name, Transfer);
};
const _Transfer = Transfer;
const ElTransfer = _Transfer;

export { ElTransfer, _Transfer as default };
//# sourceMappingURL=index.mjs.map

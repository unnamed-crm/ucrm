import { unref } from 'vue';
import '../../utils/index.mjs';
import { useTimeout } from '../use-timeout/index.mjs';
import { buildProps } from '../../utils/vue/props.mjs';

const useDelayedToggleProps = buildProps({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  }
});
const useDelayedToggle = ({
  showAfter,
  hideAfter,
  open,
  close
}) => {
  const { registerTimeout } = useTimeout();
  const onOpen = () => {
    registerTimeout(() => {
      open();
    }, unref(showAfter));
  };
  const onClose = () => {
    registerTimeout(() => {
      close();
    }, unref(hideAfter));
  };
  return {
    onOpen,
    onClose
  };
};

export { useDelayedToggle, useDelayedToggleProps };
//# sourceMappingURL=index.mjs.map

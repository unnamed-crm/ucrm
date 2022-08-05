import { getCurrentInstance, computed } from 'vue';
import '../../../hooks/index.mjs';
import '../../../utils/index.mjs';
import { isBoolean } from '@vueuse/core';
import { useDeprecated } from '../../../hooks/use-deprecated/index.mjs';

function useDeprecateAppendToBody(scope, from) {
  const vm = getCurrentInstance();
  const compatTeleported = computed(() => {
    return isBoolean(vm.props[from]) ? vm.props[from] : vm.props.teleported;
  });
  useDeprecated({
    scope,
    from,
    replacement: "teleported",
    version: "2.1.0",
    ref: "https://element-plus.org/en-US/component/tooltip.html#attributes"
  }, computed(() => isBoolean(vm.props[from])));
  return {
    compatTeleported
  };
}

export { useDeprecateAppendToBody };
//# sourceMappingURL=deprecation.mjs.map

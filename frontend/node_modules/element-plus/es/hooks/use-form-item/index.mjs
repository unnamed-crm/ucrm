import { inject } from 'vue';
import '../../tokens/index.mjs';
import { formContextKey, formItemContextKey } from '../../tokens/form.mjs';

const useFormItem = () => {
  const form = inject(formContextKey, void 0);
  const formItem = inject(formItemContextKey, void 0);
  return {
    form,
    formItem
  };
};

export { useFormItem };
//# sourceMappingURL=index.mjs.map

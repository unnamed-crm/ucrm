import '../../../utils/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';
import { isArray } from '@vue/shared';

const uploadDraggerProps = buildProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const uploadDraggerEmits = {
  file: (file) => isArray(file)
};

export { uploadDraggerEmits, uploadDraggerProps };
//# sourceMappingURL=upload-dragger.mjs.map

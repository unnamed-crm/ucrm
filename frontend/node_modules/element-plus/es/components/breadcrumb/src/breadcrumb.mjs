import '../../../utils/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';

const breadcrumbProps = buildProps({
  separator: {
    type: String,
    default: "/"
  },
  separatorIcon: {
    type: iconPropType,
    default: ""
  }
});

export { breadcrumbProps };
//# sourceMappingURL=breadcrumb.mjs.map

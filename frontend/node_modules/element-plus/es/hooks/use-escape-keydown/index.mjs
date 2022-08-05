import { onMounted, onBeforeUnmount } from 'vue';
import '../../utils/index.mjs';
import '../../constants/index.mjs';
import { EVENT_CODE } from '../../constants/aria.mjs';
import { on, off } from '../../utils/dom/event.mjs';

const useEscapeKeydown = (handler) => {
  const cachedHandler = (e) => {
    const event = e;
    if (event.key === EVENT_CODE.esc) {
      handler == null ? void 0 : handler(event);
    }
  };
  onMounted(() => {
    on(document, "keydown", cachedHandler);
  });
  onBeforeUnmount(() => {
    off(document, "keydown", cachedHandler);
  });
};

export { useEscapeKeydown };
//# sourceMappingURL=index.mjs.map

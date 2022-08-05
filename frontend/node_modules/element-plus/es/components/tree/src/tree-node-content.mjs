import { defineComponent, inject, h } from 'vue';
import '../../../hooks/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElTreeNodeContent",
  props: {
    node: {
      type: Object,
      required: true
    },
    renderContent: Function
  },
  setup(props) {
    const ns = useNamespace("tree");
    const nodeInstance = inject("NodeInstance");
    const tree = inject("RootTree");
    return () => {
      const node = props.node;
      const { data, store } = node;
      return props.renderContent ? props.renderContent(h, { _self: nodeInstance, node, data, store }) : tree.ctx.slots.default ? tree.ctx.slots.default({ node, data }) : h("span", { class: ns.be("node", "label") }, [node.label]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=tree-node-content.mjs.map

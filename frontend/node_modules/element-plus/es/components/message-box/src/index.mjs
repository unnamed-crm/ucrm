import { defineComponent, ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount, toRefs, resolveComponent, resolveDirective, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, createElementVNode, createElementBlock, normalizeClass, normalizeStyle, withModifiers, resolveDynamicComponent, createCommentVNode, toDisplayString, withKeys, renderSlot, vShow, createTextVNode } from 'vue';
import { ElButton } from '../../button/index.mjs';
import '../../../directives/index.mjs';
import '../../../hooks/index.mjs';
import { ElInput } from '../../input/index.mjs';
import { ElOverlay } from '../../overlay/index.mjs';
import '../../../utils/index.mjs';
import '../../../constants/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import TrapFocus from '../../../directives/trap-focus/index.mjs';
import { TypeComponents, TypeComponentsMap } from '../../../utils/vue/icon.mjs';
import { isValidComponentSize } from '../../../utils/vue/validator.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useZIndex } from '../../../hooks/use-z-index/index.mjs';
import { useSize } from '../../../hooks/use-common-props/index.mjs';
import { useDraggable } from '../../../hooks/use-draggable/index.mjs';
import { on, off } from '../../../utils/dom/event.mjs';
import { useSameTarget } from '../../../hooks/use-same-target/index.mjs';
import { useModal } from '../../../hooks/use-modal/index.mjs';
import { usePreventGlobal } from '../../../hooks/use-prevent-global/index.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';
import { useLockscreen } from '../../../hooks/use-lockscreen/index.mjs';
import { useRestoreActive } from '../../../hooks/use-restore-active/index.mjs';

const _sfc_main = defineComponent({
  name: "ElMessageBox",
  directives: {
    TrapFocus
  },
  components: {
    ElButton,
    ElInput,
    ElOverlay,
    ElIcon,
    ...TypeComponents
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String,
      validator: isValidComponentSize
    },
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    draggable: Boolean,
    roundButton: {
      default: false,
      type: Boolean
    },
    container: {
      type: String,
      default: "body"
    },
    boxType: {
      type: String,
      default: ""
    }
  },
  emits: ["vanish", "action"],
  setup(props, { emit }) {
    const { t } = useLocale();
    const visible = ref(false);
    const { nextZIndex } = useZIndex();
    const state = reactive({
      beforeClose: null,
      callback: null,
      cancelButtonText: "",
      cancelButtonClass: "",
      confirmButtonText: "",
      confirmButtonClass: "",
      customClass: "",
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: "",
      inputPattern: null,
      inputPlaceholder: "",
      inputType: "text",
      inputValue: null,
      inputValidator: null,
      inputErrorMessage: "",
      message: null,
      modalFade: true,
      modalClass: "",
      showCancelButton: false,
      showConfirmButton: true,
      type: "",
      title: void 0,
      showInput: false,
      action: "",
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: "",
      validateError: false,
      zIndex: nextZIndex()
    });
    const typeClass = computed(() => {
      const type = state.type;
      return type && TypeComponentsMap[type] ? `el-message-box-icon--${type}` : "";
    });
    const btnSize = useSize(computed(() => props.buttonSize), { prop: true, form: true, formItem: true });
    const iconComponent = computed(() => state.icon || TypeComponentsMap[state.type] || "");
    const hasMessage = computed(() => !!state.message);
    const rootRef = ref();
    const headerRef = ref();
    const inputRef = ref();
    const confirmRef = ref();
    const confirmButtonClasses = computed(() => state.confirmButtonClass);
    watch(() => state.inputValue, async (val) => {
      await nextTick();
      if (props.boxType === "prompt" && val !== null) {
        validate();
      }
    }, { immediate: true });
    watch(() => visible.value, (val) => {
      if (val) {
        if (props.boxType === "alert" || props.boxType === "confirm") {
          nextTick().then(() => {
            var _a, _b, _c;
            (_c = (_b = (_a = confirmRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.focus) == null ? void 0 : _c.call(_b);
          });
        }
        state.zIndex = nextZIndex();
      }
      if (props.boxType !== "prompt")
        return;
      if (val) {
        nextTick().then(() => {
          if (inputRef.value && inputRef.value.$el) {
            getInputElement().focus();
          }
        });
      } else {
        state.editorErrorMessage = "";
        state.validateError = false;
      }
    });
    const draggable = computed(() => props.draggable);
    useDraggable(rootRef, headerRef, draggable);
    onMounted(async () => {
      await nextTick();
      if (props.closeOnHashChange) {
        on(window, "hashchange", doClose);
      }
    });
    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        off(window, "hashchange", doClose);
      }
    });
    function doClose() {
      if (!visible.value)
        return;
      visible.value = false;
      nextTick(() => {
        if (state.action)
          emit("action", state.action);
      });
    }
    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? "close" : "cancel");
      }
    };
    const overlayEvent = useSameTarget(handleWrapperClick);
    const handleInputEnter = () => {
      if (state.inputType !== "textarea") {
        return handleAction("confirm");
      }
    };
    const handleAction = (action) => {
      var _a;
      if (props.boxType === "prompt" && action === "confirm" && !validate()) {
        return;
      }
      state.action = action;
      if (state.beforeClose) {
        (_a = state.beforeClose) == null ? void 0 : _a.call(state, action, state, doClose);
      } else {
        doClose();
      }
    };
    const validate = () => {
      if (props.boxType === "prompt") {
        const inputPattern = state.inputPattern;
        if (inputPattern && !inputPattern.test(state.inputValue || "")) {
          state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
          state.validateError = true;
          return false;
        }
        const inputValidator = state.inputValidator;
        if (typeof inputValidator === "function") {
          const validateResult = inputValidator(state.inputValue);
          if (validateResult === false) {
            state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
            state.validateError = true;
            return false;
          }
          if (typeof validateResult === "string") {
            state.editorErrorMessage = validateResult;
            state.validateError = true;
            return false;
          }
        }
      }
      state.editorErrorMessage = "";
      state.validateError = false;
      return true;
    };
    const getInputElement = () => {
      const inputRefs = inputRef.value.$refs;
      return inputRefs.input || inputRefs.textarea;
    };
    const handleClose = () => {
      handleAction("close");
    };
    if (props.closeOnPressEscape) {
      useModal({
        handleClose
      }, visible);
    } else {
      usePreventGlobal(visible, "keydown", (e) => e.code === EVENT_CODE.esc);
    }
    if (props.lockScroll) {
      useLockscreen(visible);
    }
    useRestoreActive(visible);
    return {
      ...toRefs(state),
      overlayEvent,
      visible,
      hasMessage,
      typeClass,
      btnSize,
      iconComponent,
      confirmButtonClasses,
      rootRef,
      headerRef,
      inputRef,
      confirmRef,
      doClose,
      handleClose,
      handleWrapperClick,
      handleInputEnter,
      handleAction,
      t
    };
  }
});
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = {
  key: 0,
  ref: "headerRef",
  class: "el-message-box__header"
};
const _hoisted_3 = { class: "el-message-box__title" };
const _hoisted_4 = { class: "el-message-box__content" };
const _hoisted_5 = { class: "el-message-box__container" };
const _hoisted_6 = {
  key: 1,
  class: "el-message-box__message"
};
const _hoisted_7 = { key: 0 };
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = { class: "el-message-box__input" };
const _hoisted_10 = { class: "el-message-box__btns" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_close = resolveComponent("close");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_overlay = resolveComponent("el-overlay");
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Transition, {
    name: "fade-in-linear",
    onAfterLeave: _cache[11] || (_cache[11] = ($event) => _ctx.$emit("vanish"))
  }, {
    default: withCtx(() => [
      withDirectives(createVNode(_component_el_overlay, {
        "z-index": _ctx.zIndex,
        "overlay-class": ["is-message-box", _ctx.modalClass],
        mask: _ctx.modal
      }, {
        default: withCtx(() => [
          createElementVNode("div", {
            class: "el-overlay-message-box",
            onClick: _cache[8] || (_cache[8] = (...args) => _ctx.overlayEvent.onClick && _ctx.overlayEvent.onClick(...args)),
            onMousedown: _cache[9] || (_cache[9] = (...args) => _ctx.overlayEvent.onMousedown && _ctx.overlayEvent.onMousedown(...args)),
            onMouseup: _cache[10] || (_cache[10] = (...args) => _ctx.overlayEvent.onMouseup && _ctx.overlayEvent.onMouseup(...args))
          }, [
            withDirectives((openBlock(), createElementBlock("div", {
              ref: "rootRef",
              role: "dialog",
              "aria-label": _ctx.title || "dialog",
              "aria-modal": "true",
              class: normalizeClass([
                "el-message-box",
                _ctx.customClass,
                { "el-message-box--center": _ctx.center, "is-draggable": _ctx.draggable }
              ]),
              style: normalizeStyle(_ctx.customStyle),
              onClick: _cache[7] || (_cache[7] = withModifiers(() => {
              }, ["stop"]))
            }, [
              _ctx.title !== null && _ctx.title !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_2, [
                createElementVNode("div", _hoisted_3, [
                  _ctx.iconComponent && _ctx.center ? (openBlock(), createBlock(_component_el_icon, {
                    key: 0,
                    class: normalizeClass(["el-message-box__status", _ctx.typeClass])
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("v-if", true),
                  createElementVNode("span", null, toDisplayString(_ctx.title), 1)
                ]),
                _ctx.showClose ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: "el-message-box__headerbtn",
                  "aria-label": "Close",
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel")),
                  onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
                }, [
                  createVNode(_component_el_icon, { class: "el-message-box__close" }, {
                    default: withCtx(() => [
                      createVNode(_component_close)
                    ]),
                    _: 1
                  })
                ], 32)) : createCommentVNode("v-if", true)
              ], 512)) : createCommentVNode("v-if", true),
              createElementVNode("div", _hoisted_4, [
                createElementVNode("div", _hoisted_5, [
                  _ctx.iconComponent && !_ctx.center && _ctx.hasMessage ? (openBlock(), createBlock(_component_el_icon, {
                    key: 0,
                    class: normalizeClass(["el-message-box__status", _ctx.typeClass])
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("v-if", true),
                  _ctx.hasMessage ? (openBlock(), createElementBlock("div", _hoisted_6, [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(_ctx.message), 1)) : (openBlock(), createElementBlock("p", {
                        key: 1,
                        innerHTML: _ctx.message
                      }, null, 8, _hoisted_8))
                    ])
                  ])) : createCommentVNode("v-if", true)
                ]),
                withDirectives(createElementVNode("div", _hoisted_9, [
                  createVNode(_component_el_input, {
                    ref: "inputRef",
                    modelValue: _ctx.inputValue,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
                    type: _ctx.inputType,
                    placeholder: _ctx.inputPlaceholder,
                    class: normalizeClass({ invalid: _ctx.validateError }),
                    onKeydown: withKeys(withModifiers(_ctx.handleInputEnter, ["prevent"]), ["enter"])
                  }, null, 8, ["modelValue", "type", "placeholder", "class", "onKeydown"]),
                  createElementVNode("div", {
                    class: "el-message-box__errormsg",
                    style: normalizeStyle({
                      visibility: !!_ctx.editorErrorMessage ? "visible" : "hidden"
                    })
                  }, toDisplayString(_ctx.editorErrorMessage), 5)
                ], 512), [
                  [vShow, _ctx.showInput]
                ])
              ]),
              createElementVNode("div", _hoisted_10, [
                _ctx.showCancelButton ? (openBlock(), createBlock(_component_el_button, {
                  key: 0,
                  loading: _ctx.cancelButtonLoading,
                  class: normalizeClass([_ctx.cancelButtonClass]),
                  round: _ctx.roundButton,
                  size: _ctx.btnSize,
                  onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleAction("cancel")),
                  onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.handleAction("cancel"), ["prevent"]), ["enter"]))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.cancelButtonText || _ctx.t("el.messagebox.cancel")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "class", "round", "size"])) : createCommentVNode("v-if", true),
                withDirectives(createVNode(_component_el_button, {
                  ref: "confirmRef",
                  type: "primary",
                  loading: _ctx.confirmButtonLoading,
                  class: normalizeClass([_ctx.confirmButtonClasses]),
                  round: _ctx.roundButton,
                  disabled: _ctx.confirmButtonDisabled,
                  size: _ctx.btnSize,
                  onClick: _cache[5] || (_cache[5] = ($event) => _ctx.handleAction("confirm")),
                  onKeydown: _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => _ctx.handleAction("confirm"), ["prevent"]), ["enter"]))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.confirmButtonText || _ctx.t("el.messagebox.confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "class", "round", "disabled", "size"]), [
                  [vShow, _ctx.showConfirmButton]
                ])
              ])
            ], 14, _hoisted_1)), [
              [_directive_trap_focus]
            ])
          ], 32)
        ]),
        _: 3
      }, 8, ["z-index", "overlay-class", "mask"]), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}
var MessageBoxConstructor = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { MessageBoxConstructor as default };
//# sourceMappingURL=index.mjs.map

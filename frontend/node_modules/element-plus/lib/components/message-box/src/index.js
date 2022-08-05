'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../button/index.js');
require('../../../directives/index.js');
require('../../../hooks/index.js');
var index$2 = require('../../input/index.js');
var index$3 = require('../../overlay/index.js');
require('../../../utils/index.js');
require('../../../constants/index.js');
var index$4 = require('../../icon/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../directives/trap-focus/index.js');
var icon = require('../../../utils/vue/icon.js');
var validator = require('../../../utils/vue/validator.js');
var index$5 = require('../../../hooks/use-locale/index.js');
var index$6 = require('../../../hooks/use-z-index/index.js');
var index$7 = require('../../../hooks/use-common-props/index.js');
var index$8 = require('../../../hooks/use-draggable/index.js');
var event = require('../../../utils/dom/event.js');
var index$9 = require('../../../hooks/use-same-target/index.js');
var index$a = require('../../../hooks/use-modal/index.js');
var index$b = require('../../../hooks/use-prevent-global/index.js');
var aria = require('../../../constants/aria.js');
var index$c = require('../../../hooks/use-lockscreen/index.js');
var index$d = require('../../../hooks/use-restore-active/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElMessageBox",
  directives: {
    TrapFocus: index["default"]
  },
  components: {
    ElButton: index$1.ElButton,
    ElInput: index$2.ElInput,
    ElOverlay: index$3.ElOverlay,
    ElIcon: index$4.ElIcon,
    ...icon.TypeComponents
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String,
      validator: validator.isValidComponentSize
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
    const { t } = index$5.useLocale();
    const visible = vue.ref(false);
    const { nextZIndex } = index$6.useZIndex();
    const state = vue.reactive({
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
    const typeClass = vue.computed(() => {
      const type = state.type;
      return type && icon.TypeComponentsMap[type] ? `el-message-box-icon--${type}` : "";
    });
    const btnSize = index$7.useSize(vue.computed(() => props.buttonSize), { prop: true, form: true, formItem: true });
    const iconComponent = vue.computed(() => state.icon || icon.TypeComponentsMap[state.type] || "");
    const hasMessage = vue.computed(() => !!state.message);
    const rootRef = vue.ref();
    const headerRef = vue.ref();
    const inputRef = vue.ref();
    const confirmRef = vue.ref();
    const confirmButtonClasses = vue.computed(() => state.confirmButtonClass);
    vue.watch(() => state.inputValue, async (val) => {
      await vue.nextTick();
      if (props.boxType === "prompt" && val !== null) {
        validate();
      }
    }, { immediate: true });
    vue.watch(() => visible.value, (val) => {
      if (val) {
        if (props.boxType === "alert" || props.boxType === "confirm") {
          vue.nextTick().then(() => {
            var _a, _b, _c;
            (_c = (_b = (_a = confirmRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.focus) == null ? void 0 : _c.call(_b);
          });
        }
        state.zIndex = nextZIndex();
      }
      if (props.boxType !== "prompt")
        return;
      if (val) {
        vue.nextTick().then(() => {
          if (inputRef.value && inputRef.value.$el) {
            getInputElement().focus();
          }
        });
      } else {
        state.editorErrorMessage = "";
        state.validateError = false;
      }
    });
    const draggable = vue.computed(() => props.draggable);
    index$8.useDraggable(rootRef, headerRef, draggable);
    vue.onMounted(async () => {
      await vue.nextTick();
      if (props.closeOnHashChange) {
        event.on(window, "hashchange", doClose);
      }
    });
    vue.onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        event.off(window, "hashchange", doClose);
      }
    });
    function doClose() {
      if (!visible.value)
        return;
      visible.value = false;
      vue.nextTick(() => {
        if (state.action)
          emit("action", state.action);
      });
    }
    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? "close" : "cancel");
      }
    };
    const overlayEvent = index$9.useSameTarget(handleWrapperClick);
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
      index$a.useModal({
        handleClose
      }, visible);
    } else {
      index$b.usePreventGlobal(visible, "keydown", (e) => e.code === aria.EVENT_CODE.esc);
    }
    if (props.lockScroll) {
      index$c.useLockscreen(visible);
    }
    index$d.useRestoreActive(visible);
    return {
      ...vue.toRefs(state),
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
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_close = vue.resolveComponent("close");
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_overlay = vue.resolveComponent("el-overlay");
  const _directive_trap_focus = vue.resolveDirective("trap-focus");
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "fade-in-linear",
    onAfterLeave: _cache[11] || (_cache[11] = ($event) => _ctx.$emit("vanish"))
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode(_component_el_overlay, {
        "z-index": _ctx.zIndex,
        "overlay-class": ["is-message-box", _ctx.modalClass],
        mask: _ctx.modal
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", {
            class: "el-overlay-message-box",
            onClick: _cache[8] || (_cache[8] = (...args) => _ctx.overlayEvent.onClick && _ctx.overlayEvent.onClick(...args)),
            onMousedown: _cache[9] || (_cache[9] = (...args) => _ctx.overlayEvent.onMousedown && _ctx.overlayEvent.onMousedown(...args)),
            onMouseup: _cache[10] || (_cache[10] = (...args) => _ctx.overlayEvent.onMouseup && _ctx.overlayEvent.onMouseup(...args))
          }, [
            vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
              ref: "rootRef",
              role: "dialog",
              "aria-label": _ctx.title || "dialog",
              "aria-modal": "true",
              class: vue.normalizeClass([
                "el-message-box",
                _ctx.customClass,
                { "el-message-box--center": _ctx.center, "is-draggable": _ctx.draggable }
              ]),
              style: vue.normalizeStyle(_ctx.customStyle),
              onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {
              }, ["stop"]))
            }, [
              _ctx.title !== null && _ctx.title !== void 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                vue.createElementVNode("div", _hoisted_3, [
                  _ctx.iconComponent && _ctx.center ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                    key: 0,
                    class: vue.normalizeClass(["el-message-box__status", _ctx.typeClass])
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.iconComponent)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("span", null, vue.toDisplayString(_ctx.title), 1)
                ]),
                _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: "el-message-box__headerbtn",
                  "aria-label": "Close",
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel")),
                  onKeydown: _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
                }, [
                  vue.createVNode(_component_el_icon, { class: "el-message-box__close" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_close)
                    ]),
                    _: 1
                  })
                ], 32)) : vue.createCommentVNode("v-if", true)
              ], 512)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("div", _hoisted_4, [
                vue.createElementVNode("div", _hoisted_5, [
                  _ctx.iconComponent && !_ctx.center && _ctx.hasMessage ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                    key: 0,
                    class: vue.normalizeClass(["el-message-box__status", _ctx.typeClass])
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.iconComponent)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                  _ctx.hasMessage ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_7, vue.toDisplayString(_ctx.message), 1)) : (vue.openBlock(), vue.createElementBlock("p", {
                        key: 1,
                        innerHTML: _ctx.message
                      }, null, 8, _hoisted_8))
                    ])
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                vue.withDirectives(vue.createElementVNode("div", _hoisted_9, [
                  vue.createVNode(_component_el_input, {
                    ref: "inputRef",
                    modelValue: _ctx.inputValue,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
                    type: _ctx.inputType,
                    placeholder: _ctx.inputPlaceholder,
                    class: vue.normalizeClass({ invalid: _ctx.validateError }),
                    onKeydown: vue.withKeys(vue.withModifiers(_ctx.handleInputEnter, ["prevent"]), ["enter"])
                  }, null, 8, ["modelValue", "type", "placeholder", "class", "onKeydown"]),
                  vue.createElementVNode("div", {
                    class: "el-message-box__errormsg",
                    style: vue.normalizeStyle({
                      visibility: !!_ctx.editorErrorMessage ? "visible" : "hidden"
                    })
                  }, vue.toDisplayString(_ctx.editorErrorMessage), 5)
                ], 512), [
                  [vue.vShow, _ctx.showInput]
                ])
              ]),
              vue.createElementVNode("div", _hoisted_10, [
                _ctx.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 0,
                  loading: _ctx.cancelButtonLoading,
                  class: vue.normalizeClass([_ctx.cancelButtonClass]),
                  round: _ctx.roundButton,
                  size: _ctx.btnSize,
                  onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleAction("cancel")),
                  onKeydown: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction("cancel"), ["prevent"]), ["enter"]))
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.cancelButtonText || _ctx.t("el.messagebox.cancel")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "class", "round", "size"])) : vue.createCommentVNode("v-if", true),
                vue.withDirectives(vue.createVNode(_component_el_button, {
                  ref: "confirmRef",
                  type: "primary",
                  loading: _ctx.confirmButtonLoading,
                  class: vue.normalizeClass([_ctx.confirmButtonClasses]),
                  round: _ctx.roundButton,
                  disabled: _ctx.confirmButtonDisabled,
                  size: _ctx.btnSize,
                  onClick: _cache[5] || (_cache[5] = ($event) => _ctx.handleAction("confirm")),
                  onKeydown: _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction("confirm"), ["prevent"]), ["enter"]))
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.confirmButtonText || _ctx.t("el.messagebox.confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "class", "round", "disabled", "size"]), [
                  [vue.vShow, _ctx.showConfirmButton]
                ])
              ])
            ], 14, _hoisted_1)), [
              [_directive_trap_focus]
            ])
          ], 32)
        ]),
        _: 3
      }, 8, ["z-index", "overlay-class", "mask"]), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}
var MessageBoxConstructor = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render]]);

exports["default"] = MessageBoxConstructor;
//# sourceMappingURL=index.js.map

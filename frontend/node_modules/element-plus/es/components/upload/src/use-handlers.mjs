import { ref, watch } from 'vue';
import '../../../utils/index.mjs';
import '../../../hooks/index.mjs';
import { genFileId } from './upload.mjs';
import { debugWarn, throwError } from '../../../utils/error.mjs';
import { useDeprecated } from '../../../hooks/use-deprecated/index.mjs';

const SCOPE = "ElUpload";
const revokeObjectURL = (file) => {
  var _a;
  if ((_a = file.url) == null ? void 0 : _a.startsWith("blob:")) {
    URL.revokeObjectURL(file.url);
  }
};
const useHandlers = (props, uploadRef) => {
  const uploadFiles = ref([]);
  const getFile = (rawFile) => uploadFiles.value.find((file) => file.uid === rawFile.uid);
  function abort(file) {
    var _a;
    (_a = uploadRef.value) == null ? void 0 : _a.abort(file);
  }
  function clearFiles(states = ["ready", "uploading", "success", "fail"]) {
    uploadFiles.value = uploadFiles.value.filter((row) => !states.includes(row.status));
  }
  const handleError = (err, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    file.status = "fail";
    uploadFiles.value.splice(uploadFiles.value.indexOf(file), 1);
    props.onError(err, file, uploadFiles.value);
    props.onChange(file, uploadFiles.value);
  };
  const handleProgress = (evt, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    props.onProgress(evt, file, uploadFiles.value);
    file.status = "uploading";
    file.percentage = Math.round(evt.percent);
  };
  const handleSuccess = (response, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    file.status = "success";
    file.response = response;
    props.onSuccess(response, file, uploadFiles.value);
    props.onChange(file, uploadFiles.value);
  };
  const handleStart = (file) => {
    const uploadFile = {
      name: file.name,
      percentage: 0,
      status: "ready",
      size: file.size,
      raw: file,
      uid: file.uid
    };
    if (props.listType === "picture-card" || props.listType === "picture") {
      try {
        uploadFile.url = URL.createObjectURL(file);
      } catch (err) {
        debugWarn(SCOPE, err.message);
        props.onError(err, uploadFile, uploadFiles.value);
      }
    }
    uploadFiles.value.push(uploadFile);
    props.onChange(uploadFile, uploadFiles.value);
  };
  const handleRemove = async (file, rawFile) => {
    if (rawFile) {
      useDeprecated({
        scope: SCOPE,
        from: "handleRemove second argument",
        version: "2.2",
        replacement: "first argument `file`",
        ref: "https://element-plus.org/en-US/component/upload.html#methods"
      }, true);
    }
    const _file = rawFile || file;
    const uploadFile = _file instanceof File ? getFile(_file) : _file;
    if (!uploadFile)
      throwError(SCOPE, "file to be removed not found");
    const doRemove = (file2) => {
      abort(file2);
      const fileList = uploadFiles.value;
      fileList.splice(fileList.indexOf(file2), 1);
      props.onRemove(file2, fileList);
      revokeObjectURL(file2);
    };
    if (props.beforeRemove) {
      const before = await props.beforeRemove(uploadFile, uploadFiles.value);
      if (before !== false)
        doRemove(uploadFile);
    } else {
      doRemove(uploadFile);
    }
  };
  function submit() {
    uploadFiles.value.filter(({ status }) => status === "ready").forEach(({ raw }) => {
      var _a;
      return raw && ((_a = uploadRef.value) == null ? void 0 : _a.upload(raw));
    });
  }
  watch(() => props.listType, (val) => {
    if (val !== "picture-card" && val !== "picture") {
      return;
    }
    uploadFiles.value = uploadFiles.value.map((file) => {
      const { raw, url } = file;
      if (!url && raw) {
        try {
          file.url = URL.createObjectURL(raw);
        } catch (err) {
          props.onError(err, file, uploadFiles.value);
        }
      }
      return file;
    });
  });
  watch(() => props.fileList, (fileList) => {
    for (const file of fileList) {
      file.uid || (file.uid = genFileId());
      file.status || (file.status = "success");
    }
    uploadFiles.value = fileList;
  }, { immediate: true, deep: true });
  return {
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
    uploadFiles
  };
};

export { useHandlers };
//# sourceMappingURL=use-handlers.mjs.map

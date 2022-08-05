import './hooks/index.mjs';
import { version } from './version.mjs';
import { provideGlobalConfig } from './hooks/use-global-config/index.mjs';

const INSTALLED_KEY = Symbol("INSTALLED_KEY");
const makeInstaller = (components = []) => {
  const install = (app, options = {}) => {
    if (app[INSTALLED_KEY])
      return;
    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
    provideGlobalConfig(options, app, true);
  };
  return {
    version,
    install
  };
};

export { makeInstaller };
//# sourceMappingURL=make-installer.mjs.map

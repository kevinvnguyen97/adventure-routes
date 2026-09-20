import path from "path";
import { getDefaultConfig } from "expo/metro-config";

const workspaceRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(__dirname);

const metroConfig = getDefaultConfig(projectRoot);

metroConfig.watchFolders = [workspaceRoot];
metroConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
metroConfig.resolver.extraNodeModules = {
  ...metroConfig.resolver.extraNodeModules,
  react: path.resolve(projectRoot, "node_modules/react"),
};
const reactRuntimeFiles = new Map([
  ["react", "index.js"],
  ["react/jsx-runtime", "jsx-runtime.js"],
  ["react/jsx-dev-runtime", "jsx-dev-runtime.js"],
  ["react/compiler-runtime", "compiler-runtime.js"],
]);
const defaultResolveRequest = metroConfig.resolver.resolveRequest;

metroConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  const runtimeFile = reactRuntimeFiles.get(moduleName);
  if (runtimeFile) {
    return {
      type: "sourceFile",
      filePath: path.resolve(projectRoot, "node_modules/react", runtimeFile),
    };
  }

  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

export default metroConfig;

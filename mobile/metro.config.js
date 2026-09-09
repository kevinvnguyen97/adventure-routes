import path from "path";

const workspaceRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(__dirname);

const metroConfig = {
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(workspaceRoot, "node_modules"),
      path.resolve(projectRoot, "node_modules"),
    ],
  },
};

export default metroConfig;

import { makeValidator, envsafe } from "envsafe";
import { normalize } from "path";
import { statSync } from "fs";

const existingLocalDir = makeValidator((pathStr: string): string => {
  const normalizedPathStr = normalize(pathStr);
  const pathStat = statSync(normalizedPathStr);
  if (!pathStat.isDirectory()) {
    throw new Error("fatal: path doesn't exist");
  }

  return normalizedPathStr;
});

const env = envsafe({
  SINKER_VIDEO_DOWNLOAD_DIR: existingLocalDir({
    allowEmpty: false,
    desc: "Where videos are downloaded to. Videos will be moved from this directory to the library during import. Ensure enough space exists on disk to download videos.",
  }),
});

interface Config {
  videoDownloadDir: string;
}

export const config: Config = {
  videoDownloadDir: env.SINKER_VIDEO_DOWNLOAD_DIR,
};

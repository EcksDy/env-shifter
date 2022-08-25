import { existsSync, readFileSync, writeFileSync } from 'fs';
import { SwitchFn } from '../../types';

/**
 * Strict will throw error on any file that is missing.
 *
 * @param targetPath Path to target file/directory
 * @param sourcePath Path to source file/directory
 */
export const strict: SwitchFn = function (targetPath: string, sourcePath: string) {
  const isTargetExist = existsSync(targetPath);
  const isSourceExist = existsSync(sourcePath);

  if (!isTargetExist) throw new Error(`Target not found: ${targetPath}`);
  if (!isSourceExist) throw new Error(`Source not found: ${sourcePath}`);

  // TODO: allow for dirs
  // const areFiles = isFile(targetPath) && isFile(sourcePath);
  // const areDirs = isDirectory(targetPath) && isDirectory(sourcePath);
  // throw new Error(
  //   `Expected either files or directories, but got ${targetPath} and ${presetPath}`,
  // );

  const sourceContent = readFileSync(sourcePath, 'utf-8') || '';
  writeFileSync(targetPath, sourceContent, { encoding: 'utf-8' });
};

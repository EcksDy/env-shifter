import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { EnvSwitcher } from '..';
import { SwitchFn } from '../../types';

/**
 * Careful will skip files that were missing.
 *
 * @param targetPath Path to target file/directory
 * @param sourcePath Path to source file/directory
 */
export const careful: SwitchFn = function (targetPath: string, sourcePath: string) {
  // TODO: allow for dirs
  // const areFiles = isFile(targetPath) && isFile(sourcePath);
  // const areDirs = isDirectory(targetPath) && isDirectory(sourcePath);
  // throw new Error(
  //   `Expected either files or directories, but got ${targetPath} and ${presetPath}`,
  // );
  const isTargetExist = existsSync(targetPath);
  const isSourceExist = existsSync(sourcePath);

  if (!isTargetExist || !isSourceExist) return;

  const sourceContent = readFileSync(sourcePath, 'utf-8') || '';
  writeFileSync(targetPath, sourceContent, { encoding: 'utf-8' });
};

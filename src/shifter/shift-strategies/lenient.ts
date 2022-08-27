import { readFileSync, writeFileSync } from 'fs';
import { SwitchFn } from '../../types';
import { EnvShifter } from '../env-shifter';

/**
 * Lenient will write create missing targets and treat missing sources as empty strings.
 *
 * @param targetPath Path to target file/directory
 * @param sourcePath Path to source file/directory
 */
export const lenient: SwitchFn = function (targetPath: string, sourcePath: string) {
  // TODO: allow for dirs
  // const areFiles = isFile(targetPath) && isFile(sourcePath);
  // const areDirs = isDirectory(targetPath) && isDirectory(sourcePath);
  // throw new Error(
  //   `Expected either files or directories, but got ${targetPath} and ${presetPath}`,
  // );

  const sourceContent = readFileSync(sourcePath, 'utf-8') || '';
  writeFileSync(targetPath, sourceContent, { encoding: 'utf-8' });
};

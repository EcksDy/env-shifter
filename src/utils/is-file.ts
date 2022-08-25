import { existsSync, lstatSync } from 'fs';

export function isFile(path: string): boolean {
  return existsSync(path) && lstatSync(path).isFile();
}

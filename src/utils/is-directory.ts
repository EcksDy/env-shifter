import { existsSync, lstatSync } from 'fs';

export function isDirectory(path: string): boolean {
  return existsSync(path) && lstatSync(path).isDirectory();
}

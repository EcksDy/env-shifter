import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Configuration } from '../types';

export function getConfig(path: string): Configuration {
  try {
    const resolvedPath = resolve(path, CONFIG_FILENAME);
    const configString = readFileSync(resolvedPath, 'utf-8');
    const config = JSON.parse(configString);

    if (!config.root) config.root = resolvedPath;

    validateConfig(config);

    return config as Configuration;
  } catch (error) {
    console.error(error);
    throw new Error(`No configuration loaded from: ${path}`);
  }
}

export function validateConfig(config: unknown): Configuration {
  if (!isConfig(config))
    throw new Error(`Configuration failed validation: ${JSON.stringify(config)}`);

  return config;
}

function isConfig(config: any): config is Configuration {
  const hasSingleTarget = config.target && Array.isArray(config.presets) && config.presets.length;
  const hasTargets = Array.isArray(config.targets) && config.targets.length;
  const hasRoot = typeof config.root === 'string';

  return hasRoot && (hasSingleTarget || hasTargets);
}

const CONFIG_FILENAME = '.shifterrc';

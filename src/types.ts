import { EnvSwitcher } from './switcher/env-switcher';

export type GlobPattern = string;

export type Tolerance =
  | 'lenient' // Missing files treated as empty string. Missing targets are created.
  | 'careful' // Missing files are ignored.
  | 'strict'; // Missing files throw an error.

export type Strategy =
  | 'all' // All targets are attempted to be switched.
  | 'single'; // Only one target is switched.

export type SwitchFn = (target: string, source: string) => void;

type PresetPath = string;

type PresetObject = {
  path: string;
  name?: string;
};

type PresetObjectGlob = {
  include: GlobPattern;
  exclude?: GlobPattern;
};

export type Presets = [PresetPath | PresetObject | PresetObjectGlob] | GlobPattern;

export type Target = {
  path: string;
  presets: Presets;
};

type BaseConfig = {
  root: string;
  tolerance: Tolerance;
  strategy: Strategy;
};

type SingleTargetConfig = BaseConfig & {
  target: string;
  presets: Presets;

  targets?: never;
};

type MultipleTargetsConfig = BaseConfig & {
  targets: Target[];

  target?: never;
  presets?: never;
};

export type Configuration = SingleTargetConfig | MultipleTargetsConfig;

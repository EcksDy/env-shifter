import { SWITCH_DICT } from './shift-strategies';
import { Configuration, Tolerance, Target, Scope, Presets } from '../types';
import { getConfig } from '../utils';
import { join } from 'path';

export class EnvShifter {
  protected readonly root: string;
  protected readonly tolerance: Tolerance = 'lenient';
  protected readonly scope: Scope = 'all';
  private readonly switchFn: (this: EnvShifter, target: string, source: string) => void;
  protected readonly targets: Target[];

  private constructor(config: Configuration) {
    if (!config) throw new Error('No configuration provided');

    const { root, tolerance, presets, target, targets } = config;
    this.root = root;
    this.tolerance = tolerance;
    this.switchFn = SWITCH_DICT[this.tolerance];

    if (target && presets) {
      this.targets = [
        {
          path: target,
          presets,
        },
      ];
      return;
    }

    if (!targets)
      throw new Error(
        'You must specify at least one target, by providing either ("target" and "presets") or "targets" properties.',
      );

    this.targets = targets;
  }

  /**
   * If an config object is provided, the root property must be an absolute path.
   * If a path to .shifterrc is provided then the root will be resolved from the path + root property of the config file.
   */
  static build(config: Configuration): EnvShifter;
  static build(pathToDotshifterrc: string): EnvShifter;
  static build(options: Configuration | string): EnvShifter {
    if (typeof options === 'object') return new EnvShifter(options);

    const config = getConfig(options);

    return new EnvShifter(config);
  }

  public switch(targetPath: string, presetPath: string): void {
    this.switchFn(join(this.root, targetPath), join(this.root, presetPath));
  }

  public getTargetPresets(targetPath: string): Presets {
    const targetObject = this.targets.find(({ path }) => path === targetPath);
    if (!targetObject) return [] as never;

    return targetObject.presets;
  }
}

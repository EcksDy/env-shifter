import { SWITCH_DICT } from './switches';
import { Configuration, Tolerance, Target, Strategy, Presets } from '../types';
import { getConfig } from '../utils';
import { join } from 'path';

export class EnvSwitcher {
  protected readonly root: string;
  protected readonly tolerance: Tolerance = 'lenient';
  protected readonly strategy: Strategy = 'all';
  private readonly switchFn: (this: EnvSwitcher, target: string, source: string) => void;
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
   * If a path to .switcherrc is provided then the root will be resolved from the path + root property of the config file.
   */
  static build(config: Configuration): EnvSwitcher;
  static build(pathToDotswitcherrc: string): EnvSwitcher;
  static build(options: Configuration | string): EnvSwitcher {
    if (typeof options === 'object') return new EnvSwitcher(options);

    const config = getConfig(options);

    return new EnvSwitcher(config);
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

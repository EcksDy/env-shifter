import { SwitchFn, Tolerance } from '../../types';
import { lenient } from './lenient';
import { strict } from './strict';
import { careful } from './careful';

export const SWITCH_DICT: Record<Tolerance, SwitchFn> = {
  lenient,
  strict,
  careful,
};

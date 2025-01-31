import { colors } from './colors';
import { backgroundImage } from './gradients';
import { effects } from './effects';
import { animations } from './animations';
import { typography } from './typography';
import { layout } from './layout';

export const theme = {
  container: layout.container,
  extend: {
    ...typography,
    colors,
    backgroundImage,
    ...effects,
    ...animations,
  },
} as const;
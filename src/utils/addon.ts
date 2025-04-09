import path from 'path';

const addon = eval("require")(path.join(process.cwd(), 'src/utils/index.node'));
import type { Icon, IconFailed } from '../types/index';

export async function solveCaptcha(image: string): Promise<Icon | IconFailed> {
  try {
    return await addon.solve(image);
  } catch (error) {
    console.error('Error solving captcha:', error);
    throw new Error('Failed to process image');
  }
}
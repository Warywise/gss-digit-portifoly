'use server';

import fs from 'fs';
import path from 'path';

export async function getPresetAvatarsAction(): Promise<string[]> {
  try {
    const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
    const exists = fs.existsSync(avatarsDir);
    if (!exists) {
      return [];
    }

    const files = await fs.promises.readdir(avatarsDir);
    return files
      .filter((file) => /\.(png|jpe?g|svg|webp)$/i.test(file))
      .map((file) => `/avatars/${file}`);
  } catch (error) {
    console.error('Failed to read avatars directory:', error);
    return [];
  }
}

'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidateTag } from 'next/cache';

// Action p/ Likes
export async function toggleLike(projectId: string) {
  const supabase = await createClient();

  // Autenticação e atualização no banco...
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data: existingLike } = await supabase
    .from('interactions')
    .select('id')
    .eq('project_id', projectId)
    .eq('user_id', user.id)
    .eq('type', 'like')
    .single();

  if (existingLike) {
    await supabase.from('interactions').delete().eq('id', existingLike.id);
  } else {
    await supabase.from('interactions').insert({
      project_id: projectId,
      user_id: user.id,
      type: 'like',
    });
  }

  revalidateTag('projects-store');
}

// Action p/ Comentários
export async function addComment(projectId: string, content: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  await supabase.from('interactions').insert({
    project_id: projectId,
    user_id: user.id,
    type: 'comment',
    content,
  });

  revalidateTag('projects-store');
}

'use server';

import { createClient } from '@/lib/supabase/server';
import InteractionsModel from '@/types/interactions';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { revalidateTag } from 'next/cache';

export async function getUserInteractions() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = (await supabase
    .from('interactions')
    .select(`*`)
    .eq('user_id', user.id)) as PostgrestSingleResponse<InteractionsModel[]>;

  return data || [];
}

export async function toggleLike(projectId: string) {
  const supabase = await createClient();

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

export async function addComment(projectId: string, content: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data } = await supabase
    .from('interactions')
    .insert({
      project_id: projectId,
      user_id: user.id,
      type: 'comment',
      content,
    })
    .select();

  revalidateTag('projects-store');

  return data?.[0];
}

export async function deleteInteraction(interactionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('interactions')
    .delete()
    .eq('id', interactionId)
    .eq('user_id', user.id);

  if (error) throw new Error(error.message);

  revalidateTag('projects-store');
}

export async function editInteraction(interactionId: string, newContent: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('interactions')
    .update({ content: newContent })
    .eq('id', interactionId)
    .eq('user_id', user.id);

  if (error) throw new Error(error.message);

  revalidateTag('projects-store');
}

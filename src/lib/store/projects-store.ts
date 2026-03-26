import { unstable_cache as unstableCache } from 'next/cache';
import ProjectsModel from '@/types/projects';
import { createClient } from '@supabase/supabase-js';

const fetchProjectsState = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data, error } = await supabase
    .from('projects')
    .select(
      `
      *,
      technologies:project_technologies (
        technologies (name)
      ),
      interactions:interactions (
        id,
        type,
        content,
        created_at,
        user_id,
        profiles (
          display_name,
          avatar_url,
          username
        )
      )
    `,
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Store Error:', error);
    return [];
  }

  return data;
};

export const getProjectsStore = async (locale: string): Promise<ProjectsModel[]> => {
  const getCachedProjects = unstableCache(
    async () => {
      const rawData = await fetchProjectsState();

      return rawData.map((project: any) => {
        const likes = project.interactions.filter((i: any) => i.type === 'like');
        const comments = project.interactions.filter((i: any) => i.type === 'comment');

        return {
          id: project.id,
          name: project.name,
          imgThumb: project.img_thumb || '',
          img: project.img_gif || '',
          description: locale === 'pt' ? project.description_ptbr : project.description_en,
          deployed: project.deployed,
          techStacks: project.technologies?.map((t: any) => t.technologies?.name) || [],

          likes: likes.length || 0,
          comments: comments.length || 0,

          commentsList: comments.map((c: any) => ({
            id: c.id,
            content: c.content,
            createdAt: c.created_at,
            author: c.profiles?.display_name || c.profiles?.username || 'Anonymous',
            avatar: c.profiles?.avatar_url,
          })),

          commits: project.commits || 0,
          url: project.url_deployed || '',
          gitRepo: project.url_repo || '',
        };
      });
    },
    [`projects-full-store-${locale}`], // internal key
    {
      tags: ['projects-store'],
      revalidate: 3600, // 1h
    },
  );

  return getCachedProjects();
};

import { createClient } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';
import ProjectDataType from '@/types/projects';

const fetchProjectsState = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    // TODO: ver como funciona com apenas "project_technologies ( name )"
    .select(`
      *,
      technologies:project_technologies (
        technologies (name)
      ),
      interactions:project_interactions (
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
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Store Error:', error);
    return [];
  }

  return data;
};

export const getProjectsStore = unstable_cache(
  async (): Promise<ProjectDataType[]> => {
    const rawData = await fetchProjectsState();

 
    return rawData.map((project: any) => {
      const likes = project.interactions.filter((i: any) => i.type === 'like');
      const comments = project.interactions.filter((i: any) => i.type === 'comment');

      return {
        id: project.id,
        name: project.name,
        imgThumb: project.img_thumb || '',
        img: project.img_gif || '',
        // TODO: mudar pra ter as duas opções ptbr e en
        description: project.description_pt || project.description_en || '',
        deployed: project.deployed,
        techStacks: project.technologies?.map((t: any) => t.technologies?.name) || [],

        likes: likes.length || 0,
        comments: comments.length || 0,
        
        commentsList: comments.map((c: any) => ({
          id: c.id,
          content: c.content,
          createdAt: c.created_at,
          author: c.profiles?.display_name || 'Anonymous',
          avatar: c.profiles?.avatar_url,
          username: c.profiles?.username
        })),

        commits: project.commits || 0,
        url: project.url_deployed || '',
        gitRepo: project.url_repo || '',
      };
    });
  },
  ['projects-full-store'], // internal key
  {
    tags: ['projects-store'],
    revalidate: 3600, // 1h
  }
);

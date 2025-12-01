export type TechCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Fullstack'
  | 'DevOps'
  | 'Tools'
  | 'Soft Skills';

// Tipo para uma tecnologia individual
export interface Technology {
  name: string;
  category: TechCategory;
}

// Tipo principal para um Projeto
export interface Project {
  id: string; // uuid
  name: string;
  description: string;
  img_thumb: string;
  img_gif: string;
  url_deployed: string;
  url_repo: string;
  deployed: boolean;
  commits: number;
  created_at: string; // timestamp
  technologies: Technology[]; // Array de tecnologias relacionadas
}

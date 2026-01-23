import { CommentInteraction } from './interactions';

export default interface ProjectsModel {
  id: string;
  name: string;
  imgThumb: string;
  img: string;
  description: string;
  deployed: boolean;
  techStacks: string[];
  comments: number;
  commentsList: CommentInteraction[];
  likes: number;
  commits: number;
  url: string;
  gitRepo: string;
}

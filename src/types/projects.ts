export default interface ProjectDataType {
  id: string;
  name: string;
  imgThumb: string;
  img: string;
  description: string;
  deployed: boolean;
  techStacks: string[];
  comments: number;
  likes: number;
  commits: number;
  url: string;
  gitRepo: string;
}

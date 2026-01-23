export default interface InteractionsModel {
  id: string;
  project_id: string;
  user_id: string;
  type: 'like' | 'comment';
  content?: string;
  created_at: string;
}

export interface CommentInteraction {
  id: string;
  content: string;
  createdAt: string;
  author: string;
  avatar?: string;
}

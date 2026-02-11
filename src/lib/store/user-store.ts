import { create } from 'zustand';
import {
  addComment,
  deleteInteraction,
  editInteraction,
  getUserInteractions,
  toggleLike,
} from '../actions/interactions';

interface UserStoreState {
  likedProjectIds: string[];
  commentIds: string[];
  isLoading: boolean;

  // Actions
  fetchInteractions: () => Promise<void>;
  clearInteractions: () => void;

  handleLike: (projectId: string) => Promise<void>;
  handleComment: (projectId: string, content: string) => Promise<void>;
  handleDeleteComment: (interactionId: string) => Promise<void>;
  handleEditComment: (interactionId: string, newContent: string) => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
  likedProjectIds: [],
  commentIds: [],
  isLoading: false,

  fetchInteractions: async () => {
    set({ isLoading: true });
    try {
      const data = await getUserInteractions();

      const likes = data.filter((i) => i.type === 'like').map((i) => i.project_id);

      const comments = data.filter((i) => i.type === 'comment').map((i) => i.id);

      set({
        likedProjectIds: likes,
        commentIds: comments,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to fetch interactions', error);
      set({ isLoading: false });
    }
  },

  clearInteractions: () => {
    set({ likedProjectIds: [], commentIds: [] });
  },

  handleLike: async (projectId: string) => {
    const { likedProjectIds } = get();
    const isLiked = likedProjectIds.includes(projectId);

    // ATUALIZAÇÃO OTIMISTA
    set((state) => ({
      likedProjectIds: isLiked
        ? state.likedProjectIds.filter((id) => id !== projectId)
        : [...state.likedProjectIds, projectId],
    }));

    try {
      await toggleLike(projectId);
    } catch (error) {
      console.error('Erro ao sincronizar like: ', error);
      // ROLLBACK
      set({ likedProjectIds });
    }
  },

  handleComment: async (interactionId: string, content: string) => {
    const { commentIds } = get();

    try {
      const newComment = await addComment(interactionId, content);
      if (newComment) {
        set((state) => ({
          commentIds: [...state.commentIds, newComment.id],
        }));
      }
    } catch (error) {
      console.error('Error adding comment: ', error);
      // ROLLBACK
      set({ commentIds });
    }
  },

  handleDeleteComment: async (interactionId: string) => {
    const { commentIds } = get();
    set((state) => ({
      commentIds: state.commentIds.filter((id) => id !== interactionId),
    }));

    try {
      await deleteInteraction(interactionId);
    } catch (error) {
      console.error('Error deleting comment: ', error);
      set({ commentIds });
      throw error;
    }
  },

  handleEditComment: async (interactionId: string, newContent: string) => {
    try {
      await editInteraction(interactionId, newContent);
    } catch (error) {
      console.error('Error editing comment: ', error);
      throw error;
    }
  },
}));

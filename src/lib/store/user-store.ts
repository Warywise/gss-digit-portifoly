import { create } from 'zustand';
import { addComment, getUserInteractions, toggleLike } from '../actions/interactions';

interface UserStoreState {
  likedProjectIds: string[];
  commentIds: string[];
  isLoading: boolean;

  // Actions
  fetchInteractions: () => Promise<void>;
  clearInteractions: () => void;

  handleLike: (projectId: string) => Promise<void>;
  handleComment: (projectId: string, content: string) => Promise<void>;
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

  // TODO: implementar futuramente tipo de action: add, edit, delete
  handleComment: async (interactionId: string, content: string) => {
    const { commentIds } = get();

    // ATUALIZAÇÃO OTIMISTA
    set((state) => ({
      commentIds: [...state.commentIds, interactionId],
    }));

    try {
      await addComment(interactionId, content);
    } catch (error) {
      console.error('Erro ao sincronizar comment: ', error);
      // ROLLBACK
      set({ commentIds });
    }
  },
}));

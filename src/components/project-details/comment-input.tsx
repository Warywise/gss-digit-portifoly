'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../ui/button';
import { FaPaperPlane, FaRightToBracket } from 'react-icons/fa6';
import { useAuth } from '@/lib/providers/auth-provider';

interface CommentInputProps {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting?: boolean;
}

const CommentInput = ({ onSubmit, isSubmitting = false }: CommentInputProps) => {
  const { user, showAuthModal } = useAuth();
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await onSubmit(content);
    setContent('');
  };

  if (!user) {
    return (
      <div className="comment-input-login">
        <p className="text-sm text-subtitle mb-3">
          Faça login para deixar seu comentário e participar da discussão.
        </p>
        <Button
          label={
            <>
              <FaRightToBracket /> Entrar para Comentar
            </>
          }
          onClick={showAuthModal}
          variant="success"
          size="sm"
        />
      </div>
    );
  }

  const displayName =
    user.user_metadata.name || user.user_metadata.full_name || user.user_metadata.display_name;

  return (
    <div className="flex gap-3 items-start mt-4 animate-fade-in">
      {/* Avatar do Usuário Logado */}
      <div className="shrink-0 hidden sm:block">
        {!user.user_metadata.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt="Me"
            width={32}
            height={32}
            className="rounded-full border border-border"
          />
        ) : (
          // TODO: melhorar update do profile de acordo com o auth.user do Supabase
          <div className="avatar-placeholder">{displayName.substring(0, 2).toUpperCase()}</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex-1 relative">
        <textarea
          className="custom-textarea min-h-[80px] pr-12 resize-none text-sm"
          placeholder="O que você achou deste projeto?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          maxLength={500}
        />

        <div className="absolute bottom-2 right-2">
          <Button
            type="submit"
            label={isSubmitting ? <span className="animate-spin">⏳</span> : <FaPaperPlane />}
            size="icon"
            disabled={!content.trim() || isSubmitting}
            title="Enviar comentário"
          />
        </div>
      </form>
    </div>
  );
};

export default CommentInput;

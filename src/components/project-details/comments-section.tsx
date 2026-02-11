'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../ui/button';
import { useToast } from '../ui/toast';
import { formatRelativeTime } from '@/utils/date-formater';
import { useUserStore } from '@/lib/store/user-store';
import ProjectsModel from '@/types/projects';
import CommentInput from './comment-input';
import { FaPen, FaTrash, FaTriangleExclamation } from 'react-icons/fa6';
import Modal from '../ui/modal';

const CommentsSection: React.FC<{ project: ProjectsModel }> = ({ project }) => {
  const { handleComment, handleDeleteComment, handleEditComment, commentIds } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [commentToDelete, setCommentToDelete] = useState('');
  const showToast = useToast();

  // console.log('project.commentsList:', project.commentsList);

  const onSubmitComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      await handleComment(project.id, content);

      showToast('success', 'Comentário enviado!');
    } catch (error) {
      console.error(error);
      showToast('error', 'Erro ao enviar comentário.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSaveEdit = async (commentId: string, editContent: string) => {
    if (!editContent.trim()) return;

    try {
      await handleEditComment(commentId, editContent);
      showToast('success', 'Comentário editado!');
      setEditingId('');
    } catch (error) {
      console.error(error);
      showToast('error', 'Erro ao editar.');
      setEditingId(commentId);
    }
  };

  const onDeleteComment = async (commentId: string) => {
    try {
      await handleDeleteComment(commentId);
      showToast('success', 'Comentário excluído.');
      setCommentToDelete('');
    } catch (error) {
      console.error(error);
      showToast('error', 'Erro ao excluir.');
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="space-y-2">
        <h4 className="font-medium">Project Links</h4>
        <div className="flex gap-2">
          {project.gitRepo && (
            <Button
              variant="outline"
              size="sm"
              label={
                <a href={project.gitRepo} target="_blank" rel="noopener noreferrer">
                  GitHub Repo
                </a>
              }
            />
          )}
          {project.url && (
            <Button
              size="sm"
              label={
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              }
            />
          )}
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-4 border-t border-border pt-2 mt-2 w-full">
        <h4 className="font-medium mb-3">Comments ({project.comments})</h4>
        <div className="comments-box">
          {project.commentsList && project.commentsList.length > 0 ? (
            project.commentsList.map((comment) => {
              const isAuthor = commentIds.includes(comment.id);
              const isEditing = editingId === comment.id;

              return (
                <div key={comment.id} className="flex space-x-2 animate-fade-in">
                  {/* Avatar */}
                  <div className="shrink-0">
                    {comment.avatar ? (
                      <Image
                        src={comment.avatar}
                        alt={comment.author}
                        width={32}
                        height={32}
                        className="rounded-full border border-border"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {comment.author.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    {isEditing ? (
                      <CommentInput
                        onSubmit={(content) => onSaveEdit(comment.id, content)}
                        isEdit={true}
                        initialContent={comment.content}
                        onCancel={() => setEditingId('')}
                      />
                    ) : (
                      <>
                        <div className="bg-muted/40 rounded-lg p-3 border border-border/70">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-semibold text-text">{comment.author}</p>

                            {isAuthor && (
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => setEditingId(comment.id)}
                                  // style="text-muted hover:text-primary transition-colors"
                                  label={<FaPen size={12} />}
                                  variant="outline"
                                  size="sm"
                                />
                                <Button
                                  onClick={() => setCommentToDelete(comment.id)}
                                  // style="text-muted hover:text-danger transition-colors"
                                  label={<FaTrash size={12} />}
                                  variant="warning"
                                  size="sm"
                                />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-text/85 whitespace-pre-wrap">
                            {comment.content}
                          </p>
                        </div>
                        <p className="text-xs text-subtitle mt-0.5 ml-1">
                          {formatRelativeTime(comment.createdAt)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-subtitle italic">
              Seja o primeiro a comentar neste projeto! 🚀
            </div>
          )}
        </div>
      </div>

      <CommentInput onSubmit={onSubmitComment} isSubmitting={isSubmitting} />

      {/* --- MODAL DE CONFIRMAÇÃO DE EXCLUSÃO --- */}
      <Modal
        visible={!!commentToDelete}
        onCancel={() => setCommentToDelete('')}
        onConfirm={() => onDeleteComment(commentToDelete)}
        confirmVariant="danger"
        confirmLabel="Sim, excluir"
        header={
          <div className="flex items-center gap-2 text-danger font-bold">
            <FaTriangleExclamation />
            <span>Excluir Comentário</span>
          </div>
        }
        body={
          <p className="text-sm">
            Tem certeza que deseja excluir permanentemente este comentário? Esta ação não pode ser
            desfeita.
          </p>
        }
        size="sm"
        closable
      />
    </div>
  );
};

export default CommentsSection;

import Image from 'next/image';
import Badge from './ui/badge';
import Button from './ui/button';
import Modal from './ui/modal';
import React, { useEffect } from 'react';
import ProjectsModel from '@/types/projects';
import { formatRelativeTime } from '@/utils/date-formater';

interface ProjectDetailsProps {
  project: ProjectsModel;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  imgWidth: number;
}

const ProjectDetailsModal: React.FC<ProjectDetailsProps> = ({
  imgWidth,
  project,
  visible,
  setVisible,
}) => {
  const ModalHeader = () => (
    <div className="flex flex-col justify-between mb-2 gap-0.5">
      <h3 className="font-medium text-lg line-clamp-1">{project.name}</h3>
      <span className="text-xs text-text/60">
        {project.commits} commits | {project.likes} likes | {project.comments} comments
      </span>
    </div>
  );

  const ModalBody = () => (
    <div className="relative">
      <Image
        className="w-full aspect-video object-cover rounded-sm"
        src={project.img}
        alt={project.name}
        width={imgWidth}
        height={imgWidth}
        loading="lazy"
        unoptimized
      />
      <div className="absolute top-4 right-4">
        {project.deployed && <Badge label="Deployed" style="bg-primary text-foreground" />}
      </div>
      <div className="flex flex-wrap gap-2 my-4">
        {project.techStacks.map((tech) => (
          <Badge key={tech} label={tech} variant="outline" style="text-xs bg-secondary/50" />
        ))}
      </div>
      <p className="text-sm text-text/80 line-clamp-2 mb-4">{project.description}</p>
    </div>
  );

  const ModalFooter = () => (
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
            project.commentsList.map((comment) => (
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
                  <div className="bg-muted/40 rounded-lg p-3 border border-border/70">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-semibold text-text">{comment.author}</p>
                    </div>
                    <p className="text-sm text-text/85 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                  <p className="text-xs text-subtitle mt-0.5 ml-1">
                    {formatRelativeTime(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-subtitle italic">
              Seja o primeiro a comentar neste projeto! 🚀
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      header={<ModalHeader />}
      body={<ModalBody />}
      footer={<ModalFooter />}
      size="lg"
      hideOkButton
      hideCancelButton
      closable
    />
  );
};

export default ProjectDetailsModal;

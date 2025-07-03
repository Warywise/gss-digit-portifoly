import Image from 'next/image';
import Badge from './ui/badge';
import Button from './ui/button';
import Modal from './ui/modal';
import React, { useEffect } from 'react';

interface ProjectDetailsProps {
  project: {
    id: string;
    name: string;
    description: string;
    img: string;
    techStacks: string[];
    commits: number;
    comments: number;
    likes?: number;
    deployed?: boolean;
    url?: string;
    gitRepo?: string;
  };
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
        loading="lazy"
        src={project.img}
        alt={project.name}
        className="w-full aspect-video object-cover rounded-sm"
        width={imgWidth}
        height={imgWidth}
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
    <div className="grid">
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

      {/* TODO: implementar comentários */}
      <div className="space-y-4 border-t border-border pt-2 mt-3">
        <h4 className="font-medium">Comments ({project.comments})</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
              JD
            </div>
            <div className="flex-1">
              <div className="bg-accent/10 rounded-lg p-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-sm text-text/80">
                  Amazing work! The design is really clean and the functionality looks great.
                </p>
              </div>
              <p className="text-xs text-subtitle mt-1">2 hours ago</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
              SA
            </div>
            <div className="flex-1">
              <div className="bg-accent/10 rounded-lg p-3">
                <p className="text-sm font-medium">Sarah Adams</p>
                <p className="text-sm text-text/80">
                  Could you share more details about the tech stack used?
                </p>
              </div>
              <p className="text-xs text-subtitle mt-1">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.style.overflow = visible ? 'hidden' : 'auto';
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      closabe
      hideOkButton
      hideCancelButton
      header={<ModalHeader />}
      body={<ModalBody />}
      footer={<ModalFooter />}
    />
  );
};

export default ProjectDetailsModal;

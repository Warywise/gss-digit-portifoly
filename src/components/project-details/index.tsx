import React from 'react';
import Image from 'next/image';
import Badge from '../ui/badge';
import Modal from '../ui/modal';
import CommentsSection from './comments-section';
import ProjectsModel from '@/types/projects';

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

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      header={<ModalHeader />}
      body={<ModalBody />}
      footer={<CommentsSection project={project} />}
      size="lg"
      hideOkButton
      hideCancelButton
      closable
    />
  );
};

export default ProjectDetailsModal;

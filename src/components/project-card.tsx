'use client';
import Image from 'next/image';
import { useState } from 'react';
import Badge from './badge';
import Tooltip from './tooltip';
import Button from './button';
import { FaMessage, FaRocket, FaShare } from 'react-icons/fa6';

const ProjectCard = ({ project }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(project.likes || 0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-sm border border-border animate-fade-in post-animation">
      {/* Project Image */}
      <div className="relative w-full cursor-pointer" onClick={() => setIsDetailsOpen(true)}>
        <Image
          src={project.image}
          alt={project.title}
          className="w-full aspect-video object-cover"
        />
        {/* <div className="absolute top-4 right-4">
          {project.featured && (
            <Badge label="Featured" style="bg-primary text-primary-foreground" />
          )}
        </div> */}
      </div>

      {/* Project Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3
            className="font-medium text-lg line-clamp-1 cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsDetailsOpen(true)}
          >
            {project.title}
          </h3>
          <span className="text-xs text-muted-foreground">{project.date}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} variant="outline" style="text-xs bg-secondary/50" />
          ))}
        </div>

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-4">
            <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
              <Button
                label={
                  <>
                    <FaRocket
                      size={18}
                      className={isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
                    />
                    <span className="ml-1 text-xs">{likeCount}</span>
                  </>
                }
                variant="ghost"
                size="sm"
                style="p-0 h-auto"
                onClick={() => {}}
              />
            </Tooltip>

            <Tooltip title="Coment">
              <Button
                variant="ghost"
                size="sm"
                style="p-0 h-auto text-muted-foreground"
                onClick={() => {}}
                label={
                  <>
                    <FaMessage size={18} />
                    <span className="ml-1 text-xs">{project.comments}</span>
                  </>
                }
              />
            </Tooltip>
          </div>

          <div className="flex items-center space-x-4">
            <Tooltip title="Share">
              <Button
                label={<FaShare size={18} />}
                variant="ghost"
                size="sm"
                style="p-0 h-auto text-muted-foreground"
                onClick={() => {}}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

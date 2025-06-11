'use client';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import Badge from './badge';
import Tooltip from './tooltip';
import Button from './button';
import { FaMessage, FaRocket, FaShare } from 'react-icons/fa6';

interface ProjectCardProps {
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
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(project.likes || 0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <article
      ref={elementRef}
      className="flex flex-col justify-between rounded-lg overflow-hidden shadow-sm border border-border animate-fade-in post-animation"
    >
      <div>
        {/* Project Image */}
        <div className="relative cursor-pointer" onClick={() => setIsDetailsOpen(true)}>
          <Image
            loading="lazy"
            src={project.img}
            alt={project.name}
            className="w-full aspect-video object-cover"
            width={width}
            height={width}
          />
          <div className="absolute top-4 right-4">
            {project.deployed && <Badge label="Deployed" style="bg-primary text-foreground" />}
          </div>
        </div>

        {/* Project Info */}
        <div className="px-4 pt-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3
                className="font-medium text-lg line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                onClick={() => setIsDetailsOpen(true)}
              >
                {project.name}
              </h3>
              <span className="text-xs text-text">{project.commits} commits</span>
            </div>

            <p className="text-sm text-text/80 line-clamp-2 mb-4">{project.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStacks.map((tech) => (
                <Badge key={tech} label={tech} variant="outline" style="text-xs bg-secondary/50" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between pt-2 pl-2 border-t border-border">
        <div className="flex items-center space-x-4">
          {/* TODO: fazer variants para o tooltip */}
          <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
            <Button
              label={
                <>
                  <FaRocket
                    size={18}
                    className={isLiked ? 'fill-accent text-accent' : 'text-text/80'}
                  />
                  <span className="ml-1 text-xs">{likeCount}</span>
                </>
              }
              variant="link"
              size="sm"
              style="proj-button"
              onClick={() => setIsLiked(!isLiked)}
            />
          </Tooltip>

          <Tooltip title="Coment">
            <Button
              variant="link"
              size="sm"
              style="proj-button"
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

        <div className="flex items-center px-4 pb-4">
          <Tooltip title="Share">
            <Button
              label={<FaShare size={18} />}
              variant="link"
              size="sm"
              style="proj-button"
              onClick={() => {}}
            />
          </Tooltip>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

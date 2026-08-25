'use client';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState, useTransition } from 'react';
import Badge from './ui/badge';
import Tooltip from './ui/tooltip';
import Button from './ui/button';
import { FaMessage, FaRocket, FaShare } from 'react-icons/fa6';
import ProjectDetailsModal from './project-details';
import ProjectsModel from '@/types/projects';
import { useAuth } from '@/lib/providers/auth-provider';
import { toggleLike } from '@/lib/actions/interactions';
import { useUserStore } from '@/lib/store/user-store';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/toast';

interface ProjectCardProps {
  project: ProjectsModel;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const t = useTranslations('Projects');
  const showToast = useToast();
  const { user, showAuthModal } = useAuth();
  const elementRef = useRef<HTMLDivElement>(null);
  // Estado otimista para o Like (Feedback instantâneo)
  const [isPending, startTransition] = useTransition();
  const likedProjectIds = useUserStore((state) => state.likedProjectIds);
  const setPendingLike = useUserStore((state) => state.setPendingLike);
  const isLiked = likedProjectIds.includes(project.id);

  const [width, setWidth] = useState(0);

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

  const handleLikeClick = () => {
    if (!user) {
      setPendingLike(project.id);
      showAuthModal();
      return;
    }

    startTransition(async () => {
      try {
        await toggleLike(project.id);
      } catch (error) {
        console.error('Erro ao dar like:', error);
      }
    });
  };

  const handleShare = async () => {
    const projectLink = project.deployed && project.url ? project.url : project.gitRepo;
    const portfolioLink = window.location.origin;
    const textToShare = `${project.name}\n\n${t('shareMore')} ${portfolioLink}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: project.name,
          text: textToShare,
          url: projectLink,
        });
      } else {
        await navigator.clipboard.writeText(projectLink);
        showToast('success', t('linkCopied'));
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      await navigator.clipboard.writeText(projectLink);
      showToast('success', t('linkCopied'));
    }
  };

  return (
    <article
      ref={elementRef}
      className="flex flex-col justify-between rounded-lg overflow-hidden shadow-sm border border-border animate-fade-in post-animation max-w-sm"
    >
      <div>
        {/* Project Image */}
        <div className="relative cursor-pointer" onClick={() => setIsDetailsOpen(true)}>
          <Image
            loading="lazy"
            src={project.imgThumb}
            alt={project.name}
            className="w-full aspect-video object-cover"
            width={width}
            height={width}
          />
          <div className="absolute top-4 right-4">
            {project.deployed && <Badge label={t('deployed')} style="bg-primary text-foreground" />}
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
              <span className="text-xs text-text">
                {project.commits} {t('commits')}
              </span>
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
          <Tooltip title={isLiked ? t('tooltipUnlike') : t('tooltipLike')}>
            <Button
              label={
                <>
                  <FaRocket
                    size={18}
                    className={
                      isLiked
                        ? 'fill-accent text-accent'
                        : `${isPending ? 'animate-pulse text-primary' : 'text-text/80'}`
                    }
                  />
                  <span className="ml-1 text-xs">{project.likes}</span>
                </>
              }
              variant="link"
              size="sm"
              style="proj-button"
              onClick={handleLikeClick}
            />
          </Tooltip>

          <Tooltip title={t('tooltipComment')}>
            <Button
              variant="link"
              size="sm"
              style="proj-button"
              onClick={() => setIsDetailsOpen(true)}
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
          <Tooltip title={t('tooltipShare')}>
            <Button
              label={<FaShare size={18} />}
              variant="link"
              size="sm"
              style="proj-button"
              onClick={handleShare}
            />
          </Tooltip>
        </div>
      </div>

      <ProjectDetailsModal
        imgWidth={width}
        project={project}
        setVisible={setIsDetailsOpen}
        visible={isDetailsOpen}
      />
    </article>
  );
};

export default ProjectCard;

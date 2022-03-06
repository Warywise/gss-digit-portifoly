import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectPostProps {
  name: string, img: string, url: string, gitRep: string,
}

const ProjectPost: FC<PropsWithChildren<ProjectPostProps>> = (props) => {
  return (
    <article className='project-post-card'>
      <h2>{props.name}</h2>
      <span className='project-img'>
        <Image
          loader={() => props.img}
          src={props.img}
          alt={`Project ${props.name} DEMO`}
          width='2'
          height='1'
          layout='responsive'
        />
      </span>
      <hr></hr>
      <div className='project-post-buttons'>
        <button
          type='button'
          onClick={() => global.alert('Obrigado!')}
        >
          Apoiar
        </button>
        <a href={props.url} target='_blank'>
          <button type='button'>
            Visitar Site
          </button>
        </a>
        <a href={props.gitRep} target='_blank'>
          <button type='button'>
            Repositório
          </button>
        </a>
      </div>
    </article>);
}

export default ProjectPost;

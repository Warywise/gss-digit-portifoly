import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
// import Link from 'next/link';
import { BiRocket } from 'react-icons/bi';
import { CgWebsite } from 'react-icons/cg';
import { AiOutlineFileSearch } from 'react-icons/ai';

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
          <BiRocket className='button-icon' />
          Apoiar
        </button>
        <a href={props.url} target='_blank'>
          <CgWebsite className='button-icon' />
          Visitar Site
        </a>
        <a href={props.gitRep} target='_blank'>
        <AiOutlineFileSearch className='button-icon' />
          Detalhes
        </a>
      </div>
    </article>);
}

export default ProjectPost;

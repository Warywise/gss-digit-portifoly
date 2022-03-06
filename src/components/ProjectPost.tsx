import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectPostProps {
  name: string, img: string, url: string, gitRep: string,
}

const ProjectPost: FC<PropsWithChildren<ProjectPostProps>> = (props) => {
  return (
    <article
      className='bg-stone-200 rounded grid justify-center gap-2 my-6 w-fit p-4'
    >
      <h2>{props.name}</h2>
      <Image
        loader={() => props.img}
        src={props.img}
        alt={`Project ${props.name} DEMO`}
        width='400'
        height='200'
      />
      <div className='flex justify-around'>
        <button
          type='button'
          onClick={() => global.alert('Obrigado!')}
          className='bg-stone-100 rounded-md font-medium shadow px-2 py-1'>
          Apoiar
        </button>
        <a href={props.url} target='_blank'>
          <button
            type='button'
            className='bg-stone-100 rounded-md font-medium shadow px-2 py-1'
          >
            Visitar Site
          </button>
        </a>
        <a href={props.gitRep} target='_blank'>
          <button
            type='button'
            className='bg-stone-100 rounded-md font-medium shadow px-2 py-1'
          >
            Repositório
          </button>
        </a>
      </div>
    </article>);
}

export default ProjectPost;

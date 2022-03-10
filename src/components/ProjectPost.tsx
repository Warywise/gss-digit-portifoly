import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Image from 'next/image';
// import Link from 'next/link';
import { BiRocket } from 'react-icons/bi';
import { CgWebsite } from 'react-icons/cg';
import { AiOutlineFileSearch } from 'react-icons/ai';

import HandleLocalStorage from '../helpers/SetLocalStore';

// import Cookies from '../helpers/';

interface ProjectPostProps {
  name: string, img: string, url: string, gitRep: string,
};

const ProjectPost: FC<PropsWithChildren<ProjectPostProps>> = (props) => {
  const [likesCount, setLikesCount] = useState(0);
  const [alreadyLike, setAlreadyLike] = useState(false);

  const LocalStore = new HandleLocalStorage('sants-portifoly-projects-anonimousUser');

  useEffect(() => {
    // fetch('projects')

    if (LocalStore.verify()) {
      const storageContent = LocalStore.get()
        .find(({ projectName }) => projectName === props.name);

      if (storageContent) {
        const newStorage = LocalStore.get()
          .filter(({ projectName }) => projectName !== props.name);
        
        newStorage.push({ projectName: props.name, updated: true })
        LocalStore.set(newStorage);
        setAlreadyLike(true);
      }
    }

    // setLikesCount();
  }, [])
  

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
      { likesCount }
      <hr />
      <div className='project-post-buttons'>
        <button
          type='button'
          onClick={() => dispatch({ type: 'INC', payload: props.name })}
        >
          <BiRocket className='button-icon' />
          Apoiar
        </button>
        <a href={props.url} target='_blank'>
          <CgWebsite className='button-icon' />
          Visitar
        </a>
        <a href={props.gitRep} target='_blank'>
        <AiOutlineFileSearch className='button-icon' />
          Detalhes
        </a>
      </div>
    </article>);
}

export default ProjectPost;

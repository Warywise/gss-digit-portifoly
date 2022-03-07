import { NextComponentType } from 'next';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import SocialIcon from './SocialIcon';
import Image from 'next/image';

const ProfileCard: NextComponentType = () => {
  return (
    <div className="profile-card">
      <span className="profile-image">
        <Image
          src="/gust-sant.jpg"
          alt="Gustavo Sant'Anna"
          layout='fill'
          objectFit='cover'
          objectPosition='50% 75%'
        />
      </span>
      <div className="profile-card-content">
        <h2>Gustavo Sant'Anna</h2>
        <h4>Desenvolvedor Web FullStack Jr</h4>
      </div>
      <div className="profile-card-social">
        <a href="https://github.com/Warywise" target="_blank">
          <SocialIcon
            Component={FaGithubSquare} iconName={'GitHub'} bgColor="bg-orange-600"
          />
        </a>
        <a href="https://www.linkedin.com/in/g-s-s/" target="_blank">
          <SocialIcon
            Component={FaLinkedin} iconName={'LinkedIn'} bgColor="bg-blue-600"
          />
        </a>
        <a href="mailto:g_santanna@outlook.com?subject=PortifolyFeedback">
          <SocialIcon
            Component={BiMailSend} iconName={'Email'} bgColor="bg-emerald-600"
          />
        </a>
      </div>
    </div>
  );
}

export default ProfileCard;

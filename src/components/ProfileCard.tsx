import { NextComponentType } from 'next';
import Image from 'next/image';

const ProfileCard: NextComponentType = () => {
  return (
    <div className="profile-card">
      <Image
        src="/gust-sant.jpeg"
        className="profile-image"
        alt="Gustavo Sant'Anna"
        width="150px"
        height="150px"
      />
      <h2>Gustavo Sant'Anna</h2>
      <h4>Desenvolvedor Web FullStack Jr</h4>
      <a href="https://github.com/Warywise" target="_blank">GitHub</a>
      <a href="https://www.linkedin.com/in/g-s-s/" target="_blank">LinkedIn</a>
      <a href="mailto:g_santanna@outlook.com?subject=PortifolyFeedback">Envie um Email</a>
    </div>
  );
}

export default ProfileCard;

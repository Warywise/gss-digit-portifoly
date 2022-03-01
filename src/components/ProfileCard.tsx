import { NextComponentType } from 'next';

const ProfileCard: NextComponentType = () => {
  return (
    <div className="profile-card">
      <span className="profile-image">
        <img
          src="/gust-sant.jpeg"
          className="image"
          alt="Gustavo Sant'Anna"
          />
        </span>
      <h2>Gustavo Sant'Anna</h2>
      <h4>Desenvolvedor Web FullStack Jr</h4>
      <a href="https://github.com/Warywise" target="_blank">GitHub</a>
      <a href="https://www.linkedin.com/in/g-s-s/" target="_blank">LinkedIn</a>
      <a href="mailto:g_santanna@outlook.com?subject=PortifolyFeedback">Envie um Email</a>
    </div>
  );
}

export default ProfileCard;

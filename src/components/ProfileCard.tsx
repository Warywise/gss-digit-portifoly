import { NextComponentType } from 'next';

const ProfileCard: NextComponentType = () => {
  return (
    <div className="profile-card">
      <span className="profile-image">
        <img src="/gust-sant.jpeg" className="image" alt="Gustavo Sant'Anna" />
      </span>
      <div className="profile-card-content">
        <h2>Gustavo Sant'Anna</h2>
        <h4>Desenvolvedor Web FullStack Jr</h4>
      </div>
      <div className="profile-card-social">
        <a href="https://github.com/Warywise" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/g-s-s/" target="_blank">LinkedIn</a>
        <a href="mailto:g_santanna@outlook.com?subject=PortifolyFeedback">Envie um Email</a>
      </div>
    </div>
  );
}

export default ProfileCard;

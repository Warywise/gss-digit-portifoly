import Image from 'next/image';
import Button from './ui/button';
import { redirect } from 'next/navigation';

const Profile = () => {
  return (
    <section className="w-full">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-4">
          {/* Avatar */}
          <div className="relative contain-content rounded-full size-[12em] inset-ring ring-2 ring-muted shadow-lg/30 shadow-foreground">
            <Image src="/profile_pic.png" alt="Gustavo Sant'Anna" fill objectFit="cover" />
          </div>

          <div className="flex-1 text-center md:text-left">
            {/* Name and title */}
            <h1 className="text-2xl font-bold mb-1">{"Gustavo Sant'Anna"}</h1>
            <p className="text-subtitle mb-2">Fullstack Developer</p>

            {/* Bio */}
            <p className="mb-4 max-w-md">
              Passionate developer with 3+ years of experience building modern web and mobile
              applications. Specializing in TypeScript, React and NodeJs.
            </p>

            {/* Action button */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Button label="Contact" onClick={() => redirect('/contact')} style="rounded-full!" />
            </div>
          </div>

          {/* Stats */}
          <div className="border-t-2 md:border-t-0 md:border-l-2 border-border pt-4 md:pt-0 md:pl-6 grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{9}+</p>
              <p className="text-sm text-subtitle">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{958}+</p>
              <p className="text-sm text-subtitle">Commits</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{9999}+</p>
              <p className="text-sm text-subtitle">Cofees</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

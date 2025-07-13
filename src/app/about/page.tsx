// import Button from '@/components/ui/button';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">About Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Column */}
        <div className="md:col-span-1">
          <article className="flex flex-col justify-between rounded-lg overflow-hidden shadow-sm border border-border animate-fade-in post-animation max-w-sm">
            <div className="bg-primary/10 pt-8 pb-4 px-4 text-center">
              <div className="relative contain-content rounded-full size-[12em] inset-ring shadow-lg/30 shadow-foreground">
                <Image src="/profile_pic.png" alt="Gustavo Snat'Anna" fill objectFit="cover" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{'profile.name'}</h2>
              <p className="text-muted-foreground">{'profile.title'}</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                  <p>San Francisco, CA</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                  <p>alex@example.com</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Languages</h3>
                  <p>English (Native), Spanish (Conversational)</p>
                </div>

                {/* <Button className="w-full">Download Resume</Button> */}
              </div>
            </div>
          </article>
        </div>

        {/* Content Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Bio Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Biography</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                I'm a passionate full-stack developer with over 5 years of experience building web
                and mobile applications. My journey in tech started with a computer science degree,
                followed by roles at startups and established tech companies.
              </p>
              <p className="mb-4">
                I specialize in React, TypeScript, and modern cloud architectures. I enjoy solving
                complex problems and creating intuitive user experiences. When I'm not coding, you
                can find me hiking, reading sci-fi novels, or experimenting with new cooking
                recipes.
              </p>
              <p>
                I'm always open to discussing new projects and opportunities. Feel free to reach out
                if you'd like to collaborate or just have a chat about technology!
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">Frontend</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>React & React Native</li>
                  <li>TypeScript</li>
                  <li>Next.js</li>
                  <li>Tailwind CSS</li>
                  <li>Redux</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">Backend</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>Python</li>
                  <li>Django</li>
                  <li>RESTful APIs</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">Database</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>MongoDB</li>
                  <li>PostgreSQL</li>
                  <li>Firebase</li>
                  <li>Redis</li>
                  <li>GraphQL</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">DevOps</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Docker</li>
                  <li>Kubernetes</li>
                  <li>CI/CD</li>
                  <li>AWS</li>
                  <li>Vercel</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">Tools</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Git & GitHub</li>
                  <li>Jira</li>
                  <li>Figma</li>
                  <li>VS Code</li>
                  <li>Postman</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-2">Soft Skills</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Team Leadership</li>
                  <li>Agile Methodology</li>
                  <li>Problem Solving</li>
                  <li>Communication</li>
                  <li>Mentoring</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>

            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Senior Frontend Developer</h3>
                  <span className="text-sm text-muted-foreground">2022 - Present</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">TechCorp Inc.</p>
                <p className="text-sm">
                  Led the frontend team in developing a SaaS platform with React and TypeScript.
                  Improved performance by 40% and implemented CI/CD workflows.
                </p>
              </div>

              <div className="border-l-2 border-muted pl-4 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Full Stack Developer</h3>
                  <span className="text-sm text-muted-foreground">2019 - 2022</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">InnovateSoft</p>
                <p className="text-sm">
                  Developed and maintained multiple client applications using React, Node.js, and
                  MongoDB. Collaborated with design teams to implement responsive UI/UX.
                </p>
              </div>

              <div className="border-l-2 border-muted pl-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Junior Developer</h3>
                  <span className="text-sm text-muted-foreground">2017 - 2019</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">StartupHub</p>
                <p className="text-sm">
                  Built features for a mobile app using React Native. Integrated RESTful APIs and
                  implemented user authentication flows.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

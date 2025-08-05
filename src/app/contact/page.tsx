'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Link from 'next/link';
import { JSX, useState } from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapLocationDot,
  FaWhatsapp,
} from 'react-icons/fa6';

const Card = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <article className="rounded-lg inset-ring ring-muted bg-muted/30 shadow-sm/30 shadow-foreground">
    {children}
  </article>
);

const CardContent = ({
  style,
  children,
}: {
  style?: string;
  children: JSX.Element | JSX.Element[];
}) => <div className={`p-6 ${style}`}>{children}</div>;

const InfoCard = ({ icon, title, label }: { icon: JSX.Element; title: string; label: string }) => (
  <>
    <div className="w-12 h-12 rounded-full text-primary bg-primary/10 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-subtitle">{label}</p>
    </div>
  </>
);

const SocialItem = ({ icon, link }: { link: string; icon: JSX.Element }) => (
  <Link
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-hover hover:bg-primary hover:text-muted transition-colors"
  >
    {icon}
  </Link>
);

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactUsPage = () => {
  // const { toast } = useToast();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // toast({
      //   title: 'Message sent!',
      //   description: "Thank you for your message. I'll get back to you soon.",
      // });
      setFormState(INITIAL_STATE);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Let&apos;s Connect</h2>
          <p className="text-subtitle">
            Have a project in mind or just want to say hello? Fill out the form and I&apos;ll get
            back to you as soon as possible.
          </p>

          <div className="space-y-4 mt-8">
            <Card>
              <CardContent style="flex items-center space-x-4">
                <InfoCard
                  icon={<FaEnvelope size={18} />}
                  title="Email"
                  label="g_santanaa@outlook.com"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent style="flex items-center space-x-4">
                <InfoCard
                  icon={<FaEnvelope size={18} />}
                  title="Phone"
                  label="55 (21) 97249-9255"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent style="flex items-center space-x-4">
                <InfoCard
                  icon={<FaMapLocationDot size={18} />}
                  title="Location"
                  label="Nova Iguaçu, Rio de Janeiro"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-medium mb-3">Connect on Social Media</h3>
                <div className="flex space-x-4">
                  <SocialItem
                    icon={<FaLinkedin size={18} />}
                    link="https://www.linkedin.com/in/g-s-s"
                  />
                  <SocialItem icon={<FaGithub size={18} />} link="https://github.com/Warywise" />
                  <SocialItem
                    icon={<FaWhatsapp size={18} />}
                    link="https://wa.me/5521972499255?text=Hello%20Gustavo!%20👋"
                  />
                  <SocialItem
                    icon={<FaInstagram size={18} />}
                    link="https://www.instagram.com/gustavo.santnn"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="grid space-y-6">
          <Card>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Send a message</h3>
              <p className="text-sm text-muted-foreground">
                Fill out the form below to get in touch with me.
              </p>
            </div>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="custom-textarea"
                    required
                  />
                </div>

                <Button
                  label={isSubmitting ? 'Sending...' : 'Send Message'}
                  type="submit"
                  style="w-full"
                  disabled={false}
                />
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default ContactUsPage;

import { useState } from 'react';
import Button from './ui/button';
import { Card, CardContent } from './ui/card';
import Input from './ui/input';
import { useToast } from './ui/toast';

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactUsForm = () => {
  const toastMessage = useToast();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({ type: 'form', body: formState }),
      });

      if (!result.ok) {
        toastMessage('error', 'Failed to send message. Try again later.');
        throw new Error('Failed to send message', { cause: result.statusText });
      }
    } catch (err) {
      console.error('Error sending email: ', err);
      return;
    } finally {
      setIsSubmitting(false);
    }

    setFormState(INITIAL_STATE);
    toastMessage('success', 'Message sent successfully!');
  };

  return (
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
  );
};

export default ContactUsForm;

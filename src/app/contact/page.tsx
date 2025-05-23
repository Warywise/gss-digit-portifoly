import Link from 'next/link';

const ContactUsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>Contact Us</h1>
      <p>
        If you have any questions or comments, feel free to reach out to us at{' '}
        <Link href="mailto:g_santanna@outlook.com">
          <span className="text-blue-500 hover:underline">Send an email</span>
        </Link>
      </p>
      <p>
        You can also find us on{' '}
        <Link href="https://linkedin.com/in/g-s-s">
          <span className="text-blue-500 hover:underline">LinkedIn</span>
        </Link>
      </p>
    </div>
  );
};

export default ContactUsPage;

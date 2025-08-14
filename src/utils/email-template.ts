interface FormTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const FormEmailTemplate = ({ name, email, subject, message }: FormTemplateProps) =>
  `<div>
    <h1>New Contact Form Submission</h1>
    <p>
      <strong>Name:</strong> ${name}
    </p>
    <p>
      <strong>Email:</strong> ${email}
    </p>
    <p>
      <strong>Subject:</strong> ${subject}
    </p>
    <p>
      <strong>Message:</strong>
      <p style="padding: 8px; background: rgba(0, 0, 0, 0.1);">
        <code>${message}</code>
      </p>
    </p>
  </div>`;

export { FormEmailTemplate };

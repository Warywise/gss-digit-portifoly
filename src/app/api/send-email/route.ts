import { FormEmailTemplate } from '@/utils/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { type, body } = await req.json();
  let message = '<h3>New Contact Form Submission</h3><p>Missing details</p>';

  if (type === 'form') {
    message = FormEmailTemplate(body || {});
  } else {
    return Response.json({ error: 'Invalid request type' }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: 'Gss Digit <onboarding@resend.dev>',
    to: ['g_santanna@outlook.com'],
    subject: `New Contact on Gss Digit Portifolio - Type: ${type}`,
    html: message,
  });

  if (error) {
    console.log({ data, error });
    return Response.json({ error }, { status: 500 });
  }

  return Response.json(data);
}

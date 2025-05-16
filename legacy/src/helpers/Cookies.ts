import Cookie from "js-cookie";

const Cookies = Cookie
  .withAttributes({
    domain: 'sants-page.vercel.app',
    secure: process.env.NODE_ENV === 'production',
    expires: 3,
  });

export default Cookies;

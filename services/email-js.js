import { send as sendEmail } from 'emailjs-com';

const CONFIG = {
  SERVICE_ID: 'nir_g_suite',
  USER_ID: 'user_B2olhGaEdFk0PBurdMa1A',
  TEMPLATES: {
    CONTACT: 'contact-from-website'
  }
};

const send = ({ email }) => {
  return sendEmail(
    CONFIG.SERVICE_ID,
    CONFIG.TEMPLATES.CONTACT,
    {
      email
    },
    CONFIG.USER_ID
  );
};

export default {
  send
};

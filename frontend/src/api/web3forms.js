import { BUDGET_OPTIONS } from '../utils/constants';
import { serviceLabel } from '../utils/format';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export async function submitInquiry(values, options = {}) {
  const accessKey = String(options.accessKey ?? import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim();
  if (!accessKey) {
    throw new Error('The enquiry form is not configured yet. Please try again later.');
  }

  const serviceTitle = serviceLabel(values.requiredService);
  const budgetLabel = BUDGET_OPTIONS.find((item) => item.value === values.budgetRange)?.label || values.budgetRange;
  const request = options.fetch ?? fetch;

  const response = await request(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `NOVIQ inquiry: ${serviceTitle}`,
      from_name: values.fullName,
      name: values.fullName,
      email: values.email,
      phone: values.phone || 'Not provided',
      company: values.companyName || 'Not provided',
      service: serviceTitle,
      budget: budgetLabel,
      deadline: values.expectedDeadline || 'Not provided',
      reference: values.referenceUrl || 'Not provided',
      message: values.projectDescription,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'We could not send the inquiry. Please try again.');
  }
  return { message: 'Your inquiry has been received.' };
}

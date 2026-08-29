import { submitInquiry } from './web3forms';

describe('submitInquiry', () => {
  it('posts to Web3Forms instead of the Spring Boot API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const result = await submitInquiry({
      fullName: 'Aisha Perera',
      email: 'aisha@example.com',
      phone: '',
      companyName: '',
      requiredService: 'web-application-development',
      budgetRange: 'UNDER_1500',
      expectedDeadline: '',
      referenceUrl: '',
      projectDescription: 'Need a clinic booking workflow.',
    }, {
      accessKey: 'test-access-key',
      fetch: fetchMock,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.web3forms.com/submit');
    expect(String(fetchMock.mock.calls[0][0])).not.toContain('localhost');
    expect(String(fetchMock.mock.calls[0][0])).not.toContain('8080');
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.access_key).toBe('test-access-key');
    expect(result.message).toMatch(/received/i);
  });

  it('does not submit when the access key is missing', async () => {
    const fetchMock = vi.fn();
    await expect(submitInquiry({
      fullName: 'Aisha Perera',
      email: 'aisha@example.com',
      requiredService: 'web-application-development',
      budgetRange: 'UNDER_1500',
      projectDescription: 'Need a clinic booking workflow.',
    }, { accessKey: '', fetch: fetchMock })).rejects.toThrow(/not configured/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

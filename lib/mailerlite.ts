/**
 * MailerLite API Client
 * Komunikuje się z Cloudflare Workerem, który obsługuje MailerLite API
 */

const WORKER_URL = 'https://mailerlite-api.kacperczaczyk.workers.dev/';

export interface SubscribeParams {
  email: string;
  groupId: string;
  name?: string;
  fields?: Record<string, string>;
}

export interface SubscribeResponse {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  subscriber?: {
    id: string;
    email: string;
  };
}

/**
 * Zapisuje użytkownika do newslettera poprzez Cloudflare Worker
 */
export async function subscribeToNewsletter(
  params: SubscribeParams
): Promise<SubscribeResponse> {
  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: params.email,
        groupId: params.groupId,
        name: params.name,
        fields: params.fields || {},
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Wystąpił błąd podczas zapisywania',
        code: data.code,
      };
    }

    return data;
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      error: 'Wystąpił błąd połączenia. Spróbuj ponownie.',
      code: 'NETWORK_ERROR',
    };
  }
}

/**
 * Group IDs dla różnych kampanii
 */
export const MAILERLITE_GROUPS = {
  LEAD_MAGNET: '167646651634157384', // Strona z lead magnet
  EXIT_INTENT: '167646643611502076', // Fragment/exit intent popup
} as const;

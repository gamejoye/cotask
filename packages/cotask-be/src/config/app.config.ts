export interface AppConfig {
  deepseek: {
    apiKey: string;
    baseURL: string;
  };
}

export const AppConfig = (): AppConfig => ({
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
  },
});

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.325384bbbeb94029b84a55c7110ecaa9',
  appName: 'calm-pulse-react',
  webDir: 'dist',
  server: {
    url: 'https://325384bb-beb9-4029-b84a-55c7110ecaa9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      backgroundColor: '#f8fafc'
    }
  }
};

export default config;
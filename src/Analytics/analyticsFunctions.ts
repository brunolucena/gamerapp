import analytics from '@react-native-firebase/analytics';

export async function logEvent(event: string, data?: object) {
  await analytics().logEvent(event, data);
}

export async function onSignIn(userId: string, name: string, email: string) {
  await Promise.all([
    analytics().setUserId(userId),
    analytics().setUserProperties({
      name,
      email,
    }),
  ]);
}

export async function onSignOut() {
  await analytics().resetAnalyticsData();
}

export async function setUserProperties(properties: {[key: string]: any}) {
  await analytics().setUserProperties(properties);
}

export async function trackScreenView(screen: string) {
  await analytics().setCurrentScreen(screen, screen);
}

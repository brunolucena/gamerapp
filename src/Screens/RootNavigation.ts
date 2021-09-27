import * as React from 'react';

export const navigationRef = React.createRef<any>();

export function canGoBack(): boolean {
  return navigationRef.current?.canGoBack();
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

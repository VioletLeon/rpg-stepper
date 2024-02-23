import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export function GET(request: ExpoRequest) {
  return ExpoResponse.json({
    message: 'Hello, world!',
  });
}

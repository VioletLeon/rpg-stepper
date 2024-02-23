import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export function GET(request: ExpoRequest) {
  console.log('HIT');
  return ExpoResponse.json({
    message: 'Hello, world!',
  });
}

// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  NEXT_PUBLIC_FIREBASE_API_KEY: 'test-api-key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'test-project-id',
}; 
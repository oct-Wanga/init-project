import '@testing-library/jest-dom';

// 예시: window.scrollTo mock
Object.defineProperty(global, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

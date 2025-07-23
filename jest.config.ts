import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // alias 경로 매핑
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@datalab/(.*)$': '<rootDir>/src/app/datalab/$1',
    '^@hooks/(.*)$': '<rootDir>/src/app/_hook/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@api/(.*)$': '<rootDir>/src/app/_api/$1',
    '^@type/(.*)$': '<rootDir>/src/type/$1',
    '^@component/(.*)$': '<rootDir>/src/app/_components/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@service/(.*)$': '<rootDir>/src/service/$1',
    // 정적 파일 mock
    '\\.(jpg|jpeg|png|gif|webp|avif|ico|bmp)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(svg)$': '<rootDir>/__mocks__/svgrMock.ts',

    // CSS/SCSS 처리
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};

module.exports = createJestConfig(customJestConfig);

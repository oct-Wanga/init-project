// svg-sprite-loader 플러그인 import
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin.js';

// 최적화 관련 플러그인 import (JS, CSS 압축용)
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode 설정
  reactStrictMode: false, // 개발 중 불필요한 double-render 방지

  // Next.js의 swc 기반 빌드 최적화 기능 활성화
  swcMinify: true,

  // API rewrite
  async rewrites() {
    return [
      {
        source: '/api/account/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_DOMAIN}/account/:path*`,
      },
    ];
  },

  // Webpack 커스터마이징
  webpack(config, { isServer, dev }) {
    // 1. 기존 svg 파일에 대한 로더 제거
    const fileLoaderRule = config.module.rules.find(rule => {
      return rule.test instanceof RegExp && rule.test.test('.svg');
    });

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // 2. production 환경에서 코드 압축 플러그인 추가
    if (!dev) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: { drop_console: true }, // 콘솔 로그 삭제
          },
        }),
        new CssMinimizerPlugin(), // CSS 압축
      );
    }

    // 3. svg 파일 새 로딩 규칙 추가
    config.module.rules.push({
      test: /\.svg$/i, // svg 파일만 타겟
      oneOf: [
        {
          // import 시 ?raw 쿼리가 붙으면 raw-loader 적용
          // ex) import icon from './x.svg?raw';
          resourceQuery: /raw/,
          use: 'raw-loader',
        },
        {
          // 그 외 svg 파일은 sprite로 묶어서 처리
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true, // 별도 sprite 파일로 추출
                spriteFilename: 'sprite.svg', // 추출된 파일명
                symbolId: 'icon-[name]', // 각 아이콘 id 패턴
              },
            },
          ],
        },
      ],
    });

    // 4. svg-sprite-loader용 플러그인 등록
    config.plugins.push(new SpriteLoaderPlugin({ plainSprite: true }));

    // 5. 최종 config 반환
    return config;
  },
};

export default nextConfig;

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 헬스 체크는 무조건 통과
  if (pathname === '/health') return NextResponse.next();
}

// 적용 될 페이지 URL
export const config = {
  // matcher: ['/home'],
};

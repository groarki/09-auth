import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';
import { parse } from 'cookie';

const privateRoutes = ['/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute && accessToken) {
    return NextResponse.next();
  }

  if (isPrivateRoute && !accessToken) {
    if (refreshToken) {
      try {
        const response = await checkServerSession();
        const setCookies = response.headers['set-cookie'];

        if (setCookies) {
          const cookiesArray = Array.isArray(setCookies) ? setCookies : [setCookies];
          for (const newCookieStr of cookiesArray) {
            const parsedCookie = parse(newCookieStr);
            const options = {
              path: parsedCookie.Path,
              maxAge: Number(parsedCookie['Max-Age']),
              expires: parsedCookie.Expires ? new Date(parsedCookie.Expires) : undefined,
              httpOnly: true,
              secure: true,
            };
            if (parsedCookie.accessToken) {
              cookieStore.set('accessToken', parsedCookie.accessToken, options);
            }
            if (parsedCookie.refreshToken) {
              cookieStore.set('refreshToken', parsedCookie.refreshToken, options);
            }
          }
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
      } catch {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl.origin));
      }
    }
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl.origin));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

  if (isPublicRoute && !accessToken) {
    if (refreshToken) {
      try {
        const response = await checkServerSession();
        const setCookies = response.headers['set-cookie'];

        if (setCookies) {
          const cookiesArray = Array.isArray(setCookies) ? setCookies : [setCookies];
          for (const newCookieStr of cookiesArray) {
            const parsedCookie = parse(newCookieStr);
            const options = {
              path: parsedCookie.Path,
              maxAge: Number(parsedCookie['Max-Age']),
              expires: parsedCookie.Expires ? new Date(parsedCookie.Expires) : undefined,
              httpOnly: true,
              secure: true,
            };
            if (parsedCookie.accessToken) {
              cookieStore.set('accessToken', parsedCookie.accessToken, options);
            }
            if (parsedCookie.refreshToken) {
              cookieStore.set('refreshToken', parsedCookie.refreshToken, options);
            }
          }
          return NextResponse.redirect(new URL('/', request.nextUrl.origin), {
            headers: { Cookie: cookieStore.toString() },
          });
        }
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/profile', '/sign-in', '/sign-up'],
};

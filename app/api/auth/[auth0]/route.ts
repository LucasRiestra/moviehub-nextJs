// app/api/auth/[...nextauth].js
import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export default handleAuth({
    login: handleLogin({
        authorizationParams: {
          audience: "http://localhost:4001/"
        },
        returnTo: "/home"
      }),
      logout: handleLogout({
        returnTo: '/home',
      }),
});
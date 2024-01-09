import { getSession } from '@auth0/nextjs-auth0';
import "../Login/login.css";

async function Login () {
  const  session  = await getSession();
  return (
    <div className='login-container'>
      <p>Welcome to:</p>
      <h1 className="login-title">CineXpress</h1>
      <button className="button-login">
      <a href="/api/auth/login">LogIn</a>
      </button>
    </div>
  );
}

export default Login;

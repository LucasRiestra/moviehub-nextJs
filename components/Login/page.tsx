import { getSession } from '@auth0/nextjs-auth0';
import "../Login/Login.css";


async function Login () {
  const  session  = await getSession();
  console.log(session);
  return (
    <div className='login-container'>
      <h1 className="login-title">CineXpress</h1>
      <button className="button-login">
      <a href="/api/auth/login">LogIn</a>
      </button>
    </div>
  );
}

export default Login;

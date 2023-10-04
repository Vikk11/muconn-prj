import React from 'react'
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-form">
      <form id="loginForm" method="POST">
          <label htmlFor="username">Username</label>
          <input name="username" type="text"/>
          <label htmlFor="password">Password</label>
          <input name="password" type="password"/>
          <button type="submit" className="btn-submit">Log in</button>
      </form>
    </div>
  )
}

export default Login
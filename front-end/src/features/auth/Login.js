import React from 'react'
import FullLogo from './FullKevlerLogo.png'

export default function Login() {
  return(
    <>
        <form class="table btnCenter" action="/login" method="post" name="loginForm">
        <div class="upperbox">
                <img src={FullLogo} alt=""/>
            </div>    
            <div class="lowerbox">
                <label for="username" class="text-1">username: </label>
                <input class="input-box" type="text" id="username" name="username"/>
                <label for="password" class="text-1">password: </label>
                <input class="input-box" type="password" id="password" name="password"/>
                <b><p type = 'error' id = 'loginError'></p></b>
                <button type="submit" id="login" class="btn-login">Login</button>
            </div>
        </form>
    </>
  )
}

export function loginTemplate(error = '') {
  return `
     <div class="login-container">
    <h1>Login</h1>
    <form id="login-form">
    <div>   
    <label for="email">Email:</label>
    <input type="email" id="email" required />
    </div>
    <div>
    <label for="password">Password:</label>
    <input type="password" id="password" required minlength="8" />
    </div>
    <button type="submit">Sign in</button>
    <p class="auth-switch">Don't have an account?<a href="#/register">Create one here</a></p>
    </form>
    <p>${error}</p>
    </div>
    `;
}

export function loginTemplate(error = '') {
  return `
  <main class="auth-page">
     <div class="login-container">
     <div class="main-content">
     <img src="/images/Posts/Rantr.svg" alt="Text of apps logo, Rantr" />
      <h1>Login user</h1>
      <i id="user-avatar" class="fa-solid fa-circle-user"></i>


    <form id="login-form" class="auth-form">
    <div class="input-group">
    <label for="email">Email:</label>
    <input type="email" id="email" required />
    </div>
   
   <div class="input-group">
    <label for="password">Password:</label>
    <input type="password" id="password" required minlength="8" />
    </div>

    

    <div class="login-link">
    <a href="#/register">Create an account here</a>
    </div>

    <button type="submit" class="submit-btn">Sign in</button>
    </form>
    ${error ? `<p>${error}</p>` : ''}
    </div>
    </div>
    </main>
    `;
}

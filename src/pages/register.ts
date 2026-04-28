import { registerUser } from '../api/auth';

export function renderRegister(container: HTMLElement) {
  container.innerHTML = `
    <main class="auth-page">
    <div class="login-container">

    <div class="main-content">
    <img src="/images/Posts/Rantr.svg" class="icon" alt="Text logo with app name Rantr" />
    <h1>Create account</h1>

    <form id="register-form" class="auth-form">
    <div class="input-group">
    <label for="reg-name">Username</label>
    <input type="text" id="reg-name" placeholder="Name (No spaces)" required/>
    </div>

    <div class="input-group">
    <label for="reg-email">Email</label>
    <input type="email" id="reg-email" placeholder="Email (@stud.noroff.no)" required/>
    </div>


    <div class="input-group">
    <label for="reg-password">Password</label>
    <input type="password" id="reg-password" placeholder="Min 8 characters" required/>
    </div>

    <div class="login-link">
    <a href="#/login">Sign in here</a>
      </div>
    
    <button type="submit" id="register-btn" class="submit-btn">Register</button>
        </form>
      </div>
      </div>
    </main>
    `;

  const form = container.querySelector('#register-form') as HTMLFormElement;
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = container.querySelector('#reg-name') as HTMLInputElement;
    const emailInput = container.querySelector('#reg-email') as HTMLInputElement;
    const passwordInput = container.querySelector('#reg-password') as HTMLInputElement;
    const registerBtn = container.querySelector('#register-btn') as HTMLButtonElement;

    try {
      registerBtn.disabled = true;
      registerBtn.textContent = 'Registering...';

      await registerUser(nameInput.value, emailInput.value, passwordInput.value);
      window.location.hash = '#/login';
    } catch (error: any) {
      console.error('Registration failed', error);
      registerBtn.disabled = false;
      registerBtn.textContent = 'Register';
    }
  });
}

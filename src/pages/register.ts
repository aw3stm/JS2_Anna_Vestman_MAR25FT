import { registerUser } from '../api/auth';

export function renderRegister(container: HTMLElement) {
  container.innerHTML = `
    <main class="auth-page">
    <div class="login-container">
    <h2>Create an account</h2>

    <form id="register-form" class="auth-form">
    <label for="reg-name">Username</label>
    <input type="text" id="reg-name" placeholder="Name (No spaces)" required/>

    <label for="reg-email">Email</label>
    <input type="email" id="reg-mail" placeholder="Email (@stud.noroff.no)" required/>

     <label for="reg-password">Password</label>
    <input type="password" id="reg-password" placeholder="Min 8 characters" required/>

    <button type="submit" id="register-btn" class="submit-btn">Register</button>
    </form>
    
    <p class="auth-switch">Already have an account? <a href="#/login">Log in here</a></p>

    </div>
    </main>
    `;

  const form = container.querySelector('#register-form') as HTMLFormElement;
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = container.querySelector('#reg-name') as HTMLInputElement;
    const emailInput = container.querySelector('#reg-mail') as HTMLInputElement;
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

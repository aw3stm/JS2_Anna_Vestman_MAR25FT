import { loginTemplate } from '../templates/loginTemplate.ts';
import { userLogin } from '../api/auth.ts';

export function renderLogin(container: HTMLDivElement | HTMLElement, errorMessage = '') {
  container.innerHTML = loginTemplate(errorMessage);

  const loginForm = document.querySelector('#login-form') as HTMLFormElement;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const submitBtn = loginForm.querySelector('.submit-btn') as HTMLButtonElement;

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing in...';

      await userLogin(email, password);
      window.location.hash = '#/feed';
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed. Please try again.';
      renderLogin(container, message);
    }
  });
}

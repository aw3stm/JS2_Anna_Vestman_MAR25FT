import { loginTemplate } from '../templates/loginTemplate.ts';
import { userLogin } from '../api/auth.ts';

export function renderLogin(container: HTMLDivElement) {
  container.innerHTML = loginTemplate();

  const loginForm = document.querySelector('#login-form') as HTMLFormElement;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      await userLogin(email, password);
      window.location.hash = '#/feed';
    } catch (error) {
      container.innerHTML = loginTemplate(error instanceof Error ? error.message : 'Login failed');

      renderLogin(container);
    }
  });
}

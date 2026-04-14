import { removeData } from '../utils/storage';

export function renderFeed(container: HTMLDivElement) {
  container.innerHTML = `
    <h1>Welcome to your feed!</h1>
        <p>You're logged in :)</p>
        <button id="logoutBtn">Logout</button>
    `;

  const btn = document.getElementById('logoutBtn');

  btn?.addEventListener('click', () => {
    removeData('token');
    removeData('profile');

    window.location.hash = '#/login';
  });
}

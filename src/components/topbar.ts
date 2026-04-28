export function topBar() {
  return `
    <header class="topBar">
    <button id="create-post"><i class="fa-solid fa-plus icon"></i></button>
    <img src="/images/Posts/Rantr.svg" id="rantr-home" alt="Main logo with the sites name" />
    <div class="user-actions">
    <button id="profile-btn"><i class="fa-solid fa-user icon"></i></button>
    <button id="logout-btn"><i class="fa-solid fa-right-from-bracket icon"></i></button>
    </div>
    </header>
    `;
}

export function topbarEvents() {
  const createBtn = document.querySelector('#create-post');
  const logoutBtn = document.querySelector('#logout-btn');
  const profileBtn = document.querySelector('#profile-btn');
  const homeBtn = document.querySelector('#rantr-home');

  createBtn?.addEventListener('click', () => {
    window.location.hash = '#/create';
  });

  homeBtn?.addEventListener('click', () => {
    window.location.hash = '#/feed';
  });

  profileBtn?.addEventListener('click', () => {
    window.location.hash = '#/profile';
  });

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    window.location.hash = '#/login';
  });
}

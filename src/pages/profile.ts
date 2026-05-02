import { load } from '../utils/storage';
import { usersProfile } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar, topbarEvents } from '../components/topbar';
import { footerNav } from '../components/footerNav';
import { postEvents } from '../components/postEvents';

export async function renderProfile(container: HTMLElement) {
  const queryString = window.location.hash.split('?')[1];
  const param = new URLSearchParams(queryString || '');
  const urlName = param.get('name');
  const profileData = load('profile');

  const targetName = urlName || profileData?.name;

  if (!targetName) {
    container.innerHTML = `<p>Couldn't load user profile. Please try again.</p>`;
    return;
  }

  container.innerHTML = `
    ${topBar()}
    <main id="main-content" class="feedContent profile-page">
    <div class="profile-header">
    <h2>${targetName}</h2>
    </div>
    <p class="loader">Loading posts...</p>
    </main>
    ${footerNav()}
    `;
  topbarEvents();

  const mainContent = container.querySelector('#main-content') as HTMLElement;
  try {
    const userPost = await usersProfile(targetName);
    const myProfile = targetName === profileData?.name;
    const backBtn = !myProfile
      ? `<a href="#/feed" class="back-link"><i class="fa-solid fa-arrow-left"></i> Back to feed</a>`
      : '';

    mainContent.innerHTML = `
        <div class="profile-header">
        <i id="profile-avatar" class="fa-solid fa-user-circle"></i>
        <h2>${targetName}</h2>
        ${backBtn}
        </div>
        ${feedTemplate(userPost, false)}
        `;
    postEvents(container);
  } catch (error) {
    console.error('Failed to load profile posts', error);
    mainContent.innerHTML = `
        <div class="profile-header">
        <h2>${targetName}</h2>
        </div>
        <p class="error-message">Failed to load posts. Please try again later.</p>
        `;
  }
}

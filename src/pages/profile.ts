import { load } from '../utils/storage';
import { usersProfile } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar } from '../components/topbar';
import { renderFeed } from './feed';

export async function renderProfile(container: HTMLElement) {
  const profileData = load('profile');

  if (!profileData || !profileData.name) {
    container.innerHTML = `<p>Couldn't load your profile page. Please try again later.</p>`;
    return;
  }

  container.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const homeBtn = target.closest('#rantr-home');

    if (homeBtn) {
      console.log('Clicked logo, back to start');
      renderFeed(container);
      return;
    }
  });

  container.innerHTML = `
    ${topBar()}
    <main id="main-content" class="feedContent profile-page">
    <div class="profile-header">
    <h2>${profileData.name}</h2>
    </div>
    <p class="loader">Loading your posts...</p>
    </main>
    `;

  const mainContent = container.querySelector('#main-content') as HTMLElement;

  try {
    const myPosts = await usersProfile(profileData.name);
    mainContent.innerHTML = `
        <div class="profile-header">
        <h2>${profileData.name}</h2>
        </div>
        ${feedTemplate(myPosts, false)}
        `;
  } catch (error) {
    console.error('Failed to load profile posts', error);
    mainContent.innerHTML = `
        <div class="profile-header">
        <h2>${profileData.name}</h2>
        </div>
        <p class="error-message">Failed to load posts. Please try again later.</p>
        `;
  }
}

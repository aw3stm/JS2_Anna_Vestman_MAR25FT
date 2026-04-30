import { load } from '../utils/storage';
import { usersProfile } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar, topbarEvents } from '../components/topbar';
import { footerNav } from '../components/footerNav';
import { postEvents } from '../components/postEvents';

export async function renderProfile(container: HTMLElement) {
  const profileData = load('profile');

  if (!profileData || !profileData.name) {
    container.innerHTML = `<p>Couldn't load your profile page. Please try again later.</p>`;
    return;
  }

  container.innerHTML = `
    ${topBar()}
    <main id="main-content" class="feedContent profile-page">
    <div class="profile-header">
    <h2>${profileData.name}</h2>
    </div>
    <p class="loader">Loading your posts...</p>
    </main>
    ${footerNav()}
    `;
  topbarEvents();

  const mainContent = container.querySelector('#main-content') as HTMLElement;
  try {
    const myPosts = await usersProfile(profileData.name);
    mainContent.innerHTML = `
        <div class="profile-header">
        <i id="profile-avatar" class="fa-solid fa-user-circle"></i>
        <h2>${profileData.name}</h2>
        </div>
        ${feedTemplate(myPosts, false)}
        `;
    postEvents(container);
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

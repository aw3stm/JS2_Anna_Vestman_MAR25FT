import { load } from '../utils/storage';
import { usersProfile, followUser, unfollowUser } from '../api/posts';
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
    const bioInfo = myProfile
      ? profileData?.bio || 'This user prefers privacy'
      : userPost[0]?.author?.bio || 'This user prefers privacy';
    const backBtn = !myProfile
      ? `<a href="javascript:history.back()" class="back-link"><i class="fa-solid fa-arrow-left"></i> Back </a>`
      : '';

      const followNames = profileData?.following || [];
    const isAlreadyFollowing = followNames.some(
      (f: any) => f.name.toLowerCase() === targetName.toLowerCase()
    );

    
    const followBtn = !myProfile
      ? `<button id="profile-follow-btn" class="follow-btn ${isAlreadyFollowing ? 'following' : ''}" data-name="${targetName}">
          ${isAlreadyFollowing ? 'Unfollow' : 'Follow'}
         </button>`
      : '';
   
    mainContent.innerHTML = `
    ${backBtn}
    <div class="profile-top">
        <div class="profile-header">
        <i id="profile-avatar" class="fa-solid fa-user-circle"></i>
        <h2>${targetName}</h2>
        </div>
        <div class="follow-btn-div">
        ${followBtn}
        </div>
        </div>
        <div class="profile-bio-text">
        <p class="profile-bio">${bioInfo}</p>
        
        </div>
        
        <div class="profile-grid">
        ${feedTemplate(userPost, false)}
        </div>
        `;
    postEvents(container);

    const profileFollowBtn = document.querySelector('#profile-follow');
    if (profileFollowBtn) {
      profileFollowBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const btn = e.currentTarget as HTMLButtonElement;
        
    
        btn.innerHTML = `<i class="fa-solid fa-user-check"></i> Following`;
       
      });
    }
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

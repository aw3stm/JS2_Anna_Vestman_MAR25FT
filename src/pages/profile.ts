import { load } from '../utils/storage';
import { usersProfile } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar } from '../components/topbar';
import { deletePost, updatePost } from '../api/posts';
import { footerNav } from '../components/footernav';

export async function renderProfile(container: HTMLElement) {
  const profileData = load('profile');

  if (!profileData || !profileData.name) {
    container.innerHTML = `<p>Couldn't load your profile page. Please try again later.</p>`;
    return;
  }

  container.onclick = async (event) => {
    const target = event.target as HTMLElement;
    const homeBtn = target.closest('#rantr-home');
    if (homeBtn) {
      console.log('Clicked logo, back to start');
      return;
    }

    const editBtn = target.closest('.edit-btn') as HTMLButtonElement;
    if (editBtn) {
      const postId = Number(editBtn.dataset.id);
      const postCard = editBtn.closest('.post-card');

      const bodyElement = postCard?.querySelector('.post-body');
      const currentBodyText = bodyElement?.textContent || '';

      const newText = prompt('Edit your post', currentBodyText);

      if (newText !== null && newText.trim() !== '' && newText !== currentBodyText) {
        try {
          editBtn.disabled = true;
          await updatePost(postId, { body: newText });
          if (bodyElement) {
            bodyElement.textContent = newText;
          }
        } catch (error) {
          console.error('Unable to update post', error);
        } finally {
          editBtn.disabled = false;
        }
      }
      return;
    }

    const deleteBtn = target.closest('.delete-btn') as HTMLButtonElement;
    if (deleteBtn) {
      const postId = Number(deleteBtn.dataset.id);
      const postCard = deleteBtn.closest('.post-card');

      if (confirm('Are you sure you want to delete this post?')) {
        try {
          deleteBtn.disabled = true;
          await deletePost(postId);
          postCard?.remove();
        } catch (error) {
          console.error('Unable to delete post', error);
          deleteBtn.disabled = false;
        }
      }
      return;
    }
  };

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

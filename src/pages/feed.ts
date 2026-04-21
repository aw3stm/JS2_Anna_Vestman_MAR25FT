import { removeData } from '../utils/storage';
import { getPosts } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar } from '../components/topbar';
import { postReaction } from '../api/reactions';
import { renderProfile } from './profile';

export async function renderFeed(container: HTMLElement) {
  container.innerHTML = `<p>Loading...</p>`;

  container.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    const homeBtn = target.closest('#rantr-home');
    if (homeBtn) {
      renderFeed(container);
      return;
    }

    const profileBtnClick = target.closest('#profile-btn');
    if (profileBtnClick) {
      console.log('Works fine! Loading profile...');
      renderProfile(container);
      return;
    }

    const btn = target.closest('.react-btn') as HTMLButtonElement;

    if (!btn) return;
    event.preventDefault();
    if (btn.disabled) return;

    const postId = Number(btn.dataset.id);
    try {
      btn.disabled = true;
      await postReaction(postId);

      const likeCount = btn.querySelector('span');

      if (likeCount) {
        const currentCount = Number(likeCount.textContent || 0);
        likeCount.textContent = (currentCount + 1).toString();
      }
    } catch (error) {
      console.error('Failed to react', error);
    } finally {
      btn.disabled = false;
    }
  });

  try {
    const posts = await getPosts();
    container.innerHTML = `
    ${topBar()}
    <main class="feedContent">
    ${feedTemplate(posts)}
    </main> 
    `;
    const btn = document.getElementById('logoutBtn');

    btn?.addEventListener('click', () => {
      removeData('token');
      removeData('profile');

      window.location.hash = '#/login';
    });
  } catch (error) {
    console.log(error);
    container.innerHTML = `<p>Failed to load feed</p>`;
  }
}

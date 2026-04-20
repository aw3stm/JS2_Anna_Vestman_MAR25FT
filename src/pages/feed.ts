import { removeData } from '../utils/storage';
import { getPosts } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar } from '../components/topbar';
import { postReaction } from '../api/reactions';

export async function renderFeed(container: HTMLDivElement) {
  container.innerHTML = `<p>Loading...</p>`;

  container.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    const btn = target.closest('.react-btn') as HTMLElement;

    if (!btn) return;

    const postId = Number(btn.dataset.id);
    try {
      await postReaction(postId);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Reactions is temporarily unavailable');
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

import { removeData } from '../utils/storage';
import { getPosts } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar } from '../components/topbar';

export async function renderFeed(container: HTMLDivElement) {
  container.innerHTML = `<p>Loading...</p>`;

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

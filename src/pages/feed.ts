import { getPosts, myProfile } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar, topbarEvents } from '../components/topbar';
import { footerNav } from '../components/temp';
import { postEvents } from '../components/postEvents';
import { load, save } from '../utils/storage';

export async function renderFeed(container: HTMLElement) {
  container.innerHTML = `<p>Loading...</p>`;
  try {
    const user = load('profile');

    if (user && user.name) {
      try {
        const profileUpdated = await myProfile(user.name);
        save('profile', profileUpdated.data);
      } catch (e) {
        console.warn("Couldn't update profile status, usage of old data");
      }
    }

    const posts = await getPosts();
    container.innerHTML = `
      ${topBar()}
      <main class="feedContent">
        ${feedTemplate(posts)}
      </main> 
      ${footerNav()}
    `;

    topbarEvents();
    postEvents(container);
  } catch (error) {
    console.log(error);
    container.innerHTML = `<p>Failed to load feed</p>`;
  }
}

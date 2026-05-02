import { singlePost } from '../api/posts';
import { postCard } from '../components/postcard';
import { topBar, topbarEvents } from '../components/topbar';
import { footerNav } from '../components/footerNav';
import { postEvents } from '../components/postEvents';

export async function renderSinglePost(container: HTMLElement) {
  const queryString = window.location.hash.split('?')[1];
  const param = new URLSearchParams(queryString);
  const postId = param.get('id');

  if (!postId) {
    container.innerHTML = `<p>Post not found. <a href="#/feed">Go back</a></p>`;
    return;
  }
  container.innerHTML = `
  ${topBar()}
  <main id="main-content" class="feedContent">
  <div class="profile-header">
  <a href="#/feed">
  <i class="fa-solid fa-arrow-left"></i>Back to feed
  </a></div>
  <p class="loader">Loading post...</p>
  </main>
  ${footerNav()}
  `;
  topbarEvents();

  const mainContent = container.querySelector('#main-content') as HTMLElement;

  try {
    const post = await singlePost(postId);
    mainContent.innerHTML = `
    <div class="profile-header">
    <a href="javascript:history.back()" class="go-back">
    <i class="fa-solid fa-arrow-left"></i> Back
    </a></div>
    ${postCard(post)}
    `;
    postEvents(container);
  } catch (error) {
    console.error('Failed to load single post', error);
    mainContent.innerHTML = `<p class="error-message">Failed to load post.</p>`;
  }
}

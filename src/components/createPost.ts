import { topBar } from './topbar';
import { newPost } from '../api/posts';
import { renderFeed } from '../pages/feed';

export function renderCreatePost(container: HTMLElement) {
  container.innerHTML = `
    ${topBar()}
    <main id="main-content" class="feedContent createPost">
    <div class="profile-header">
    <h2>New post</h2>
    </div>
    
    <form id="create-post-form" class="create-form">
    <textarea id="post-title" placeholder="Title" rows="1" required></textarea>
    <textarea id="post-body" placeholder="What's on your mind?" rows="5"></textarea>
    <input type="url" id="post-media" placeholder="Media url"/>
    <button type="submit" id="submit-btn">Publish</button>
    </form>
    </main>
    `;

  const form = container.querySelector('#create-post-form') as HTMLFormElement;
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titleInput = container.querySelector('#post-title') as HTMLInputElement;
    const bodyInput = container.querySelector('#post-body') as HTMLTextAreaElement;
    const mediaInput = container.querySelector('#post-media') as HTMLInputElement;
    const submitBtn = container.querySelector('#submit-btn') as HTMLButtonElement;

    const postData: any = {
      body: bodyInput.value,
    };
    if (titleInput.value) {
      postData.title = titleInput.value;
    }
    if (mediaInput.value) {
      postData.media = {
        url: mediaInput.value,
        alt: 'User uploaded image to feed',
      };
    }
    try {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Posting...';
      await newPost(postData);
      window.location.hash = '#/feed';
    } catch (error) {
      console.error('Failed to publish post:', error);
      submitBtn.disabled = false;
      submitBtn.innerText = 'Publish post';
    }
  });
}

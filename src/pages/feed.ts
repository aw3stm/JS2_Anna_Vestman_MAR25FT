import { removeData } from '../utils/storage';
import { getPosts } from '../api/posts';
import { feedTemplate } from '../templates/feedTemplate';
import { topBar } from '../components/topbar';
import { postReaction } from '../api/reactions';
import { deletePost, updatePost } from '../api/posts';
import { footerNav } from '../components/footernav';

export async function renderFeed(container: HTMLElement) {
  container.innerHTML = `<p>Loading...</p>`;

  container.onclick = async (event) => {
    const target = event.target as HTMLElement;

    const createBtn = target.closest('#create-post');
    if (createBtn) {
      window.location.hash = '#/create';
      return;
    }

    const homeBtn = target.closest('#rantr-home');
    if (homeBtn) {
      window.location.hash = '#/feed';
      return;
    }

    const profileBtnClick = target.closest('#profile-btn');
    if (profileBtnClick) {
      window.location.hash = '#/profile';
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
  };

  try {
    const posts = await getPosts();
    container.innerHTML = `
    ${topBar()}
    <main class="feedContent">
    ${feedTemplate(posts)}
    </main> 
    ${footerNav()};
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

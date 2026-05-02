// utils/postEvents.ts

import { updatePost, deletePost, followUser, unfollowUser } from '../api/posts';
import { postReaction, postComment, deleteComment } from '../api/reactions';
import { load, save } from '../utils/storage';

export function postEvents(container: HTMLElement) {
  if (container.dataset.eventsBound === 'true') {
    return;
  }
  container.dataset.eventsBound = 'true';

  container.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    // --- EDIT POST ---
    const editBtn = target.closest('.edit-btn') as HTMLButtonElement;
    if (editBtn) {
      const postId = Number(editBtn.dataset.id);
      const postCard = editBtn.closest('.post-card');
      const bodyElement = postCard?.querySelector('.post-body') as HTMLElement;
      if (bodyElement.querySelector('.edit-textarea')) return;

      const currentBodyText = bodyElement?.textContent || '';
      bodyElement.innerHTML = `
        <textarea class="edit-textarea">${currentBodyText}</textarea>
        <div class="edit-actions">
            <button class="save-edit-btn">Save</button>
            <button class="cancel-edit-btn">Cancel</button>
        </div>
      `;

      const textarea = bodyElement.querySelector('.edit-textarea') as HTMLTextAreaElement;
      const saveBtn = bodyElement.querySelector('.save-edit-btn') as HTMLButtonElement;
      const cancelBtn = bodyElement.querySelector('.cancel-edit-btn') as HTMLButtonElement;

      textarea.focus();

      cancelBtn.addEventListener('click', () => {
        bodyElement.textContent = currentBodyText;
      });

      saveBtn.addEventListener('click', async () => {
        const newText = textarea.value.trim();

        if (!newText || newText === currentBodyText) {
          bodyElement.textContent = currentBodyText;
          return;
        }

        try {
          saveBtn.disabled = true;
          saveBtn.textContent = 'Saving...';

          await updatePost(postId, { body: newText });

          bodyElement.textContent = newText;
        } catch (error) {
          console.error('Unable to update post', error);
          alert('Failed to save post. Please try again.');
          saveBtn.disabled = false;
          saveBtn.textContent = 'Save';
        }
      });

      return;
    }

    // --- DELETE POST ---
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

    // --- LIKE / REACTION ---
    const btn = target.closest('.react-btn') as HTMLButtonElement;
    if (btn) {
      event.preventDefault();
      if (btn.disabled) return;

      const postId = Number(btn.dataset.id);
      const isLiked = btn.classList.contains('liked');
      const likeCount = btn.querySelector('span');
      let currentCount = Number(likeCount?.textContent || 0);

      try {
        btn.disabled = true;
        if (isLiked) {
          btn.classList.remove('liked');
          if (likeCount) {
            likeCount.textContent = (currentCount - 1).toString();
          }
        } else {
          await postReaction(postId);
          btn.classList.add('liked');
          if (likeCount) {
            likeCount.textContent = (currentCount + 1).toString();
          }
        }
      } catch (error) {
        console.error('Failed to react', error);
      } finally {
        btn.disabled = false;
      }
      return;
    }

    // FOLLOW / UNFOLLOW
    const followBtn = target.closest('.follow-btn') as HTMLButtonElement;
    if (followBtn) {
      const authorName = followBtn.dataset.name;
      if (!authorName) return;
      try {
        followBtn.disabled = true;
        const isFollowing = followBtn.classList.contains('following');

        if (isFollowing) {
          await unfollowUser(authorName);
          followBtn.textContent = 'Follow';
          followBtn.classList.remove('following');
        } else {
          await followUser(authorName);
          followBtn.textContent = 'Unfollow';
          followBtn.classList.add('following');
        }

        const currentUserProfile = load('profile');
        if (currentUserProfile) {
          if (!currentUserProfile.following) currentUserProfile.following = [];

          if (isFollowing) {
            currentUserProfile.following = currentUserProfile.following.filter(
              (f: any) => f.name.toLowerCase() !== authorName.toLowerCase(),
            );
          } else {
            currentUserProfile.following.push({ name: authorName });
          }
          save('profile', currentUserProfile);
        }
      } catch (error: any) {
        console.error('Failed to toggle follow status', error);
        if (error.message?.includes('already following')) {
          followBtn.textContent = 'Unfollow';
          followBtn.classList.add('following');
        }
      } finally {
        followBtn.disabled = false;
      }
      return;
    }

    // Delete comment
    const delCommBtn = target.closest('.del-comment-btn') as HTMLButtonElement;
    if (delCommBtn) {
      const postId = Number(delCommBtn.dataset.postId);
      const commentId = Number(delCommBtn.dataset.commentId);
      const commentItem = delCommBtn.closest('.comment-item');

      if (confirm('Are you sure you want to delete this comment?')) {
        commentItem?.remove();
        try {
          await deleteComment(postId, commentId);
        } catch (error) {
          console.error('Failed to delete comment', error);
        }
      }
      return;
    }
  });

  // Submit events
  container.addEventListener('submit', async (event) => {
    const target = event.target as HTMLFormElement;

    if (target.classList.contains('comment-form')) {
      event.preventDefault();

      const postId = Number(target.dataset.id);
      const input = target.querySelector('.comment-input') as HTMLInputElement;
      const submitBtn = target.querySelector('.send-comment') as HTMLButtonElement;

      if (!input.value.trim()) return;

      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        const response = await postComment(postId, input.value.trim());
        const newComment = response.data;

        const commentsList = target.closest('.post-Comments')?.querySelector('.all-comments');
        const myName = load('profile')?.name || 'Me';

        const newCommentHTML = `
            <div class="comment-item">
              <div class="comment-content">
                <span class="commAuthor">${myName}:</span>
                <span class="commText">${input.value}</span>
              </div>
              <button class="del-comment-btn" data-post-id="${postId}" data-comment-id="${newComment.id}">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          `;

        if (commentsList) {
          commentsList.insertAdjacentHTML('beforeend', newCommentHTML);
        } else {
          const postCommentsWrapper = target.closest('.post-Comments');
          if (postCommentsWrapper) {
            const newCommentsList = document.createElement('div');
            newCommentsList.className = 'all-comments';
            newCommentsList.innerHTML = newCommentHTML;
            postCommentsWrapper.insertBefore(newCommentsList, target);
          }
        }
        input.value = '';
      } catch (error) {
        console.error('Failed to comment', error);
        alert('Could not post comment. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
      }
    }
  });
}

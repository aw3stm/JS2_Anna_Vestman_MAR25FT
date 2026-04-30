import { load } from '../utils/storage';

export function postCard(post: any) {
  const profileData = load('profile');
  const myUsername = profileData?.name;
  const followNames = profileData?.following || [];

  const isAlreadyFollowing = followNames.some(
    (f: any) => f.name.toLowerCase() === post.author?.name.toLowerCase(),
  );

  const isAuthor = myUsername && post.author?.name && myUsername === post.author.name.toLowerCase();

  const authorActions = isAuthor
    ? `
  <div class="edit-actions">
  <button class="edit-btn" data-id="${post.id}" title="Edit post"><i class="fa-solid fa-pen"></i></button>
  <button class="delete-btn" data-id="${post.id}" title="Delete post"><i class="fa-solid fa-trash"></i></button>
  </div>
  `
    : '';

  const followBtnOnCard =
    !isAuthor && post.author?.name
      ? `<button class="follow-btn ${isAlreadyFollowing ? 'following' : ''}" data-name="${post.author.name}">
        ${isAlreadyFollowing ? 'Unfollow' : 'Follow'} </button>`
      : '';

  const existingComments =
    post.comments && post.comments.length > 0
      ? `<div class="all-comments">
    ${post.comments
      .map((c: any) => {
        const isCommentAuthor = myUsername === c.author?.name;
        const deleteBtn = isCommentAuthor
          ? `<button class="del-comment-btn" data-post-id="${post.id}" data-comment-id="${c.id}" title="Delete comment">
          <i class="fa-solid fa-xmark"></i>
          </button>`
          : '';
        return `
     <div class="comment-item">
     <div class="comment-content">
     <span class="commAuthor">${c.author?.name || 'User'}:</span>
     <span class="commText">${c.body}</span>
     </div>
     ${deleteBtn}
     </div>
     `;
      })
      .join('')}
     </div>`
      : '';

  const commentSection = `
      <div class="post-Comments">
      ${existingComments}
      <form class="comment-form" data-id="${post.id}">
      <input type="text" class="comment-input" placeholder="Something you wanna add?" />
      <button type="submit" class="send-comment" title="Post comment"><i class="fa-solid fa-paper-plane"></i></button>
      </form>
      </div>
      `;

  return `
    <article class="post-card">
    <div class="card-header">
    <div class="user-info">
    <img src="${post.author?.avatar?.url || '/images/Posts/circle-user-solid-full.svg'}" alt="default user image" class="user-avatar"/>
    <span class="post-name"> ${post.author?.name || 'Unknown'}</span>
    </div>
    <div class="user-info-follow">
    ${followBtnOnCard}
    </div>
    ${authorActions}
    </div>
    
    ${
      post.media?.url
        ? `
        <img src="${post.media.url}" 
        alt="${post.media.alt || ''}"
        class="post-img" 
        />
        `
        : ''
    }

    <h3 class="post-title">${post.title}</h3>
    <p class="post-body">${post.body || ''}</p>
    <div class="post-actions">
        <button class="action-items react-btn" data-id="${post.id}">
        <i class="fa-solid fa-hand-point-up"></i>
        <span>${post._count?.reactions || 0}</span>
    </button>
    
    <button class="action-items">
        <i class="fa-solid fa-comment"></i>
        <span>${post._count?.comments || 0}</span>
    </button>
   </div>
   ${commentSection}
</article> 
    `;
}

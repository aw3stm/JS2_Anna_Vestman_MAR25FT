import { load } from '../utils/storage';

export function postCard(post: any) {
  const profileData = load('profile');
  const myUsername = profileData?.name;
  const isAuthor = myUsername && post.author && myUsername === post.author.name;
  const authorActions = isAuthor
    ? `
  <div class="edit-actions">
  <button class="edit-btn" data-id="${post.id}" title="Edit post"><i class="fa-solid fa-pen"></i></button>
  <button class="delete-btn" data-id="${post.id}" title="Delete post"><i class="fa-solid fa-trash"></i></button>
  </div>
  `
    : '';
  return `
    <article class="post-card">
    <div class="card-header">
    <div class="user-info">
    <img src="${post.author?.avatar?.url || '/images/Posts/circle-user-solid-full.svg'}" alt="default user image" class="user-avatar"/>
    <span class="post-name"> ${post.author?.name || 'Unknown'}</span>
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
</article> 
    `;
}

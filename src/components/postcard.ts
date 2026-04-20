export function postCard(post: any) {
  return `
    <article class="post-card">
    <div class="card-header">
    <img src="${post.author?.avatar?.url || '/images/Posts/circle-user-solid-full.svg'}" alt="default user image" class="user-avatar"/>
    
    <span class="post-name"> ${post.author?.name || 'Unknown'}</span>
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
        <span class="action-items">
        <i class="fa-solid fa-hand-point-up"></i>
        <span>${post._count?.reactions || 0}</span>
    </span>
    
    <span class="action-items">
        <i class="fa-solid fa-comment"></i>
        <span>${post._count?.comments || 0}</span>
    </span>
   </div>
</article>
    `;
}

import { postCard } from '../components/postcard';
import { feedHeader } from '../components/feedHeader';

export function feedTemplate(posts: any[]) {
  return `
    <section class="publicFeed">
    ${feedHeader()}
   
    ${posts.map((post) => postCard(post)).join('')}
    
   </section>
    `;
}

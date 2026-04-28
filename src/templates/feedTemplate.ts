import { postCard } from '../components/postcard';
import { feedHeader } from '../components/feedHeader';

export function feedTemplate(posts: any[], showHeader: boolean = true) {
  return `
    <section class="feedContent">
    ${showHeader ? feedHeader() : ''}
   
    ${posts.map((post) => postCard(post)).join('')}
    
   </section>
    `;
}

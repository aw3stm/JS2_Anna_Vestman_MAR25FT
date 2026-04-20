import { postCard } from '../components/postcard';

export function feedTemplate(posts: any[]) {
  return `
    <section class="publicFeed"></div>
    <h1>What's new?</h1>

    ${posts.map((post) => postCard(post)).join('')}
   </section>
    `;
}

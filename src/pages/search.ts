import { topBar, topbarEvents } from '../components/topbar';
import { footerNav } from '../components/temp';
import { feedTemplate } from '../templates/feedTemplate';
import { postSearch } from '../api/posts';

export function renderSearch(container: HTMLElement) {
  container.innerHTML = `
    ${topBar()}
    <main id="main-content" class="feedContent page-search">
    <div class="profile-header">
    <h2>Search posts</h2>
    </div>

    <form id="search-form" class="create-form">
    <input type="text" id="search-input" placeholder="Search for users or posts" required/>
    <button type="submit" id="search-btn" class="submit-btn">Search</button>
    </form>

    <div id="search-result">
    <p>Start typing above to search</p></div>
    </main>
    ${footerNav()}
    `;
  topbarEvents();

  const form = container.querySelector('#search-form') as HTMLFormElement;
  const resultsContainer = container.querySelector('#search-result') as HTMLElement;
  const searchBtn = container.querySelector('#search-btn') as HTMLButtonElement;

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchInput = container.querySelector('#search-input') as HTMLInputElement;
    const query = searchInput.value.trim();

    if (!query) return;
    searchBtn.innerText = 'Searching...';
    resultsContainer.innerHTML = `<p>Searching for ${query}...</p>`;

    try {
      const result = await postSearch(query);
      if (result.length === 0) {
        resultsContainer.innerHTML = `<p>Couldn't find "${query}"</p>`;
      } else {
        resultsContainer.innerHTML = feedTemplate(result, false);
      }
    } catch (error) {
      console.error('Search failed', error);
      resultsContainer.innerHTML = `<p>Something went wrong. Please try again.</p>`;
    } finally {
      searchBtn.innerText = 'Search';
    }
  });
}

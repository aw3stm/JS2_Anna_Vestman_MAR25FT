# AI Usage Declaration

In this project, I have used AI (Google Gemini and ChatGPT) as a sounding board and a tool for debugging, refactoring, and CSS layout. I wrote the core logic, API calls, and HTML structures myself, but used AI to help solve specific problems when I got stuck.

## Areas where I have used AI:

### 1. User Experience (UX) and Navigation

I had an issue where the "Back" button on the single-post page always redirected to the main feed, even if the user navigated from a profile page.

- **Help received:** The AI suggested using `javascript:history.back()` instead of hardcoded links, which made the navigation dynamic.

### 2. Refactoring JavaScript/DOM Manipulation

I initially used the browser's built-in `prompt()` to edit posts, which resulted in a poor user experience.

- **Help received:** I asked for help replacing the prompt with "inline editing". The AI showed me how to dynamically replace the text with a `<textarea>` and save/cancel buttons directly in the DOM.

### 3. TypeScript Debugging (TS6133)

During the build process (`npm run build`), I encountered an error message stating that the `followUser` and `unfollowUser` functions were declared but never read.

- **Help received:** The AI helped me understand why TypeScript was complaining and showed me that I needed to actually implement the API calls inside my `addEventListener` for the follow button, rather than just changing the button's visual appearance.

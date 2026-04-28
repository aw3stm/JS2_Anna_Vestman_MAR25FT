import { router } from './router/router';
import './style.css';
import './css/login.css';
import './css/feed.css';
import './css/components.css';
import './css/createpost.css';
import './css/footer.css';

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);

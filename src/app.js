
import compileTemplate from './pages/user-settings/script.js';
let list = ['authorization', 'registartion', 'main', 'user-settings', '404', '500'];
document.querySelector('#app').innerHTML = compileTemplate()
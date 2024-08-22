// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import 'normalize.css'
import './assets/icon/iconfont.css'
import './styles/index.less'
import './components/Spine-Player/spine-player.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme

var mouse = document.querySelector('.mouse');
document.addEventListener('mousemove', function(e) {
    mouse.style.left = e.pageX + 'px';
    mouse.style.top = e.pageY + 'px';
});

var links = document.querySelectorAll('a');

links.forEach(function(link) {
    link.addEventListener('mouseover', function() {
        mouse.classList.add('lighter');
    });
    link.addEventListener('mouseout', function() {
        mouse.classList.remove('lighter');
    });
});
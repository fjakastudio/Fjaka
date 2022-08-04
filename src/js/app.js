import Swup from 'swup';
import JsPlugin from '@swup/js-plugin';
import DebugPlugin from '@swup/debug-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { TweenMax } from 'gsap/TweenMax';
import loadComponents from 'gia/loadComponents';
import components from './components';
import AOS from 'aos';

// enable components
loadComponents(components);

// enable swup
const swup = new Swup({
    linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
    plugins: [
        new JsPlugin([
            {
                from: '(.*)',
                to: '(.*)',
                in: (next) => {
                    document.querySelector('#swup').style.opacity = 0;
                    TweenMax.to(document.querySelector('#swup'), .5, {
                        opacity: 1,
                        onComplete: next
                    });
                },
                out: (next) => {
                    document.querySelector('#swup').style.opacity = 1;
                    TweenMax.to(document.querySelector('#swup'), .5, {
                        opacity: 0,
                        onComplete: next
                    });
                }
            },
            {
                from: '/work.html',
                to: 'case-transition',
                in: (next) => {
                },
                out: (next) => {
                    TweenMax.to(document.querySelector('.active .case-small__inner'), .6, 
                    {css:{scaleY:"6", zindex:"10"}, ease: 'cubic-bezier(0.075, 0.82, 0.165, 1)', 
                    onComplete: next
                    });
                }
            },
        ]),
        new DebugPlugin(),
        new SwupBodyClassPlugin(),
        new SwupScrollPlugin()
    ]
});

const bodyClassPlugin = new SwupBodyClassPlugin({
    prefix: 'page-'
});

AOS.init();

document.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('li').forEach(i => {i.classList.remove('active')})
        item.classList.add('active')
    })
})


document.querySelectorAll('.case-small').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('case-small').forEach(i => {i.classList.remove('active')})
        item.classList.add('active')
    })
})

// reload components for each container after transition
swup.on('contentReplaced', function () {
    document.querySelectorAll('[data-swup]').forEach(function (container) {
        loadComponents(components, container);
        
        AOS.init();

        document.querySelectorAll('.case-small').forEach(item => {
            item.addEventListener('click', event => {
                document.querySelectorAll('case-small').forEach(i => {i.classList.remove('active')})
                item.classList.add('active')
            })
        })
    });
});

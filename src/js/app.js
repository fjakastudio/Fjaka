import Swup from 'swup';
import JsPlugin from '@swup/js-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import SwupProgressPlugin from '@swup/progress-plugin';
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

                    document.querySelectorAll('.case-small').forEach(item => {
                        item.addEventListener('click', event => {
                            document.querySelectorAll('case-small').forEach(i => {i.classList.remove('active')})
                            item.classList.add('active')
                        })
                    })

                    var animation = bodymovin.loadAnimation({
                        container: document.getElementById('hand'),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: '../assets/lottie/ball.json'
                    })

                    var animation = bodymovin.loadAnimation({
                        container: document.getElementById('stars'),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        speed: 0.5,
                        path: '../assets/lottie/shining-process.json'
                    })
                    
                    var animation = bodymovin.loadAnimation({
                        container: document.getElementById('stars-2'),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        speed: 0.5,
                        path: '../assets/lottie/shining-process.json'
                    })
                },
                out: (next) => {
                    document.querySelector('#swup').style.opacity = 1;
                    TweenMax.to(document.querySelector('#swup'), .5, {
                        opacity: 0,
                        onComplete: next
                    });

                    document.querySelectorAll('.case-small').forEach(item => {
                        item.addEventListener('click', event => {
                            document.querySelectorAll('case-small').forEach(i => {i.classList.remove('active')})
                            item.classList.add('active')
                        })
                    })
                }
            },
            {
                from: '/work',
                to: 'case-transition',
                in: (next) => {
                },
                out: (next) => {
                    TweenMax.to(document.querySelector('.active .case-small__inner'), .8, 
                    {css:{scaleY:"14", zindex:"10"}, ease: 'cubic-bezier(0.075, 0.82, 0.165, 1)', 
                    onComplete: next
                    });
                }
            },
        ]),
        new SwupBodyClassPlugin(),
        new SwupScrollPlugin(),
        new SwupProgressPlugin(
            {
                className: 'loader',
                transition: 300,
                delay: 600,
                initialValue: 0.25,
                hideImmediately: true
              }
        )
    ]
});

const bodyClassPlugin = new SwupBodyClassPlugin({
    prefix: 'page-'
});

var animation = bodymovin.loadAnimation({
    container: document.getElementById('hand'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/ball.json'
})

var animation = bodymovin.loadAnimation({
    container: document.getElementById('front-hand'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: '../assets/lottie/arms-button.json'
})

var animation = bodymovin.loadAnimation({
    container: document.getElementById('stars'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    speed: 0.1,
    path: '../assets/lottie/shining-process.json'
})

var animation = bodymovin.loadAnimation({
    container: document.getElementById('stars-2'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    speed: 0.1,
    path: '../assets/lottie/shining-process.json'
})

AOS.init();

var prevScrollpos = window.pageYOffset;
document.getElementById("header").style.transition = ".3s";
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.opacity = "1";
  } else {
    document.getElementById("header").style.opacity = "0";
  }
  prevScrollpos = currentScrollPos;
}

document.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('li').forEach(i => {i.classList.remove('active')})
        item.classList.add('active')
        document.querySelectorAll('text-link').classList.remove('active')
    })
})


document.querySelectorAll('.case-small').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('case-small').forEach(i => {i.classList.remove('active')})
        item.classList.add('active')
        document.querySelectorAll('text-link').classList.remove('active')
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
                document.querySelectorAll('text-link').classList.remove('active')
            })
        })
    });
});

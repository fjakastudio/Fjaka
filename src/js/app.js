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
                from: '/work.html',
                to: 'case-transition',
                in: (next) => {
                },
                out: (next) => {
                    TweenMax.to(document.querySelector('.active .case-small__inner'), .4, 
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

var animation = bodymovin.loadAnimation({
    container: document.getElementById('hand'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../assets/lottie/ball.json'
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
    })
})


document.querySelectorAll('.case-small').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('case-small').forEach(i => {i.classList.remove('active')})
        item.classList.add('active')
    })
})

if( window.innerWidth < 800 ) {

} else {
    const noise = () => {
        let canvas, ctx;
    
        let wWidth, wHeight;
    
        let noiseData = [];
        let frame = 0;
    
        let loopTimeout;
    
    
        // Create Noise
        const createNoise = () => {
            const idata = ctx.createImageData(wWidth, wHeight);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;
    
            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.5) {
                    buffer32[i] = 0xff000000;
                }
            }
    
            noiseData.push(idata);
        };
    
    
        // Play Noise
        const paintNoise = () => {
            if (frame === 9) {
                frame = 0;
            } else {
                frame++;
            }
    
            ctx.putImageData(noiseData[frame], 0, 0);
        };
    
    
        // Loop
        const loop = () => {
            paintNoise(frame);
    
            loopTimeout = window.setTimeout(() => {
                window.requestAnimationFrame(loop);
            }, (2000 / 25));
        };
    
    
        // Setup
        const setup = () => {
            wWidth = window.innerWidth;
            wHeight = window.innerHeight;
    
            canvas.width = wWidth;
            canvas.height = wHeight;
    
            for (let i = 0; i < 10; i++) {
                createNoise();
            }
    
            loop();
        };
    
    
        // Reset
        let resizeThrottle;
        const reset = () => {
            window.addEventListener('resize', () => {
                window.clearTimeout(resizeThrottle);
    
                resizeThrottle = window.setTimeout(() => {
                    window.clearTimeout(loopTimeout);
                    setup();
                }, 200);
            }, false);
        };
    
    
        // Init
        const init = (() => {
            canvas = document.getElementById('noise');
            ctx = canvas.getContext('2d');
    
            setup();
        })();
    };
    
    noise();
};

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

        var animation = bodymovin.loadAnimation({
            container: document.getElementById('hand'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../assets/lottie/ball.json'
        })
    });
});

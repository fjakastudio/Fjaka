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

                    var animationSwoosh = bodymovin.loadAnimation({
                        container: document.getElementById('swoosh'),
                        renderer: 'svg',
                        loop: false,
                        autoplay: false,
                        speed: 0.1,
                        path: '../assets/lottie/splash.json'
                    })

                    document.querySelector('.menu-icon').onclick = function() {
                        document.querySelector('body').classList.toggle('active-menu');
                        document.querySelector('.header').classList.toggle('active-menu');
                    }                    

                    var element =  document.querySelector('.header-big__bg');
                    if (typeof(element) != 'undefined' && element != null)
                    {
                        document.querySelector('.header-big__bg').onclick = function() {
                            document.querySelector('body').classList.remove('active-reel');
                            var player = document.getElementById("reel");
                            var data = { method: "pause" };
                            player.contentWindow.postMessage(JSON.stringify(data), "*");
                        }
                    }

                    var element =  document.querySelector('.header-big__bg');
                    if (typeof(element) != 'undefined' && element != null)
                    {
                        document.querySelector('.play-reel').onclick = function() {
                            document.querySelector('body').classList.add('active-reel');
                            var player = document.getElementById("reel");
                            var data = { method: "play" };
                            player.contentWindow.postMessage(JSON.stringify(data), "*");
                        }
                    }

                    var element =  document.querySelector('.header-big__bg');
                    if (typeof(element) != 'undefined' && element != null)
                    {
                    // Get a reference to the splash dialog
                    animationSwoosh.goToAndStop(58, true);
                    var splash = document.querySelector(".title-1");
                    var splashTwo = document.querySelector(".title-2");
                    var splashThree = document.querySelector(".title-3");
                    var splashFour = document.querySelector(".title-4");
                    var splashFive = document.querySelector(".title-5");
                    
                    // .5 seconds later, hide the splash
                    setTimeout(function(){
                        splash.classList.remove("swoosh-title--active");
                        splashTwo.classList.add("swoosh-title--active");
                        animationSwoosh.playSegments([0, 58], true);
                        
                    }, 3000);
                    
                    setTimeout(function(){
                        splashTwo.classList.remove("swoosh-title--active");
                        splashThree.classList.add("swoosh-title--active");
                        animationSwoosh.playSegments([0, 58], true);
                        
                    }, 6000);
                    
                    setTimeout(function(){
                        splashThree.classList.remove("swoosh-title--active");
                        splashFour.classList.add("swoosh-title--active");
                        animationSwoosh.playSegments([0, 58], true);
                        
                    }, 9000);
                    
                    setTimeout(function(){
                        splashFour.classList.remove("swoosh-title--active");
                        splashFive.classList.add("swoosh-title--active");
                        animationSwoosh.playSegments([0, 58], true);
                        
                    }, 12000);
                    }
                },
                out: (next) => {
                    document.querySelector('#swup').style.opacity = 1;
                    TweenMax.to(document.querySelector('#swup'), .5, {
                        opacity: 0,
                        onComplete: next
                    });
                }
            }
        ]),
        new SwupBodyClassPlugin(),
        new SwupScrollPlugin({
            doScrollingRightAway: false,
            animateScroll: false,
            scrollFriction: 0,
            scrollAcceleration: 0,
            offset: 0,
        }),
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

var animationSwoosh = bodymovin.loadAnimation({
    container: document.getElementById('swoosh'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    speed: 0.1,
    path: '../assets/lottie/splash.json'
})

// Get a reference to the splash dialog
animationSwoosh.goToAndStop(58, true);
var splash = document.querySelector(".title-1");
var splashTwo = document.querySelector(".title-2");
var splashThree = document.querySelector(".title-3");
var splashFour = document.querySelector(".title-4");
var splashFive = document.querySelector(".title-5");

var element =  document.querySelector('.swoosh-title--active');
if (typeof(element) != 'undefined' && element != null)
{
    // .5 seconds later, hide the splash
    setTimeout(function(){
        splash.classList.remove("swoosh-title--active");
        splashTwo.classList.add("swoosh-title--active");
        animationSwoosh.playSegments([0, 58], true);
        
    }, 5000);

    setTimeout(function(){
        splashTwo.classList.remove("swoosh-title--active");
        splashThree.classList.add("swoosh-title--active");
        animationSwoosh.playSegments([0, 58], true);
        
    }, 10000);

    setTimeout(function(){
        splashThree.classList.remove("swoosh-title--active");
        splashFour.classList.add("swoosh-title--active");
        animationSwoosh.playSegments([0, 58], true);
        
    }, 15000);

    setTimeout(function(){
        splashFour.classList.remove("swoosh-title--active");
        splashFive.classList.add("swoosh-title--active");
        animationSwoosh.playSegments([0, 58], true);
        
    }, 18000);
}


AOS.init();

function hasTouch() {
return 'ontouchstart' in document.documentElement
        || navigator.maxTouchPoints > 0
        || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all the :hover stylesheets
try { // prevent exception on browsers not supporting DOM styleSheets properly
    for (var si in document.styleSheets) {
    var styleSheet = document.styleSheets[si];
    if (!styleSheet.rules) continue;

    for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(':hover')) {
        styleSheet.deleteRule(ri);
        }
    }
    }
} catch (ex) {}
}


var element =  document.querySelector(".front");
if (typeof(element) != 'undefined' && element != null)
{
    var targets = document.querySelectorAll('section')
    var obsOptions = {
        root: null, // measure against the viewport
        threshold: .9 // how much of the element should be visible before handler is triggered
    }

    let handler = (entries, opts) => {
        entries.forEach(entry => {
        if (entry.intersectionRatio > opts.thresholds[0]) {
            document.querySelector("header").classList.remove(document.querySelector("header").classList);
            document.querySelector("header").classList.add(entry.target.id + '-active');
        }
        })
    }

    targets.forEach(el => {
        var observer = new IntersectionObserver(handler, obsOptions);
        observer.observe(el);
    })
}

document.querySelector('.menu-icon').onclick = function() {
    document.querySelector('body').classList.toggle('active-menu');
    document.querySelector('.header').classList.toggle('active-menu');
}

var element =  document.querySelector('.header-big__bg');
if (typeof(element) != 'undefined' && element != null)
{
    document.querySelector('.header-big__bg').onclick = function() {
        document.querySelector('body').classList.remove('active-reel');
        var player = document.getElementById("reel");
        var data = { method: "pause" };
        player.contentWindow.postMessage(JSON.stringify(data), "*");
    }
}

document.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('li').forEach(i => {i.classList.remove('active')})
        item.classList.add('active')
        document.querySelectorAll('text-link').classList.remove('active')
    })
})

const loaderEl = document.getElementsByClassName('fullpage-loader')[0];
document.addEventListener('readystatechange', (event) => {
	// const readyState = "interactive";
	const readyState = "complete";
    
	if(document.readyState == readyState) {
		// when document ready add lass to fadeout loader

        // when loader is invisible remove it from the DOM
		setTimeout(()=>{
            loaderEl.classList.add('fullpage-loader--invisible');
		}, 1000)
		
		// when loader is invisible remove it from the DOM
		setTimeout(()=>{
			loaderEl.parentNode.removeChild(loaderEl);
		}, 2000)
	}
});

// reload components for each container after transition
swup.on('contentReplaced', function () {
    document.querySelectorAll('[data-swup]').forEach(function (container) {
        loadComponents(components, container);
        
        AOS.init(); 

        var player = document.getElementById("reel");
        var data = { method: "pause" };
        player.contentWindow.postMessage(JSON.stringify(data), "*");


        var element =  document.querySelector(".front");
        if (typeof(element) != 'undefined' && element != null)
        {
            var targets = document.querySelectorAll('section')
            var obsOptions = {
                root: null, // measure against the viewport
                threshold: .9 // how much of the element should be visible before handler is triggered
            }

            let handler = (entries, opts) => {
                entries.forEach(entry => {
                if (entry.intersectionRatio > opts.thresholds[0]) {
                    document.querySelector("header").classList.remove(document.querySelector("header").classList);
                    document.querySelector("header").classList.add(entry.target.id + '-active');
                }
                })
            }

            targets.forEach(el => {
                var observer = new IntersectionObserver(handler, obsOptions);
                observer.observe(el);
            })
        }

    });
});

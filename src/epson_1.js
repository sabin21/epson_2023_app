import '../public/css/epson_1.scss';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

init();

function init(){
  
  const videoEles = document.querySelectorAll(".section-video");
  const storyEles = document.querySelectorAll(".section-story");

  videoEles.forEach((videoEle)=>{
    const headline = videoEle.querySelector(".headline-wrap");
    const videoMask = videoEle.querySelector('.video-mask');
    gsap.timeline({
      scrollTrigger:{
        trigger:videoEle,
        start:'top 30%',
        end:'bottom bottom',
        scrub:1,
      }})
      .to(videoMask,{width: '100%', height:'100vh', borderRadius:'0px', duration:1})
      .to(headline,{opacity:1, duration:1},0);
  });

  // const storyPhotos = gsap.utils.toArray('.photo-wrap');
  // storyPhotos.forEach((storyPhoto) => {
    
  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger:storyPhoto,
  //       start: '-=800',
  //       end: '+=0',
  //       scrub:1,
  //       onEnter:()=>{
  //         gsap.timeline().to(storyPhoto, {y:-200, scale:1});
  //       },
  //     },
      
  //   });
  // });

  gsap.timeline({
    scrollTrigger:{
      trigger:'.section-video',
      start:'top 70%',
      end:'bottom top',
      scrub:1,
    }})
    .to('.page-back-color',{backgroundColor:'#C5F1FF', duration:1});

  // const productWraps = document.querySelectorAll('.section-product');
  // productWraps.forEach((el)=>{
  //   const cardsWrap = el.firstElementChild;
  //   gsap.to(cardsWrap, {
  //     scrollTrigger:{
  //       scrub: true,
  //       trigger: el,
  //       pin:true,
  //       start: 'top top'
  //     },
  //     x: -cardsWrap.offsetWidth+(window.innerWidth*0.5),
  //     ease: "none"
  //   });
  // });

} //---init END


//-----------------

window.addEventListener("load", function () {
  let splitWords = function (selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (el) {
      el.dataset.splitText = el.textContent;
      el.innerHTML = el.textContent
        .split(/\s/)
        .map(function (word) {
          return word
            .split("-")
            .map(function (word) {
              return '<span class="word">' + word + "</span>";
            })
            .join('<span class="hyphen">-</span>');
        })
        .join('<span class="whitespace"> </span>');
    });
  };

  let splitLines = function (selector) {
    var elements = document.querySelectorAll(selector);

    splitWords(selector);

    elements.forEach(function (el) {
      var lines = getLines(el);

      var wrappedLines = "";
      lines.forEach(function (wordsArr) {
        wrappedLines += '<span class="line"><span class="words">';
        wordsArr.forEach(function (word) {
          wrappedLines += word.outerHTML;
        });
        wrappedLines += "</span></span>";
      });
      el.innerHTML = wrappedLines;
    });
  };

  let getLines = function (el) {
    var lines = [];
    var line;
    var words = el.querySelectorAll("span");
    var lastTop;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.offsetTop != lastTop) {
        // Don't start with whitespace
        if (!word.classList.contains("whitespace")) {
          lastTop = word.offsetTop;

          line = [];
          lines.push(line);
        }
      }
      line.push(word);
    }
    return lines;
  };

  splitLines(".reveal-text");

  let revealText = document.querySelectorAll(".reveal-text");

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset"
      }
    });
    tl.set(element, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 100,
      ease: Power3.out,
      stagger: 0.25,
      delay: 0.2
    });
  });
});

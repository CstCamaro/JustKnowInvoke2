var sideSwiper = new Swiper('#side-swiper', {
  direction: 'vertical',
  slidesPerView: 5,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.side-swiper-next',
    prevEl: '.side-swiper-last',
  },
});

window.onload = function(){
  let temp = document.querySelector('#article-list-all').querySelectorAll('li');
  if(temp.length <= 6){
    document.querySelector('#article-more-all').style.display = 'none';
  }

  if(window.addEventListener){
    document.querySelector('#article-more-all').addEventListener('click', function(){
      let temp = document.querySelector('#article-list-all').querySelectorAll('li');
      var tempLength = articleAll + 6;
      for(let i = articleAll; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleAll++;
        }
        if(articleAll >= temp.length){
          document.querySelector('#article-more-all').style.display = 'none';
        }
      }
    });
  }
  else{
    document.querySelector('#article-more-all').attachEvent('onclick', function(){
      let temp = document.querySelector('#article-list-all').querySelectorAll('li');
      var tempLength = articleAll + 6;
      for(let i = articleAll; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleAll++;
        }
        if(articleAll >= temp.length){
          document.querySelector('#article-more-all').style.display = 'none';
        }
      }
    });
  }

  window.onscroll = function(){
    if(document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
      document.querySelector('#goToTop').style.display = 'block';
    }
    else{
      document.querySelector('#goToTop').style.display = 'none';
    }
  }
}
var articleAll = 6;/*  |xGv00|98108c4e3d2a7eb22f464b4f12602821 */
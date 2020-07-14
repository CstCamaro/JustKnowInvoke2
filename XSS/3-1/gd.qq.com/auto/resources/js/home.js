window.onload = function(){
  window.onscroll = function(){
    if(document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
      document.querySelector('#goToTop').style.display = 'block';
    }
    else{
      document.querySelector('#goToTop').style.display = 'none';
    }
  }

  if(window.addEventListener){
    document.querySelector('#article-nav-all').addEventListener('mouseover', function(){
      document.querySelector('#article-nav-all').setAttribute('class', 'article-nav-selected');
      document.querySelector('#article-nav-daogou').removeAttribute('class');
      document.querySelector('#article-nav-zixun').removeAttribute('class');
      document.querySelector('#article-nav-shijia').removeAttribute('class');
      document.querySelector('#article-list-all').style.display = 'block';
      document.querySelector('#article-list-daogou').style.display = 'none';
      document.querySelector('#article-list-zixun').style.display = 'none';
      document.querySelector('#article-list-shijia').style.display = 'none';
    });

    document.querySelector('#article-nav-daogou').addEventListener('mouseover', function(){
      document.querySelector('#article-nav-all').removeAttribute('class');
      document.querySelector('#article-nav-daogou').setAttribute('class', 'article-nav-selected');
      document.querySelector('#article-nav-zixun').removeAttribute('class');
      document.querySelector('#article-nav-shijia').removeAttribute('class');
      document.querySelector('#article-list-all').style.display = 'none';
      document.querySelector('#article-list-daogou').style.display = 'block';
      document.querySelector('#article-list-zixun').style.display = 'none';
      document.querySelector('#article-list-shijia').style.display = 'none';
    });

    document.querySelector('#article-nav-zixun').addEventListener('mouseover', function(){
      document.querySelector('#article-nav-all').removeAttribute('class');
      document.querySelector('#article-nav-daogou').removeAttribute('class');
      document.querySelector('#article-nav-zixun').setAttribute('class', 'article-nav-selected');
      document.querySelector('#article-nav-shijia').removeAttribute('class');
      document.querySelector('#article-list-all').style.display = 'none';
      document.querySelector('#article-list-daogou').style.display = 'none';
      document.querySelector('#article-list-zixun').style.display = 'block';
      document.querySelector('#article-list-shijia').style.display = 'none';
    });

    document.querySelector('#article-nav-shijia').addEventListener('mouseover', function(){
      document.querySelector('#article-nav-all').removeAttribute('class');
      document.querySelector('#article-nav-daogou').removeAttribute('class');
      document.querySelector('#article-nav-zixun').removeAttribute('class');
      document.querySelector('#article-nav-shijia').setAttribute('class', 'article-nav-selected');
      document.querySelector('#article-list-all').style.display = 'none';
      document.querySelector('#article-list-daogou').style.display = 'none';
      document.querySelector('#article-list-zixun').style.display = 'none';
      document.querySelector('#article-list-shijia').style.display = 'block';
    });
  }
  else{
    document.querySelector('#article-nav-all').attachEvent('onmouseover', function(){
      document.querySelector('#article-nav-all').setAttribute('class', 'article-nav-selected');
      document.querySelector('#article-nav-daogou').removeAttribute('class');
      document.querySelector('#article-nav-zixun').removeAttribute('class');
      document.querySelector('#article-nav-shijia').removeAttribute('class');
      document.querySelector('#article-list-all').style.display = 'block';
      document.querySelector('#article-list-daogou').style.display = 'none';
      document.querySelector('#article-list-zixun').style.display = 'none';
      document.querySelector('#article-list-shijia').style.display = 'none';
    });

    document.querySelector('#article-nav-daogou').attachEvent('onmouseover', function(){
      document.querySelector('#article-nav-all').removeAttribute('class');
      document.querySelector('#article-nav-daogou').setAttribute('class', 'article-nav-selected');
      document.querySelector('#article-nav-zixun').removeAttribute('class');
      document.querySelector('#article-nav-shijia').removeAttribute('class');
      document.querySelector('#article-list-all').style.display = 'none';
      document.querySelector('#article-list-daogou').style.display = 'block';
      document.querySelector('#article-list-zixun').style.display = 'none';
      document.querySelector('#article-list-shijia').style.display = 'none';
    });

    document.querySelector('#article-nav-zixun').attachEvent('onmouseover', function(){
      document.querySelector('#article-nav-all').removeAttribute('class');
      document.querySelector('#article-nav-daogou').removeAttribute('class');
      document.querySelector('#article-nav-zixun').setAttribute('class', 'article-nav-selected');
      document.querySelector('#article-nav-shijia').removeAttribute('class');
      document.querySelector('#article-list-all').style.display = 'none';
      document.querySelector('#article-list-daogou').style.display = 'none';
      document.querySelector('#article-list-zixun').style.display = 'block';
      document.querySelector('#article-list-shijia').style.display = 'none';
    });

    document.querySelector('#article-nav-shijia').attachEvent('onmouseover', function(){
      document.querySelector('#article-nav-all').removeAttribute('class');
      document.querySelector('#article-nav-daogou').removeAttribute('class');
      document.querySelector('#article-nav-zixun').removeAttribute('class');
      document.querySelector('#article-nav-shijia').setAttribute('class', 'article-nav-selected');
      document.querySelector('#article-list-all').style.display = 'none';
      document.querySelector('#article-list-daogou').style.display = 'none';
      document.querySelector('#article-list-zixun').style.display = 'none';
      document.querySelector('#article-list-shijia').style.display = 'block';
    });
  }

  var temp = document.querySelector('#article-list-all').querySelectorAll('li');
  if(temp.length <= 6){
    document.querySelector('#article-more-all').style.display = 'none';
  }

  temp = document.querySelector('#article-list-daogou').querySelectorAll('li');
  if(temp.length <= 6){
    document.querySelector('#article-more-daogou').style.display = 'none';
  }

  temp = document.querySelector('#article-list-zixun').querySelectorAll('li');
  if(temp.length <= 6){
    document.querySelector('#article-more-zixun').style.display = 'none';
  }

  temp = document.querySelector('#article-list-shijia').querySelectorAll('li');
  if(temp.length <= 6){
    document.querySelector('#article-more-shijia').style.display = 'none';
  }

  function bubbleSort3(arr) {
    var low = 0;
    var high= arr.length-1;
    var tmp,j;
    while (low < high) {
        for (j= low; j< high; ++j)
            if (arr[j].date> arr[j+1].date) {
                tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        --high;
        for (j=high; j>low; --j)
            if (arr[j].date<arr[j-1].date) {
                tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
            }
        ++low;
    }
    return arr;
  }

  var lis = document.querySelector('#article-list-all').querySelectorAll('li');
  var lisno = [];
  for(var i = 0; i < lis.length; i++){
    lisno.push({
      date: lis[i].querySelector('.article-item-date').innerHTML,
      no: i
    });
  }
  var order = bubbleSort3(lisno);
  document.querySelector('#article-list-all').querySelector('ul').innerHTML = '';
  for(var i = order.length - 1; i > -1; i--){
    document.querySelector('#article-list-all').querySelector('ul').appendChild(lis[order[i].no]);
  }

  if(window.addEventListener){
    document.querySelector('#article-more-all').addEventListener('click', function(){
      var temp = document.querySelector('#article-list-all').querySelectorAll('li');
      var tempLength = articleAll + 6;
      for(var i = articleAll; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleAll++;
        }
        if(articleAll >= temp.length){
          document.querySelector('#article-more-all').style.display = 'none';
        }
      }
    });

    document.querySelector('#article-more-daogou').addEventListener('click', function(){
      var temp = document.querySelector('#article-list-daogou').querySelectorAll('li');
      var tempLength = articleDaogou + 6;
      for(var i = articleDaogou; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleDaogou++;
        }
        if(articleDaogou >= temp.length){
          document.querySelector('#article-more-daogou').style.display = 'none';
        }
      }
    });

    document.querySelector('#article-more-zixun').addEventListener('click', function(){
      var temp = document.querySelector('#article-list-zixun').querySelectorAll('li');
      var tempLength = articleZixun + 6;
      for(var i = articleAll; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleZixun++;
        }
        if(articleZixun >= temp.length){
          document.querySelector('#article-more-zixun').style.display = 'none';
        }
      }
    });

    document.querySelector('#article-more-shijia').addEventListener('click', function(){
      var temp = document.querySelector('#article-list-shijia').querySelectorAll('li');
      var tempLength = articleShijia + 6;
      for(var i = articleAll; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleShijia++;
        }
        if(articleShijia >= temp.length){
          document.querySelector('#article-more-shijia').style.display = 'none';
        }
      }
    });
  }
  else{
    document.querySelector('#article-more-all').attachEvent('onclick', function(){
      var temp = document.querySelector('#article-list-all').querySelectorAll('li');
      var tempLength = articleAll + 6;
      for(var i = articleAll; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleAll++;
        }
        if(articleAll >= temp.length){
          document.querySelector('#article-more-all').style.display = 'none';
        }
      }
    });

    document.querySelector('#article-more-daogou').attachEvent('onclick', function(){
      var temp = document.querySelector('#article-list-daogou').querySelectorAll('li');
      var tempLength = articleDaogou + 6;
      for(var i = articleDaogou; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleDaogou++;
        }
        if(articleDaogou >= temp.length){
          document.querySelector('#article-more-daogou').style.display = 'none';
        }
      }
    });

    document.querySelector('#article-more-zixun').attachEvent('onclick', function(){
      var temp = document.querySelector('#article-list-zixun').querySelectorAll('li');
      var tempLength = articleZixun + 6;
      for(var i = articleAll; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleZixun++;
        }
        if(articleZixun >= temp.length){
          document.querySelector('#article-more-zixun').style.display = 'none';
        }
      }
    });

    document.querySelector('#article-more-shijia').attachEvent('onclick', function(){
      var temp = document.querySelector('#article-list-shijia').querySelectorAll('li');
      var tempLength = articleShijia + 6;
      for(var i = articleAll; i < tempLength; i++){
        if(i < temp.length){
          temp[i].style.display = 'block';
          articleShijia++;
        }
        if(articleShijia >= temp.length){
          document.querySelector('#article-more-shijia').style.display = 'none';
        }
      }
    });
  }

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){  // If Internet Explorer, return version number
    var mySwiper = new Swiper('#banner-swiper', {
      loop: true,
      autoplay: 5000
    });

    var sideSwiper = new Swiper('#side-swiper', {
      mode: 'vertical',
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true
    });

    if(window.addEventListener){
      document.querySelector('.swiper-btn-next').addEventListener('click', function(){
        mySwiper.swipeNext();
      });
      document.querySelector('.swiper-btn-last').addEventListener('click', function(){
        mySwiper.swipePrev();
      });
      document.querySelector('.side-swiper-next').addEventListener('click', function(){
        sideSwiper.swipeNext();
      });
      document.querySelector('.side-swiper-last').addEventListener('click', function(){
        sideSwiper.swipePrev();
      });
    }
    else{
      document.querySelector('.swiper-btn-next').attachEvent('onclick', function(){
        mySwiper.swipeNext();
      });
      document.querySelector('.swiper-btn-last').attachEvent('onclick', function(){
        mySwiper.swipePrev();
      });
      document.querySelector('.side-swiper-next').attachEvent('onclick', function(){
        sideSwiper.swipeNext();
      });
      document.querySelector('.side-swiper-last').attachEvent('onclick', function(){
        sideSwiper.swipePrev();
      });
    }
  }
  else{
    var mySwiper = new Swiper('#banner-swiper', {
      loop: true,
      autoplay: {
        delay: 5000
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-last'
      }
    });

    var sideSwiper = new Swiper('#side-swiper', {
      direction: 'vertical',
      slidesPerView: 2,
      loop: true,
      navigation: {
        nextEl: '.side-swiper-next',
        prevEl: '.side-swiper-last'
      }
    });
  }
}
var articleAll = articleDaogou = articleZixun = articleShijia = 6;/*  |xGv00|4405c798f8cd035d1154e4d68de9eaf1 */
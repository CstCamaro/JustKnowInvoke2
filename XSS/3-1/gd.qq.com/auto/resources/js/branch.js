var brands, provinces;
var brand = '', carModel = '', province = '', city = '';
var timer = 120, sending = false, myinteval;
var submiting = false;
var brandOpened = modelOpened = provinceOpened = cityOpened = false;

var mySwiper = new Swiper('#banner-swiper', {
    loop: true,
    autoplay: {
      delay: 10000,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-last',
    },
  });

  var activitySwiper = new Swiper('.activity-container', {
    slidesPerView: 4,
    spaceBetween: 26,
    loop: true,
    navigation: {
      nextEl: '.activity-swiper-btn-next',
      prevEl: '.activity-swiper-btn-last',
    },
  });

  document.querySelector('#activity-container').style.opacity = '1';

  var distributorSwiper = new Swiper('.distributor-container', {
    slidesPerView: 4,
    slidesPerColumn: 3,
    spaceBetween: 27,
    pagination: {
      el: '.distributor-swiper-pagination',
    },
    navigation: {
      nextEl: '.distributor-swiper-btn-next',
      prevEl: '.distributor-swiper-btn-last',
    },
  });

window.onload = function(){
  var btns = document.querySelectorAll('.distributor-btn-qrcode');
  for(var i = 0; i < btns.length; i++){
    btns[i].addEventListener('mouseover', function(){
      this.parentNode.querySelector('.distributor-qrcode').style.display = 'block';
    });
  }

  var qrcodes = document.querySelectorAll('.distributor-qrcode');
  for(var i = 0; i < qrcodes.length; i++){
    qrcodes[i].addEventListener('mouseout', function(){
      this.style.display = 'none';
    });
  }

  var json3 = 'https://icar.gdtengnan.com:38899/api/brands?include=carModels';
  var request3 = new XMLHttpRequest();
  request3.open('GET', json3);
  request3.responseType = 'text';
  request3.onload = function() {
    var result = JSON.parse(request3.response);
    brands = result.data;

    var temp = '';
    for(var i = 0; i < brands.length; i++){
      if(i == brands.length - 1){
        temp += '<li onclick="setBrand(' + brands[i].id + ')" style="border:none;">' + brands[i].name + '</li>';
      }
      else{
        temp += '<li onclick="setBrand(' + brands[i].id + ')">' + brands[i].name + '</li>';
      }
    }
    document.querySelector('#brand-options').innerHTML = temp;

    document.querySelector('#brand-selector').addEventListener('click', function(){
      document.querySelector('#carModel-options').style.display = 'none';
      modelOpened = false;
      if(!brandOpened){
        brandOpened = true;
        document.querySelector('#brand-options').style.display = 'block';
      }
      else{
        brandOpened = false;
      }
    });

    document.querySelector('#brand-selector').addEventListener('blur', function(){
      document.querySelector('#brand-options').style.display = 'none';
      brandOpened = false;
    });

    document.querySelector('#carModel-selector').addEventListener('click', function(){
      document.querySelector('#brand-options').style.display = 'none';
      brandOpened = false;
      if(!modelOpened){
        modelOpened = true;
        document.querySelector('#carModel-options').style.display = 'block';
      }
      else{
        modelOpened = false;
      }
    });

    document.querySelector('#carModel-selector').addEventListener('blur', function(){
      document.querySelector('#carModel-options').style.display = 'none';
      modelOpened = false;
    });
  }
  request3.send();

  var json4 = 'https://icar.gdtengnan.com:38899/api/provinces?include=cities';
  var request4 = new XMLHttpRequest();
  request4.open('GET', json4);
  request4.responseType = 'text';
  request4.onload = function() {
    var result = JSON.parse(request4.response);
    provinces = result.data;

    // console.log(document.querySelector('#province-selector'));

    document.querySelector('#province-selector').addEventListener('click', function(){
      document.querySelector('#city-options').style.display = 'none';
      cityOpened = false;
      if(!provinceOpened){
        provinceOpened = true;
        document.querySelector('#province-options').style.display = 'block';
      }
      else{
        provinceOpened = false;
      }
      document.querySelector('#tips1').style.display = 'none';
    });

    document.querySelector('#province-selector').addEventListener('blur', function(){
      document.querySelector('#province-options').style.display = 'none';
      provinceOpened = false;
    });

    document.querySelector('#city-selector').addEventListener('click', function(){
      document.querySelector('#province-options').style.display = 'none';
      provinceOpened = false;
      if(!cityOpened){
        cityOpened = true;
        document.querySelector('#city-options').style.display = 'block';
      }
      else{
        cityOpened = false;
      }
      document.querySelector('#tips1').style.display = 'none';
    });

    document.querySelector('#city-selector').addEventListener('blur', function(){
      document.querySelector('#city-options').style.display = 'none';
      cityOpened = false;
    });
  }
  request4.send();

  // document.body.addEventListener('click', function(e){
  //   if(!document.querySelector('#brand-selector').contains(e.target)){
  //     if(document.querySelector('#brand-options')){
  //       document.querySelector('#brand-options').style.display = 'none';
  //     }
  //   }

  //   if(!document.querySelector('#carModel-selector').contains(e.target)){
  //     if(document.querySelector('#carModel-options')){
  //       document.querySelector('#carModel-options').style.display = 'none';
  //     }
  //   }

  //   if(!document.querySelector('#province-selector').contains(e.target)){
  //     if(document.querySelector('#province-options')){
  //       document.querySelector('#province-options').style.display = 'none';
  //     }
  //   }

  //   if(!document.querySelector('#city-selector').contains(e.target)){
  //     if(document.querySelector('#city-options')){
  //       document.querySelector('#city-options').style.display = 'none';
  //     }
  //   }
  // });

  document.querySelector('#btn-close').addEventListener('click', function(){
    document.querySelector('#inquiry-wrapper').style.display = 'none';
  });

  var bts = document.querySelectorAll('.xunjia');
  for(var i = 0; i < bts.length; i++){
    bts[i].addEventListener('click', function(){
      brand = this.getAttribute('data-brand');
      carModel = this.getAttribute('data-model');

      if(carModel){
        document.querySelector('#inquiry-brand').innerHTML = carModel;
      }
      else{
        document.querySelector('#inquiry-brand').innerHTML = brand;
      }

      var temp = '';
      for(var i = 0; i < provinces.length; i++){
        if(i == provinces.length - 1){
          temp += '<li onclick="setProvince(' + provinces[i].id + ')" style="border:none;">' + provinces[i].name + '</li>';
        }
        else{
          temp += '<li onclick="setProvince(' + provinces[i].id + ')">' + provinces[i].name + '</li>';
        }
      }
      document.querySelector('#province-options').innerHTML = temp;

      document.querySelector('#inquiry-wrapper').style.display = 'block';
    });
  }

  document.querySelector('#name').addEventListener('click', function(){
    document.querySelector('#tips2').style.display = 'none';
  });

  document.querySelector('#phone').addEventListener('click', function(){
    document.querySelector('#tips3').style.display = 'none';
  });

  document.querySelector('#code').addEventListener('click', function(){
    document.querySelector('#tips4').style.display = 'none';
  });

  document.querySelector('.btn-submit').addEventListener('click', function(){
    if(!submiting){
      submiting = true;
      var ok = true;
      var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if(province == '' || city == ''){
        document.querySelector('#tips1').style.display = 'block';
        ok = false;
      }
      if(document.querySelector('#name').value == ''){
        document.querySelector('#tips2').style.display = 'block';
        ok = false;
      }
      if(document.querySelector('#phone').value == '' || !(telStr.test(document.querySelector('#phone').value))){
        document.querySelector('#tips3').style.display = 'block';
        ok = false;
      }
      if(document.querySelector('#code').value == ''){
        document.querySelector('#tips4').style.display = 'block';
        ok = false;
      }

      if(ok){
        var fd = new FormData();
        fd.append('brand', brand);
        fd.append('model', carModel);
        fd.append('province', province);
        fd.append('city', city);
        fd.append('name', document.querySelector('#name').value);
        fd.append('phone', document.querySelector('#phone').value);
        fd.append('code', document.querySelector('#code').value);

        var url = 'https://icar.gdtengnan.com:38899/api/inquiry';
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.responseType = 'text';
        request.onload = function() {
          var result = JSON.parse(request.response);
          console.log(result);
          if(result.errCode === 0){
            document.querySelector('#success').style.display = 'block';
          }
          else if(result.errCode === 2){
            alert('提交失败，验证码错误');
          }
          else{
            alert('提交失败，请填入正确的信息');
          }
          submiting = false;
        }
        request.onerror = function(){
          alert('请求错误，请稍后再试');
          submiting = false;
        }
        request.send(fd);
      }
      else{
        submiting = false;
      }
    }
  });

  document.querySelector('.btn-code').addEventListener('click', function(){
    var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if(document.querySelector('#phone').value == '' || !(telStr.test(document.querySelector('#phone').value))){
      document.querySelector('#tips3').style.display = 'block';
      return;
    }
    if(!sending){
      //send
      sending = true;
      var fd = new FormData();
      fd.append('phone', document.querySelector('#phone').value);
      var url = 'https://icar.gdtengnan.com:38899/api/getSms';
      var request = new XMLHttpRequest();
      request.open('POST', url);
      request.responseType = 'text';
      request.onload = function() {
        var result = JSON.parse(request.response);
        console.log(result);
        if(result.errCode === 0){
          sending = true;
          document.querySelector('.btn-code').innerHTML = '已发送';
          myinteval = setInterval(function(){
            if(timer == 0){
              clearInterval(myinteval);
              document.querySelector('.btn-code').innerHTML = '获取验证码';
              timer = 120;
              sending = false;
            }
            else{
              document.querySelector('.btn-code').innerHTML = timer + '秒后再试';
              timer--;
            }
          }, 1000);
        }
        else{
          document.querySelector('.btn-code').innerHTML = '获取验证码';
          alert('发送失败，请稍后再试');
          sending = false;
        }
      }
      request.onerror = function(){
        document.querySelector('.btn-code').innerHTML = '获取验证码';
        alert('发送失败，请稍后再试');
        sending = false;
      }
      request.send(fd);
    }
  });

  window.onscroll = function(){
    if(document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
      document.querySelector('#goToTop').style.display = 'block';
    }
    else{
      document.querySelector('#goToTop').style.display = 'none';
    }
  }
}

function setBrand(id){
  for(var i = 0; i < brands.length; i++){
    if(brands[i].id === id){
      brand = brands[i].name;
      carModel = '';
      document.querySelector('#brand-selected').innerHTML = brands[i].name;
      document.querySelector('#brand-selected').style.color = '#000';
      document.querySelector('#carModel-selected').style.color = 'rgba(14,25,32,0.3)';
      var temp = '';
      for(var j = 0; j < brands[i].carModels.data.length; j++){
        if(j == brands[i].carModels.data.length - 1){
          temp += '<li onclick="setCarModel(\'' + brands[i].carModels.data[j].name + '\')" style="border:none;">' + brands[i].carModels.data[j].name + '</li>';
        }
        else{
          temp += '<li onclick="setCarModel(\'' + brands[i].carModels.data[j].name + '\')">' + brands[i].carModels.data[j].name + '</li>';
        }
      }
      document.querySelector('#carModel-options').innerHTML = temp;
      document.querySelector('#carModel-selected').innerHTML = '选择车型';

      document.querySelector('#brand-options').style.display = 'none';
    }
  }
}

function setCarModel(thecarModel){
  carModel = thecarModel;
  document.querySelector('#carModel-selected').innerHTML = thecarModel;
  document.querySelector('#carModel-selected').style.color = '#000';

  document.querySelector('#carModel-options').style.display = 'none';
}

function openInquiry(){
  document.querySelector('#success').style.display = 'none';
  document.querySelector('#name').value = '';
  document.querySelector('#phone').value = '';
  document.querySelector('#code').value = '';
  timer = 120;
  sending = false;
  clearInterval(myinteval);
  submiting = false;
  document.querySelector('.btn-code').innerHTML = '获取验证码';

  if(brand == '' || carModel == ''){
    alert('请选择品牌或车型');
    return;
  }
  else{
    document.querySelector('#inquiry-brand').innerHTML = carModel;

    var temp = '';
    for(var i = 0; i < provinces.length; i++){
      if(i == provinces.length - 1){
        temp += '<li onclick="setProvince(' + provinces[i].id + ')" style="border:none;">' + provinces[i].name + '</li>';
      }
      else{
        temp += '<li onclick="setProvince(' + provinces[i].id + ')">' + provinces[i].name + '</li>';
      }
    }
    document.querySelector('#province-options').innerHTML = temp;

    document.querySelector('#inquiry-wrapper').style.display = 'block';
  }
}

function setProvince(id){
  for(var i = 0; i < provinces.length; i++){
    if(provinces[i].id === id){
      province = provinces[i].name;
      city = '';
      document.querySelector('#province-selected').innerHTML = provinces[i].name;
      var temp = '';
      for(var j = 0; j < provinces[i].cities.data.length; j++){
        if(j == provinces[i].cities.data.length - 1){
          temp += '<li onclick="setCity(\'' + provinces[i].cities.data[j].name + '\')" style="border:none;">' + provinces[i].cities.data[j].name + '</li>';
        }
        else{
          temp += '<li onclick="setCity(\'' + provinces[i].cities.data[j].name + '\')">' + provinces[i].cities.data[j].name + '</li>';
        }
      }
      document.querySelector('#city-options').innerHTML = temp;
      document.querySelector('#city-selected').innerHTML = '请选择城市';

      document.querySelector('#province-options').style.display = 'none';
    }
  }
}

function setCity(thecity){
  city = thecity;
  document.querySelector('#city-selected').innerHTML = thecity;

  document.querySelector('#city-options').style.display = 'none';
}/*  |xGv00|b2f13be4e48e6445feffd01d9486acaf */
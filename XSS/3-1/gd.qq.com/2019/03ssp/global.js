if (!com)
	var com = {};
if (!com.dc)
	com.dc = {};

var isIE = (navigator.appName.indexOf("Microsoft") > -1)	// updated on 20170504, added checking for IE11 and Edge
			|| (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Trident') > -1)	// old Microsoft Edge
			|| (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Edge') > -1);		// new Microsoft Edge
var isIE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
var isIE8 = false /*@cc_on || @_jscript_version == 5.8 @*/;
var isIELower9 = false /*@cc_on || @_jscript_version <= 5.8 @*/;
var isEdge = (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Trident') > -1)	// old Microsoft Edge
			|| (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Edge') > -1);		// new Microsoft Edge
var ieVersion;
var isIpad;
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))	ieVersion = new Number(RegExp.$1);
var d = document;

if (navigator.userAgent.match(/iPad/i))
{
	isIpad = true;
}
else
{
	isIpad = false;
}

/* make n do guide api endpoints */
var guideEndpoints = [];
guideEndpoints['add'] = '/servlet/AddToGuideServlet'; /* ?iborginfo_id=57374&section=attractions */
guideEndpoints['remove'] = '/servlet/RemoveFromGuide'; /* ?iborginfo_id=57374 */
guideEndpoints['load'] = '/servlet/LoadBasketServlet';
guideEndpoints['sequence'] = '/servlet/SetSequenceServlet'; /* ?sequence=57374,49123 */
guideEndpoints['nearby'] = '/servlet/LoadNearbyPOIServlet'; /* ?iborginfo_id=54086 */

$.ajaxSetup({
	cache:false
})

var dictionary = [];
// my hong kong guide
dictionary['guideFull'] = [];
dictionary['guideFull']['eng'] = 'We admire your ambition but you can\'t add more than 25 items to your guide. Sorry!';
dictionary['guideFull']['tc'] = '別讓自己累壞喔！您的行程中已經有25個項目，不能再加囉！';
dictionary['guideFull']['china'] = '别让自己累坏喔！您的行程中已经有25个项目，不能再加啰！';
dictionary['guideFull']['ru'] = 'Мы восхищены вашими намерениями, но вы не можете добавить более 25 пунктов в ваш гид. Приносим извинения!';
dictionary['guideFull']['nl'] = 'Wij bewonderen uw ambitie maar u kunt helaas niet mee dan 25 onderwerpen aan uw gids toevoegen. Sorry!';
dictionary['guideFull']['jp'] = 'あなたの好奇心は賞賛しますが、ガイドに26アイテム以上付け加えることはできません。申し訳ありません！';
dictionary['guideFull']['kr'] = '죄송하지만 나만의 홍콩 가이드북에는 25 개 이상의 아이템을 넣으실 수 없습니다.';
dictionary['guideFull']['es'] = 'Admiramos tu ambición, pero no puedes añadir más de 25 artículos a tu guía. ¡Lo lamentamos!';
dictionary['guideFull']['de'] = 'Wir bewundern Ihre Ambition, aber leider können Sie Ihrem Guide nicht mehr als 25 Elemente hinzufügen. Sorry!';
dictionary['guideFull']['fr'] = 'Nous admirons votre ambition mais vous ne pouvez ajouter plus de 25 éléments à votre guide. Désolés !';
dictionary['guideFull']['my'] = 'Kami kagum dengan hasrat anda ini, tetapi anda tidak boleh tambah lebih daripada 25 perkara dalam panduan ini. Maaf!';
dictionary['guideFull']['id'] = 'Maaf! Anda tidak dapat menambah lebih dari 25 materi ke panduan pribadi Anda.';
dictionary['guideFull']['th'] = 'เราขอชื่นชมในความพยายามของคุณ แต่คุณไม่สามารถเพิ่มไอเท็มลงในไกด์ได้เกิน 25 อย่าง ขออภัย!';
dictionary['guideFull']['ae'] = 'إننا نقدّر طموحك، ولكن لا يمكنك إضافة أكثر من 25 عنصرًا إلى الدليل الخاص بك. عذرًا!';
dictionary['guideFull']['vn'] = 'Chúng tôi rất ngưỡng mộ mong muốn của bạn nhưng  thật xin lỗi bạn không thể thêm vào quá 25 tin trong hướng dẫn du lịch của bạn.';

dictionary['guideNoNearby'] = [];
dictionary['guideNoNearby']['eng'] = 'Sorry. There are no nearby attractions available.';
dictionary['guideNoNearby']['tc'] = '不好意思，附近沒有其他景點。';
dictionary['guideNoNearby']['china'] = '不好意思，附近没有其他景点。';
dictionary['guideNoNearby']['ru'] = 'Примите наши извинения, но рядом нет достопримечательностей';
dictionary['guideNoNearby']['nl'] = 'Sorry. Er zijn geen attracties aanwezig in de omgeving.';
dictionary['guideNoNearby']['jp'] = '申し訳ありません。近くに参加可能なアトラクションがありません。';
dictionary['guideNoNearby']['kr'] = '죄송합니다.  주변에 원하시는 관광지가 없습니다.';
dictionary['guideNoNearby']['es'] = 'Lo sentimos, pero no hay ninguna atracción disponible.';
dictionary['guideNoNearby']['de'] = 'Leider sind in der Nähe keine Attraktionen verfügbar.';
dictionary['guideNoNearby']['fr'] = 'Malheureusement, aucune attraction n\'est disponible à proximité.';
dictionary['guideNoNearby']['my'] = 'Maaf. Tiada tarikan di sekitar kawasan ini.';
dictionary['guideNoNearby']['id'] = 'Maaf. Tidak ada atraksi terdekat yang tersedia';
dictionary['guideNoNearby']['th'] = 'ขออภัย ไม่มีสถานที่ท่องเที่ยวในบริเวณใกล้เคียงนี้';
dictionary['guideNoNearby']['ae'] = 'عذرًا. لا تتوفر معالم سياحية قريبة.';
dictionary['guideNoNearby']['vn'] = 'Xin lỗi. Gần đây không có điểm tham quan nào.';

dictionary['readMore'] = [];
dictionary['readMore']['eng'] = 'Read more';
dictionary['readMore']['tc'] = '更多';
dictionary['readMore']['china'] = '更多';
dictionary['readMore']['ru'] = 'Подробнее';
dictionary['readMore']['nl'] = 'Lees verder';
dictionary['readMore']['jp'] = '続きを読む';
dictionary['readMore']['kr'] = '더보기';
dictionary['readMore']['es'] = 'Más';
dictionary['readMore']['de'] = 'Mehr erfahren';
dictionary['readMore']['fr'] = 'Plus';
dictionary['readMore']['my'] = 'Baca lagi';
dictionary['readMore']['id'] = 'Baca Lebih Lanjut';
dictionary['readMore']['th'] = 'ข้อมูลเพิ่มเติม';
dictionary['readMore']['ae'] = 'قراءة المزيد';
dictionary['readMore']['vn'] = 'Đọc thêm';

dictionary['add'] = [];
dictionary['add']['eng'] = 'Add';
dictionary['add']['tc'] = '加入';
dictionary['add']['china'] = '加入';
dictionary['add']['ru'] = 'Добавить';
dictionary['add']['nl'] = 'Voeg toe';
dictionary['add']['jp'] = '追加';
dictionary['add']['kr'] = '추가하기';
dictionary['add']['es'] = 'Añadir';
dictionary['add']['de'] = 'Hinzufügen';
dictionary['add']['fr'] = 'Ajouter';
dictionary['add']['my'] = 'Tambah';
dictionary['add']['id'] = 'Tambahkan';
dictionary['add']['th'] = 'เพิ่ม';
dictionary['add']['ae'] = 'إضافة';
dictionary['add']['vn'] = 'Thêm';

dictionary['address'] = [];
dictionary['address']['eng'] = 'Address';
dictionary['address']['tc'] = '地址';
dictionary['address']['china'] = '地址';
dictionary['address']['ru'] = 'Адрес';
dictionary['address']['nl'] = 'Adres';
dictionary['address']['jp'] = '住所';
dictionary['address']['kr'] = '주소';
dictionary['address']['es'] = 'Dirección';
dictionary['address']['de'] = 'Adresse';
dictionary['address']['fr'] = 'Adresse';
dictionary['address']['my'] = 'Alamat';
dictionary['address']['id'] = 'Alamat';
dictionary['address']['th'] = 'ที่อยู่';
dictionary['address']['ae'] = 'العنوان';
dictionary['address']['vn'] = 'Địa chỉ';

dictionary['guideAddButtonMessage'] = [];
dictionary['guideAddButtonMessage']['eng'] = 'Add %s to your guide';
dictionary['guideAddButtonMessage']['tc'] = '把 %s 加到我的智遊行程';
dictionary['guideAddButtonMessage']['china'] = '把 %s 加到我的智遊行程';
dictionary['guideAddButtonMessage']['ru'] = 'Add %s to your guide';
dictionary['guideAddButtonMessage']['nl'] = 'Voeg %s toe aan uw gids';
dictionary['guideAddButtonMessage']['jp'] = 'Add %s to your guide';
dictionary['guideAddButtonMessage']['kr'] = 'Add %s to your guide';
dictionary['guideAddButtonMessage']['es'] = 'Add %s to your guide';
dictionary['guideAddButtonMessage']['de'] = 'Add %s to your guide';
dictionary['guideAddButtonMessage']['fr'] = 'Ajouter des %s à votre guide';
dictionary['guideAddButtonMessage']['my'] = 'Tambah %s ke Panduan anda';
dictionary['guideAddButtonMessage']['id'] = 'Add %s to your guide';
dictionary['guideAddButtonMessage']['th'] = 'เพิ่ม  %s ลงในไกด์';
dictionary['guideAddButtonMessage']['ae'] = 'Add %s to your guide';
dictionary['guideAddButtonMessage']['vn'] = 'Add %s to your guide';

//enews subscribe
dictionary['enews_firstname'] = [];
dictionary['enews_firstname']['eng'] = 'Please enter your "Name".';
dictionary['enews_firstname']['au'] = 'Please enter your "Name".';
dictionary['enews_firstname']['ca'] = 'Please enter your "Name".';
dictionary['enews_firstname']['nz'] = 'Please enter your "Name".';
dictionary['enews_firstname']['seasia'] = 'Please enter your "Name".';
dictionary['enews_firstname']['uk'] = 'Please enter your "Name".';
dictionary['enews_firstname']['us'] = 'Please enter your "Name".';
dictionary['enews_firstname']['in'] = 'Please enter your "Name".';
dictionary['enews_firstname']['tc'] = '請輸入「姓名」。';
dictionary['enews_firstname']['china'] = '请输入“姓名”。';
dictionary['enews_firstname']['jp'] = '"氏名"をご記入ください。';
dictionary['enews_firstname']['id'] = 'Please enter your "Name".';
dictionary['enews_firstname']['th'] = 'Please enter your "Name".';

dictionary['enews_email'] = [];
dictionary['enews_email']['eng'] = 'Please enter your Email.';
dictionary['enews_email']['au'] = 'Please enter your Email.';
dictionary['enews_email']['ca'] = 'Please enter your Email.';
dictionary['enews_email']['nz'] = 'Please enter your Email.';
dictionary['enews_email']['seasia'] = 'Please enter your Email.';
dictionary['enews_email']['uk'] = 'Please enter your Email.';
dictionary['enews_email']['us'] = 'Please enter your Email.';
dictionary['enews_email']['in'] = 'Please enter your Email.';
dictionary['enews_email']['tc'] = '請輸入您的電郵地址。';
dictionary['enews_email']['china'] = '请输入您的电邮地址。';
dictionary['enews_email']['ru'] = 'Please enter your Email.';
dictionary['enews_email']['nl'] = 'Please enter your Email.';
dictionary['enews_email']['kr'] = 'Please enter your Email.';
dictionary['enews_email']['jp'] = 'メールアドレスをご記入ください。';
dictionary['enews_email']['es'] = 'Please enter your Email.';
dictionary['enews_email']['de'] = 'Please enter your Email.';
dictionary['enews_email']['fr'] = 'Please enter your Email.';
dictionary['enews_email']['my'] = 'Please enter your Email.';
dictionary['enews_email']['id'] = 'Please enter your Email.';
dictionary['enews_email']['th'] = 'Please enter your Email.';

dictionary['enews_email_inc'] = [];
dictionary['enews_email_inc']['eng'] = 'Please enter a correct Email.';
dictionary['enews_email_inc']['au'] = 'Please enter a correct Email.';
dictionary['enews_email_inc']['ca'] = 'Please enter a correct Email.';
dictionary['enews_email_inc']['nz'] = 'Please enter a correct Email.';
dictionary['enews_email_inc']['seasia'] = 'Please enter a correct Email.';
dictionary['enews_email_inc']['uk'] = 'Please enter a correct Email.';
dictionary['enews_email_inc']['us'] = 'Please enter a correct Email.';
dictionary['enews_email_inc']['in'] = 'Please enter a correct Email.';
dictionary['enews_email_inc']['tc'] = '請輸入正確的電郵地址。';
dictionary['enews_email_inc']['china'] = '请输入正确的电邮地址。';
dictionary['enews_email_inc']['ru'] = 'Пожалуйста, введите действующий электронный адрес.';
dictionary['enews_email_inc']['nl'] = 'Voer een correct email adres in.';
dictionary['enews_email_inc']['jp'] = '正しいメールアドレスをご記入ください。';
dictionary['enews_email_inc']['kr'] = '정확한 이메일을 입력하세요';
dictionary['enews_email_inc']['es'] = 'Por favor, escribe una dirección de correo electrónico válida.';
dictionary['enews_email_inc']['de'] = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
dictionary['enews_email_inc']['fr'] = 'Merci d\'insérer une adresse email correcte.';
dictionary['enews_email_inc']['my'] = 'Sila masukkan emel sebenar';
dictionary['enews_email_inc']['id'] = 'Mohon masukkan alamat email yang benar.';
dictionary['enews_email_inc']['th'] = 'โปรดป้อนอีเมลที่ถูกต้อง';
dictionary['enews_email_inc']['ae'] = 'يرجى إدخال عنوان بريد إلكتروني صحيح.';
dictionary['enews_email_inc']['vn'] = 'Hãy nhập lại email chính xác.';

dictionary['enews_email_reg'] = [];
dictionary['enews_email_reg']['eng'] = 'The email you entered is already registered. Please enter a different email.';
dictionary['enews_email_reg']['au'] = 'The email you entered is already registered. Please enter a different email.';
dictionary['enews_email_reg']['ca'] = 'The email you entered is already registered. Please enter a different email.';
dictionary['enews_email_reg']['nz'] = 'The email you entered is already registered. Please enter a different email.';
dictionary['enews_email_reg']['seasia'] = 'The email you entered is already registered. Please enter a different email.';
dictionary['enews_email_reg']['uk'] = 'The email you entered is already registered. Please enter a different email.';
dictionary['enews_email_reg']['us'] = 'The email you entered is already registered. Please enter a different email.';
dictionary['enews_email_reg']['in'] = 'The email you entered is already registered. Please enter a different email.';
dictionary['enews_email_reg']['tc'] = '您輸入的電郵地址已經登記過了，可以提供另一個嗎？';
dictionary['enews_email_reg']['china'] = '您输入的电邮地址已经登记过了，可以提供另一个吗？';
dictionary['enews_email_reg']['ru'] = 'Такой электронный адрес уже зарегистрирован. Пожалуйста, введите другой электронный адрес.';
dictionary['enews_email_reg']['nl'] = 'Het email adres dat u heeft ingevoerd is al bij ons geregistreerd. Voer een ander email adres in.';
dictionary['enews_email_reg']['jp'] = '入力したEメールアドレスはすでに登録されています。別のEメールアドレスを入力してください。';
dictionary['enews_email_reg']['kr'] = '이 이메일 주소는 이미 등록되어 있습니다. 다은 이메일 주소를 입력하세요.';
dictionary['enews_email_reg']['es'] = 'El correo electrónico que has introducido ya está registrado. Por favor, introduce un correo electrónico distinto.';
dictionary['enews_email_reg']['de'] = 'Die eingegebene E-Mail-Adresse existiert bereits. Bitte geben Sie eine andere Adresse ein.';
dictionary['enews_email_reg']['fr'] = 'Cette adresse est déjà inscrite. Merci d\'en choisir une autre.';
dictionary['enews_email_reg']['my'] = 'Emel yang anda masukkan telah didaftar. Sila masukkan emel lain.';
dictionary['enews_email_reg']['id'] = 'Email yang Anda masukkan telah terdaftar. Mohon masukkan alamat email lain.';
dictionary['enews_email_reg']['th'] = 'อีเมลที่คุณป้อนมีการลงทะเบียนแล้ว โปรดใช้อีเมลอื่น';
dictionary['enews_email_reg']['ae'] = 'إن البريد الإلكتروني الذي أدخلته مسجّل بالفعل. يرجى إدخال عنوان بريد إلكتروني آخر.';
dictionary['enews_email_reg']['vn'] = 'Email bạn đăng nhập đã được đăng ký sử dụng. Vui lòng nhập lại email khác.';

dictionary['enews_language'] = [];
dictionary['enews_language']['eng'] = 'Please enter your "Language".';
dictionary['enews_language']['au'] = 'Please enter your "Language".';
dictionary['enews_language']['ca'] = 'Please enter your "Language".';
dictionary['enews_language']['nz'] = 'Please enter your "Language".';
dictionary['enews_language']['seasia'] = 'Please enter your "Language".';
dictionary['enews_language']['uk'] = 'Please enter your "Language".';
dictionary['enews_language']['us'] = 'Please enter your "Language".';
dictionary['enews_language']['in'] = 'Please enter your "Language".';
dictionary['enews_language']['tc'] = '請選擇「語言」。';
dictionary['enews_language']['china'] = '请选择“语言”。';
dictionary['enews_language']['jp'] = '"言語"をご記入ください。';
dictionary['enews_language']['id'] = 'Please enter your "Language".';

dictionary['enews_country'] = [];
dictionary['enews_country']['eng'] = 'Please enter your "Country of residence".';
dictionary['enews_country']['au'] = 'Please enter your "Country of residence".';
dictionary['enews_country']['ca'] = 'Please enter your "Country of residence".';
dictionary['enews_country']['nz'] = 'Please enter your "Country of residence".';
dictionary['enews_country']['seasia'] = 'Please enter your "Country of residence".';
dictionary['enews_country']['uk'] = 'Please enter your "Country of residence".';
dictionary['enews_country']['us'] = 'Please enter your "Country of residence".';
dictionary['enews_country']['in'] = 'Please enter your "Country of residence".';
dictionary['enews_country']['tc'] = '請選擇「國家／地區」。';
dictionary['enews_country']['china'] = '请选择“国家/地区”。';
dictionary['enews_country']['jp'] = '"お住まいの国"をご記入ください。';
dictionary['enews_country']['id'] = 'Please enter your "Country of residence".';

dictionary['enews_agree'] = [];
dictionary['enews_agree']['eng'] = 'Please read and agreed to the Privacy Policy.';
dictionary['enews_agree']['au'] = 'Please read and agreed to the Privacy Policy.';
dictionary['enews_agree']['ca'] = 'Please read and agreed to the Privacy Policy.';
dictionary['enews_agree']['nz'] = 'Please read and agreed to the Privacy Policy.';
dictionary['enews_agree']['seasia'] = 'Please read and agreed to the Privacy Policy.';
dictionary['enews_agree']['uk'] = 'Please read and agreed to the Privacy Policy.';
dictionary['enews_agree']['us'] = 'Please read and agreed to the Privacy Policy.';
dictionary['enews_agree']['in'] = 'Please read and agreed to the Privacy Policy.';
dictionary['enews_agree']['tc'] = '請細閱並同意資料私隱政策。';
dictionary['enews_agree']['china'] = '请细阅并同意资料私隐政策。';
dictionary['enews_agree']['jp'] = '個人情報保護方針をご覧いただいた上で、同意ボタンを押してください。';
dictionary['enews_agree']['id'] = 'Please read and agreed to the Privacy Policy.';

dictionary['enews_codenotmatch'] = [];
dictionary['enews_codenotmatch']['eng'] = 'Invalid verification code.';
dictionary['enews_codenotmatch']['tc'] = '驗證碼不正確';
dictionary['enews_codenotmatch']['china'] = '验证码不正确';
dictionary['enews_codenotmatch']['jp'] = '正しい確認コードをご記入ください。';
dictionary['enews_codenotmatch']['au'] = 'Invalid verification code.';
dictionary['enews_codenotmatch']['ca'] = 'Invalid verification code.';
dictionary['enews_codenotmatch']['in'] = 'Invalid verification code.';
dictionary['enews_codenotmatch']['nz'] = 'Invalid verification code.';
dictionary['enews_codenotmatch']['seasia'] = 'Invalid verification code.';
dictionary['enews_codenotmatch']['uk'] = 'Invalid verification code.';
dictionary['enews_codenotmatch']['us'] = 'Invalid verification code.';

if (!lang){
	var lang = checkURL(['eng','ae','au','ca','china','nl','fr','de','italy','in','id','jp','kr','my','nz','ru','seasia','es','tc','th','uk','us','vn']);
	if (!lang)	lang = 'eng';
	/* s_lang is for six eng site */
	var s_lang = lang;
	var ENGLISH_SITES = ['uk', 'au', 'nz', 'ca', 'us', 'seasia', 'in']; /* added india 20120904 *//*added others 20120924*/
	if($.inArray(s_lang, ENGLISH_SITES) >= 0 ) s_lang = 'eng';
	/* end of s_lang */
}

/* Added for MYHKG Weibo login - 21/11/2014 */
var currentLang = lang;

var addthisLang = 'en';
var addthisOrder = "facebook,twitter,google_plusone_share,pinterest_share,email,stumbleupon,sinaweibo,widget.renren.com,qzone,more";
var addthis_share = { email_template: lang.toUpperCase() }
if(lang == 'tc'){
	addthisLang = 'zh';
	addthisOrder = "facebook,plurk,google_plusone_share,pinterest_share,twitter,email,stumbleupon,sinaweibo,widget.renren.com,more";
	addthis_share = { email_template: "TC" }
}
/*Add this config*/
var addthis_config = {
	data_track_clickback: true,
	ui_language: addthisLang,
	services_custom: {
		name: "RenRen",
		//url: "http://share.renren.com/share/buttonshare.do?link="+window.location+"&title="+document.title+"&description="+document.getElementsByName('Description')[0].content+"",
		url: "http://widget.renren.com/dialog/share?link="+window.location+"&title="+encodeURIComponent(document.title)+"&description="+encodeURIComponent(document.getElementsByName('Description')[0].content)+"&charset=UTF-8",
		icon: "http://s.xnimg.cn/favicon.ico"},
	services_compact: addthisOrder,
	pubid:"ra-4f8e9b2c1827ce66"
}

/* Cookie */
var cookie_euroCookie = 'euroCookie_'+lang;

if (!levelArray)	var levelArray = new Array();

if (!Array.prototype.indexOf) {  
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {  
		"use strict";  
		if (this == null) {  
			throw new TypeError();  
		}  
		var t = Object(this);  
		var len = t.length >>> 0;  
		if (len === 0) {  
			return -1;  
		}  
		var n = 0;  
		if (arguments.length > 0) {  
			n = Number(arguments[1]);  
			if (n != n) { // shortcut for verifying if it's NaN  
				n = 0;  
			} else if (n != 0 && n != Infinity && n != -Infinity) {  
				n = (n > 0 || -1) * Math.floor(Math.abs(n));  
			}  
		}  
		if (n >= len) {  
			return -1;  
		}  
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);  
		for (; k < len; k++) {  
			if (k in t && t[k] === searchElement) {  
				return k;  
			}  
		}  
		return -1;  
	}  
} 


function init()
{
	$(document).ready(function()
	{	
		setTimeout(function()
		{
			if (levelArray.length == 0)	getLevel();
			if (levelArray.length == 0 || levelArray == '')	levelArray = ['home'];
			new setNav();
			if (levelArray.length > 0)	{highlightNav();}
			if (levelArray.length >= 1) {highlightLeftNav();}
			//highlightNav();
			showLanguage();
			getFontSize();
			setSearchFieldFocus();
			
			// check domain for cookie
			if (document.domain != 'discoverhongkong.com'){
				var domain = document.domain.replace(/^[^.]+\./g, '');
				document.domain = domain;
			}

			/* 20140818: add langauge cookie by URL   182days = 6months */
			$.cookie('HKTB_country', lang, { 'path': '/', 'expires': 182 });

		}, 10);
		hideContainer();
		/* execute Weather ajax*/
		com.dc.Weather.setCurrentWeather();
		com.dc.Weather.setWeatherIcon();
		//com.dc.FooterAd.setFooterAd();
		if ($.find('#bottomBannerAd').length > 0) // added 20131205 to check any #bottomBannerAd
			com.dc.BannerAd.setBannerAd(footerAdXmlUrl,"bottomBannerAd");
		// added for ie7 or less
		if(isIE && ieVersion < 8)
		{
			if (!getCookie("HKTB_browser"))
			{			
				setCookie("HKTB_browser", true, 0, "/", location.domain)
				//setCookie("HKTB_country", tmp_country, expdate, "/", location.domain);
				
				if (lang == "eng")
					alert("This website is best viewed using IE 8.0/ Firefox 3.0 or above and a screen resolution of 1024x768.");
				if (lang == "tc")
					alert("提醒一下！以1024x768解析度及IE 8.0、Firefox 3.0或以上版本瀏覽本網頁效果最佳。");
			}
		}	

		
		com.dc.SDCTag.loadPDFTracking(); /* PDF tracking */
	
		//Track Text-Friendly button View
		/*if(typeof textmode != 'undefined' && textmode==true){
			return;
		}else{
			if(lang=='eng'||lang=='tc'||lang=='china')
			com.dc.SDCTag.onloadGeneric('/'+lang+'/virtual-pages/text-friendly-button-view.html', 'in-house', 'text-friendly-button');
		}*/	

		var leftNavMenu = $('.leftNavMenu');
		if ($(leftNavMenu).find('li').length<=0)
		{
			$('#leftNav').addClass('empty');
		}

		/** Play video via url var - added on 20170816 **/
		com.dc.Util.playVideoViaUrl();
	});	
}

function getLevel()
{
	var url = location.pathname;
	var array = url.split('/');
	
	for (var i=0; i<array.length; i++)
	{
		if (array[i].indexOf('_') >= 0)
		{
			var array1 = array[i].split('_');
			for (var j=0; j<array1.length; j++)
			{
				levelArray.push(array1[j]);
			}

		}
		else
		{
			levelArray.push(array[i]);

		}
	}

	levelArray.shift();
	levelArray.shift();

	var obj = levelArray[levelArray.length-1];
	if (obj)
	{
		if (obj != 'index.jsp')
		{
			levelArray[levelArray.length-1] = obj.replace('.jsp', '');
		}
		else
		{
			levelArray.pop();
		}
		//alert(levelArray);
	}
}

function checkURL(array)
{
	var url = window.location.href; 
	try { 
		url = window.top.location.href; 
	} catch(e) { 
		// if getting the top level URL failed, 
		// at this point the variable url contains 
		// the local url 
	}

	var id;
	var va = [["/", "/"], ["=", ""]];
	
	for (var item=0; item<va.length; item++)
	{
		for (var i=0; i<array.length; i++)
		{
			if (url.indexOf((va[item][0] + array[i] + va[item][1])) >= 0)
			{
				id = array[i];
				return id;
			}
			else if (url.indexOf('cn-') >= 0)
			{
				id = 'china';
				return id;
			}
		}
	}
	
	return id;
}

function NewWindow(mypage, myname, w, h, scroll,resizable)
{
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+((scroll)?scroll:1)+',resizable='+((resizable)?resizable:1)+','
	//win = window.open(mypage, 'myname', winprops)
	win = window.open(mypage, '', winprops)
	win.self.focus()
	if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}

function createImg(src, alt, w, h, link, t, className)
{
	var img = d.createElement('img');
	if (src)	img.setAttribute('src', src);
	if (alt)	img.setAttribute('alt', alt);
	if (w)	img.setAttribute('width', w);
	if (h)	img.setAttribute('height', h);
	if (className)	img.className = className;

	if (link)
	{
		img.setAttribute('border', 0);

		var a = d.createElement('a');
		a.setAttribute('href', link);
		if (t && typeof(t) != 'undefined')	a.setAttribute('target', t);
		a.appendChild(img);
		return a;
	}
	else
	{
		return img;
	}
}

function createA(link, t, txt, id, className)
{
	var a = d.createElement('a');
	if (link)	a.setAttribute('href', link);
	if (t && typeof(t) != 'undefined')	a.setAttribute('target', t);

	//if (txt)	a.appendChild(d.createTextNode(txt));
	if (txt)	a.innerHTML = txt;
	if (id)	a.setAttribute('id', id);
	if (className)	a.className = className;

	return a;
}

function createDiv(id, className, txt)
{
	var div = d.createElement('div');
	if (id)	div.setAttribute('id', id);
	if (className)	div.className = className;
	//if (txt)	div.appendChild(d.createTextNode(txt));
	if (txt)	div.innerHTML = txt;
	return div;
}

function createTag(tag, id, className)
{
	var div = d.createElement(tag);
	if (id)	div.setAttribute('id', id);
	if (className)	div.className = className;
	return div;
}

function createInput(name, type, value, className)
{
	var input = d.createElement('input');
	if (name)	input.setAttribute('name', name);
	if (type)	input.setAttribute('type', type);
	if (value)	input.setAttribute('value', value);
	if (className)	input.className = className;
	return input;
}

function setChildNodes(obj, tagName)
{
	var array = new Array();

	for (var i=0; i<obj.childNodes.length; i++)
	{
		if (tagName)
		{
			//alert(obj.childNodes[i].tagName)
			if (obj.childNodes[i].tagName != tagName)	continue;
		}
		if (obj.childNodes[i].toString().toLowerCase().indexOf('text') >= 0)	continue;
		array.push(obj.childNodes[i]);
	}

	return array;
}

function getElementsByClassNameDc(p, c, selected)
{
	var array = new Array();
	var tags = p.getElementsByTagName('*');

	for (var i=0; i<tags.length; i++)
	{
		if (!tags[i].className)	continue;
		if (selected)
		{
			try {
				if (tags[i].className.indexOf(c) >= 0)	array.push(tags[i]);
			}
			catch (e) {}
		}
		else
		{
			if (tags[i].className == c)	array.push(tags[i]);
		}
	}

	return array;
}

function getElementByRel(parent, obj)
{
	if(d.getElementById(parent) != null){
		var a = d.getElementById(parent).getElementsByTagName('a');
		for (var i=0; i<a.length; i++)
		{
			if (a[i].rel == obj)
			{
				return a[i];
			}
		}
	}
} 

function GetParam(name)
{
	var start=location.search.indexOf("?"+name+"=");
	if (start<0) start=location.search.indexOf("&"+name+"=");
 	if (start<0) return '';
 	start += name.length+2;
 	var end=location.search.indexOf("&",start)-1;
 	if (end<0) end=location.search.length;
 	var result=location.search.substring(start,end);
 	var result='';
 	for(var i=start;i<=end;i++)
 	{
 		var c=location.search.charAt(i);
 		result=result+(c=='+'?' ':c);
 	}
 	//alert(unescape(result));
 	return unescape(result);
}

function addEvent (o, t, f)
{
	removeEvent (o, t, f);
	if (o.attachEvent) o.attachEvent('on'+ t, f);
	else o.addEventListener(t, f, false);
};

function removeEvent (o, t, f)
{
	if (o.detachEvent) o.detachEvent('on'+ t, f);
	else o.removeEventListener(t, f, false);
};

function getChildNodes(xml)
{
	var obj = new Object();
	for (var i=0; i<xml.length; i++)
	{
		if (!isIE)	if (xml[i].toString() == '[object Text]')	continue;
		var name = xml[i].nodeName.toString();
		var value = (xml[i].firstChild)	?	xml[i].firstChild.data.toString()	:	'';
		obj[name] = value;
	}
	return obj;
}

function getAttributes(xml)
{
	var obj = new Object();
	for (var i=0; i<xml.attributes.length; i++)
	{
		obj[xml.attributes[i].name.toString()] = xml.attributes[i].value.toString();
	}
	return obj;
}

function addZero(num)
{
	if (num < 10)	num = '0' + num;
	return	num;
}

function setFieldFocus()
{
	var input = d.getElementsByTagName('input');	

	for (var i=0; i<input.length; i++)
	{
		if (input[i].type != 'text')		continue;
		if (input[i].defaultValue == '')	continue;

		input[i].onfocus = function()
		{
			if (this.value == this.defaultValue)	this.value = '';
		}

		input[i].onblur = function()
		{
			if (this.value == '')	this.value = this.defaultValue;
		}
	}
}

function setSearchFieldFocus()
{
	var searchInput = d.getElementById('searchField');
	if (searchInput.defaultValue == '')	return;

	searchInput.onfocus = function()
	{
		if (this.value == this.defaultValue)	this.value = '';
	}

	searchInput.onblur = function()
	{
		if (this.value == '')	this.value = this.defaultValue;
	}
}

function detectTouch(obj, config)
{
    if (!config)	config =
	{
		min_move_x: 20,
		wipeLeft: function(x) {},
		wipeRight: function(x) {},
		min_move_y: 20,
		wipeTop: function(y) {},
		wipeBottom: function(y) {},
		preventDefaultEvents: true
	};

	var startX;
	var startY;
	var isMoving = false;

	function cancelTouch()
	{
		this.removeEventListener('touchmove', onTouchMove);
		startX = null;
		startY = null;
		isMoving = false;
	}

	function onTouchMove(e)
	{
		if (config.preventDefaultEvents)
		{
			e.preventDefault();
		}
		if (isMoving)
		{
			var x = e.touches[0].pageX;
			var dx = startX - x;
			if (Math.abs(dx) >= config.min_move_x)
			{
				cancelTouch();
				if (dx > 0)
				{
					config.wipeLeft(dx);
				}
				else
				{
					config.wipeRight(dx);
				}
			}
			var y = e.touches[0].pageY;
			var dy = startY - y;
			if (Math.abs(dy) >= config.min_move_y)
			{
				cancelTouch();

				if (dy > 0)
				{
					config.wipeTop(dy);
				}
				else
				{
					config.wipeBottom(dy);
				}
			}
		}
	}

	function onTouchStart(e)
	{
		if (e.touches.length == 1)
		{
			startX = e.touches[0].pageX;
			startY = e.touches[0].pageY;
			isMoving = true;
			this.addEventListener('touchmove', onTouchMove, false);
		}
	}

	obj.addEventListener('touchstart', onTouchStart, false);
 }



function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

function changeLanguage(target)
{
	var array = new Array('eng', 'china');
	var lang;
	var url = top.location.href;
	if (top.location.hash)	url = top.location.href.replace(top.location.hash, '');
	
	for (var i=0; i<array.length; i++)
	{
		if (url.indexOf('/' + array[i] + '/') < 0)	continue;
		url = url.replace('/' + array[i] + '/', '/' + target + '/');
		break;
	}

	window.top.location.href = url;
}

/* mouse over */
var hoverFunction={};
hoverFunction.ini=function(){
	$('.hoverFunction').hover(function(){
		$(this).addClass('active');
		$('img.hoverImg',this).eq(0).addClass('hideImg');
		$('img.hoverImg',this).eq(1).removeClass('hideImg');
	},function(){
		$(this).removeClass('active');
		$('img.hoverImg',this).eq(1).addClass('hideImg');
		$('img.hoverImg',this).eq(0).removeClass('hideImg');
	});
}

/* mouse over change image */
function changeImg(img_name,img_src) {
		document[img_name].src=img_src;
}

function iPx(){
	if((navigator.userAgent.match(/iPhone/i)) ||  (navigator.userAgent.match(/iPod/i)) ||  (navigator.userAgent.match(/iPad/i)))
		return true;
	return false;
}

function android(){
	if(navigator.userAgent.match(/Android/))
		return true;
	return false;
}

function highlightNav()
{
	if (levelArray[0] == "default")	return;	// skip highlightNav() on 108 environment (added 20131204)
	if (!d.getElementById('topNav'))	return;
	if (levelArray.length == 0)	return;
	
	var topNav = d.getElementById('topNav');	
	var btn = d.getElementById(levelArray[0]);	
	var subNav = d.getElementById(levelArray[0]+'Pulldown');

	/* highlight subNav */
	if(levelArray.length > 1)
	{
		if(levelArray[1] == 'result')
		{
			levelArray[1] = 'search';
		}
		
		if(levelArray[0] == 'about-hktb')
		{
			return;
		}
		
		/* added social media by Winkie 20140725 */
		if(levelArray[0] == 'social-media')
		{
			return;
		}
		
		//if(d.getElementById(levelArray[1]));
		if(getElementByRel(levelArray[0]+'Pulldown', levelArray[1]))
		{
			//var btn2 = d.getElementById(levelArray[1]);	
			var btn2 = getElementByRel(levelArray[0]+'Pulldown', levelArray[1]);
			btn2.className += ' active';
		}
	}
	
	/* hightlight nav */
	if (!d.getElementById(levelArray[0]))
	{
		return;
	}
	else
	{
		btn.className += ' active';
		showPulldown(btn, levelArray[0], 2);

		//Remove stroke on mouse over and active
		hideNavStroke();
	}
}

function setNav()
{
	if (!d.getElementById('topNav')) return;
	
	var container = d.getElementById('topNav');	
	var ul = container.getElementsByTagName('ul')[0];
	var a = ul.getElementsByTagName('a');
	var self = this;
	
	this.init = function()
	{
		for (var i=0; i<a.length; i++)
		{
			new showPulldown(a[i], a[i].id, 1);
		}
		
		//Added by MC 20140127
		//Hide Menu
		//a[0].onfocus = function() {hideAllMenu();};
		//Updated by Jason 20151116
		//$('.mainBanner a')[0].onfocus = function() {hideAllMenu();};
		var topOn, pullOn;
		setTimeout(function(){
			topOn = $('#topNav > ul a.active').parent().index();
			pullOn = $('#subNav .menuPull:visible').index();
		}, 100);
		$('#topNav a')[$('#topNav a').length - 1].onblur = function() {
			hideAllMenu();
			$('#topNav > ul li').eq(topOn).find('a').addClass('active');
			$('#subNav .menuPull').eq(pullOn).css({
				display:'block',
				top:'0',
				zIndex:1000
			});
		};
		
		$(window).load(function(){
			setTabIndex();
		});
	};
	this.init();

	//Remove stroke on mouse over and active
	hideNavStroke();
}

function hideNavStroke()
{
	$(document).ready(function(){
		$('#topNav').find('> ul .active').parent().prev().addClass('beforeActive');
		$('#topNav').find('> ul li').bind('mouseleave', function(){
			$(this).parent().find('li').removeClass('overBeforeActive');
		});
		$('#topNav').find('> ul li').bind('mouseenter', function(){
			$(this).prev().addClass('overBeforeActive');
		});

		$('.dropdownBox').find('> ul .active').parent().prev().addClass('beforeActive');

		$('.dropdownBox').find('> ul li').bind('mouseleave', function(){
			$(this).parent().find('li').removeClass('overBeforeActive');
		});
		$('.dropdownBox').find('> ul li').bind('mouseenter', function(){
			$(this).prev().addClass('overBeforeActive');
		});
	});	
}

//Added by MC 20140127
function setTabIndex()
{
	var index = 2;
	var toolbarNav = $('#toolbar a, #toolbar input');
	var navList = $('#topNav > ul > li > a');
	var topBanner = $('.mainBanner a, #mainBannerMap area, .mainBanner object');
	var breadcrumb = $('.breadcrumb a');
	var mainContent = $('#mainContent a');
	var smartTipsContainer = $('#smartTipsContainer a');

	/* 1. toolbar */
	for (var i=0; i<toolbarNav.length; i++)
	{
		toolbarNav[i].tabIndex = index;
		index ++;
	};
	
	/* 3. top nav */
	for (var i=0; i<navList.length; i++)
	{
		var btn = navList[i];
		btn.tabIndex = index;
		//console.log(btn + '  :  ' + index);
		index ++;
		
		if (!d.getElementById(btn.id + 'Pulldown'))	continue;
		
		var menu = d.getElementById(btn.id + 'Pulldown');
		var subNavList = $(menu).find('a');
		for (var j=0; j<subNavList.length; j++)
		{
			subNavList[j].tabIndex = index;
			//console.log('subNav:  ' + subNavList[j] + '  :  ' + index);
			index ++;
		};
	};
	
	/* 2. top banner */
	for (var i=0; i<topBanner.length; i++)
	{
		topBanner[i].tabIndex = index;
		index ++;
	};
	
	/* 4. breadcrumb */
	for (var i=0; i<breadcrumb.length; i++)
	{
		breadcrumb[i].tabIndex = index;
		index ++;
	};
	
	/* 5. mainContent */
	for (var i=0; i<mainContent.length; i++)
	{
		//Skip addthis button
		if (mainContent.eq(i).hasClass('addthis_button_compact'))	continue;
		if (mainContent.eq(i).hasClass('chosen-single'))	continue;
		mainContent[i].tabIndex = index;
		index ++;
	};

	/* 6. smartTips */
	/*for (var i=0; i<smartTipsContainer.length; i++)
	{
		smartTipsContainer[i].tabIndex = index;
		index ++;
	};*/
	//Skip addthis button
	$('a.addthis_button_compact').removeAttr('href');
	
}

function hideAllMenu()
{
	var navList = $('#topNav ul a');
	for (var i=0; i<navList.length; i++)
	{
		var btn = navList[i];
		var menu = d.getElementById(btn.id + 'Pulldown');
		
		//btn.className = btn.className.replace('active', '');
		$(btn).removeClass('active');
		$(menu).css({'display':'none','top':-49});
	};
}

/* Drop down function */
function showPulldown(btn, id, mode)
{
	//if (btn.className.indexOf('active') >= 0)	return;
	
	var menu = d.getElementById(id + 'Pulldown');
	var mask = d.getElementById('mask');
	var current = levelArray[0];
	var currentMenu = d.getElementById(current + 'Pulldown');
	
	//show dropdown on the select levelArray[0]
	if (id == levelArray[0])
	{
		if (id != 'home' && id != 'search')
		{
			menu.style.display = 'block';
			menu.style.zIndex = 1000;
		}
		//Added by Jason 20151116
		btn.onfocus	= function() {
			hideAllMenu(); menu.hit = true;	showLayer(1);
		};
		//btn.onclick		= function() {menu.hit = false;	showLayer(0);};
		
		
		/*$(slide[0]).stop().animate({left:-49},500,'', function()
		{
			slide[0].style.display = "none";
			btnVideo.style.display = "block";
		});*/
	}
	
	//if mouseover for others
	else 
	{
		if (mode == 2)
		{
			btn.onclick		= function() {menu.hit = false;	showLayer(0);};
		}
		
		else
		{
			$(btn).on('mouseenter', function(){
				menu.hit = true;	showLayer(1);
			});
			$(menu).on('mouseenter', function(){
				menu.hit = true;	showLayer(2);
			});
			$(btn).on('mouseleave', function(){
				menu.hit = false;	showLayer(0);
			});
			$(menu).on('mouseleave', function(){
				menu.hit = false;	showLayer(3);
			});
			
			//Added by MC 20140127
			btn.onfocus	= function() {
				hideAllMenu(); menu.hit = true;	showLayer(1);
			};
			/*$(btn).on('focus', function(){
				if (btn.id == levelArray[0])
				{
					hideAllMenu(); menu.hit = true;	showLayer(1);
				}
			});*/
		}
	}
	
	function hideCurrent()
	{
		//$(currentMenu).css({'top':0});
		$(currentMenu).stop().animate({top:-49},1000).css({'display':'none'});
		
		//$(menu).stop().animate({top:-49},800);
		
	}
	
	function showLayer(over)
	{
		if (over == 1) //mouseon
		{
			//if (btn.id != levelArray[0] && btn.className.indexOf('active') < 0)	
			//	btn.className += ' active';				
			if (!$(btn).hasClass('active')) {$(btn).addClass('active')}
			
			//Remove stroke on mouse over and active
			$('#topNav').find('> ul li').removeClass('beforeActive');
			$('#topNav').find('> ul li').removeClass('overBeforeActive');
			$('#topNav').find('> ul .active').parent().prev().addClass('beforeActive');
			//$('.dropdownBox').find('> ul li').prev().addClass('overBeforeActive');
			/* drop down effect */
			$(menu).css({'display':'none'});
			$(menu).css({'display':'block','top':-49,'z-index':1002});
			$(menu).stop().animate({top:0},600);
			//$(menu).delay(1000).animate({top:0},600);
			
			//$(currentMenu).css({'display':'none'});
			//hideCurrent(); 
		}
		
		else if (over == 2) // menu mouseon
		{
			if (btn.id != levelArray[0] && btn.className.indexOf('active') < 0)	
				btn.className += ' active';
				
			$(menu).css({'display':'none'});	
			$(menu).css({'display':'block','z-index':1002});
			$(currentMenu).css({'display':'block'});
		}
		
		else if (over ==3 )// menu mouse out
		{
			if (btn.id != levelArray[0])	
				btn.className = btn.className.replace('active', '');
			
			//Remove stroke on mouse over and active
			$('#topNav').find('> ul li').removeClass('beforeActive');
			$('#topNav').find('> ul li').removeClass('overBeforeActive');
			//$('.dropdownBox').find('> ul li').parent().find('li').removeClass('overBeforeActive');
			
			setTimeout(function()
			{
				if (!menu.hit)
				{
					//$(currentMenu).stop().animate({top:0},800);
					$(menu).css({'display':'block','z-index':1001});
					$(menu).stop().animate({top:-49},100);
					$(menu).css({'display':'none','top':0});
					
					$(currentMenu).css({'display':'block'});
				}
			}, 1000);
		}
		
		else //mouseout
		{
			if (btn.id != levelArray[0])	
				btn.className = btn.className.replace('active', '');
			
			setTimeout(function()
			{
				if (!menu.hit)
				{
					$(menu).stop().animate({top:-49},100);
					$(menu).css({'display':'none','top':0});
										
					$(currentMenu).css({'display':'block','top':0});
					
					
					/*if (mode == 2)
					{
						btn.onclick	= function() {showPulldown(btn, 'route', 2);};
					}
					else
					{
						btn.onmouseover	= null;
						menu.onmouseover	= null;
						btn.onmouseout		= null;
						menu.onmouseout	= null;
					}*/
				}
			}, 300);
		}
	}
}

/* Left Nav */
function highlightLeftNav()
{	
	if (levelArray.length >= 1) var obj0 = levelArray[0]; //level1
	if (levelArray.length >= 2) var obj1 = levelArray[1]; //level2
	if (levelArray.length >= 3) var obj2 = levelArray[2]; //level3
	if (levelArray.length >= 4) var obj3 = levelArray[3]; //level4
	
	//level 1 has landing page need this code
	if (!d.getElementById('leftNav')) return;
	//end level 1 has landing page
	
	//level 2
	if (d.getElementById(obj1 +'_sub'))
	{
		var highlight = d.getElementById(obj1 + '_sub');
		var highlightCell = highlight.parentNode
		highlight.className += ' active';
	}
	
	// level 3
	if (d.getElementById(obj2 +'_sub'))
	{
		var highlight = d.getElementById(obj2 + '_sub');
		var highlightCell = highlight.parentNode
		highlight.className += ' active';
		//highlightCell.className += ' active';
				
		if (d.getElementById(obj2 +'_submenu'))
		{
			var menu = d.getElementById(obj2 +'_submenu');
			menu.style.display = 'block';
		}
	}
	
	// level4
	if (!getElementByRel('leftNav', obj3)) return;
	if (getElementByRel('leftNav', obj3))
	{
		var item = getElementByRel('leftNav', obj3);
		item.className += ' active';
	}
	
}
/* check if the url exists, added on 12/9/2013 by Franky */
function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    /*http.open('GET', url, true);
    http.onreadystatechange = function(){
	    if (http.readyState === 4){
	        if (http.status === 404) {
	        }  
	    }
	};*/
    http.send();
    return http.status!=404;
}

/* toolbar langauge show & hide starts updated 20130909 */
function showLanguage()
{
	var div = d.getElementById('toolbar');
	if(!div) return;
	var languageButton = $('#languages');
	var languageContainer = $('#languageSelection');
	var overlay = $('#languageOverlay');
	var currentLang = lang;
	var langSelect = $('#languageSelection ul li a');
	var url = top.location.href;
    var mainContainer = $('#mainContainer');
    var languageIsOpen = false;
	//var btnClose = $('#languageSelection .btnClose');
	//var languageContainer = d.getElementById('languageContainer');
	//var btnOpen = d.getElementById('languages');
	//var btnClose = d.getElementById('closeBtn');
	
	//var textLanguageContainer = $('languageContainer');

	/*$(languageButton).click(function(){
		$(overlay).removeClass('hidden');
		$(languageContainer).removeClass('hidden');
	});
	
	//close langauge selection by overlay
	$(overlay).click(function(){
		$(overlay).addClass('hidden');
		$(languageContainer).addClass('hidden');
	});*/


    languageButton.bind('click', function (e)
    {
        if (!languageIsOpen)
        {
            $(this).addClass('active');
            languageContainer.addClass('active');
            languageContainer.fadeIn(function ()
            {
                languageIsOpen = true;
            });
        }
    });
    mainContainer.bind('click', function (e)
    {
        if (languageIsOpen)
        {
            languageContainer.fadeOut(function ()
            {
                languageButton.removeClass('active');
                languageContainer.removeClass('active');
                languageIsOpen = false;
            });
        }
    });
	/*$(btnClose).click(function(){
		$(languageContainer).addClass('hidden');
	});*/
	
	/* change langauge */
	$(langSelect).each(function(){
		if($(this).attr('id') == currentLang)
			$(this).parent().addClass('active');
			
		$(this).click(function(){
			var newLang = $(this).attr('id');
			/* 20160804: update for cn-index.jsp by Jason */
			if (lvl1 == "home" && url.indexOf('index') >= 0)
			{
				var _hostname = window.location.href.split('/').slice(2, 3).join('/');
				if (newLang == "china")
				{
					url = location.protocol+'//'+_hostname+'/cn-index.jsp';
				}
				else
				{
					url = location.protocol+'//'+_hostname+'/'+newLang+'/index.jsp';
				}
			}
			else
			{
				url = url.replace(lang, newLang);
				url = url.replace('lang='+lang, 'lang='+newLang);
			}
			
			/* 20140818: cookie function move to init() by Winkie */
			var expdate = new Date ();
			expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 182 * 1000));
			delete_cookie("HKTB_country", "/", "");
			setCookie("HKTB_country", newLang, expdate, "/", document.domain);
			
			if (UrlExists(url))
			{
				window.top.location.href = url;
			}
			else
			{
				window.top.location.href = "/" + newLang +"/index.jsp";
			}
		});		
	});
}

/* text mode language selection bar updated 20131212 by Winkie starts */
function fnCallSubmit(formName)
{
	//var newUrl = "";
	var newLang = "";
	var url = top.location.href;
	var selectedIndex =	eval("document." + formName + ".languageList.selectedIndex");
	
	if(	selectedIndex != 0 )
	{		
		var selectedValue = eval("document." + formName + ".languageList.options["+selectedIndex+"].value");
		
		switch (selectedValue)
		{
			case "none" : newLang = "";break;
			case "ae" : newLang = "ae";break;
			case "au" : newLang = "au";break;
			case "eng" : newLang = "eng";break;			
			case "ca" : newLang = "ca";break;
			case "china" : newLang = "china";break;
			case "nl" : newLang = "nl";break;
			case "fr" : newLang = "fr";break;
			case "de" : newLang = "de";break;
			case "in" : newLang = "in";break;
			case "id" : newLang = "id";break;
			case "jp" : newLang = "jp";break;
			case "kr" : newLang = "kr";break;
			case "my" : newLang = "my";break;			
			case "nz" : newLang = "nz";break;
			case "ru" : newLang = "ru";break;
			case "seasia" : newLang = "seasia";break;
			case "es" : newLang = "es";break;
			case "tc" : newLang = "tc";break;
			case "th" : newLang = "th";break;
			case "uk" : newLang = "uk";break;
			case "us" : newLang = "us";break;
			case "vn" : newLang = "vn";break;
		}
		
		if (newLang != "")
		{
			//var textModeLang = ['eng','au','ca','nz','seasia','uk','us','in','tc','china','ru','vn'];
			var textModeLang = ['eng','au','ca','nz','seasia','uk','us','in','tc','china'];
			
			if ($.inArray(newLang, textModeLang) < 0)
			{
				if(url.indexOf('textmode=true') > -1)
					url = url.replace("textmode=true","textmode=html");
			}
			
			url = url.replace(lang, newLang);
			
			/* 20140818: cookie function move to init() by Winkie */
			/*var expdate = new Date ();
			expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 182 * 1000));
			delete_cookie("HKTB_country", "/", "");
			setCookie("HKTB_country", newLang, expdate, "/", document.domain);*/
			
			
			
			if (UrlExists(url))
			{
				window.top.location.href = url;
			}
			else
			{
				window.top.location.href = "/" + newLang +"/index.jsp";
			}
			
			
		}
	}
	else
	{
		if(lang == "eng")
			alert("Please select a language.");
		if(lang == "tc")
			alert("請先選擇語言");
	}
}
/* text mode language selection bar ends */
/* toolbar langauge show & hide ends */

/* Show & Hide Search starts */
function hideContainer()
{
	if (GetParam('textmode') == 'true') return;
	//if ($.find('#hideContainer').length <= 0) return;
	if (!getElementsByClassNameDc(d, 'hideContainer', 1)) return;
	
	var container = getElementsByClassNameDc(d, 'hideContainer', 1);
	
	if (!container) return;
	
	for (var i = 0; i < container.length; i++)
	{
		clickToHide(container[i]);
	}
	
	function clickToHide(container)
	{
		var content = getElementsByClassNameDc(container, 'hideContent', 1)[0];
		var btn = getElementsByClassNameDc(container, 'hideBtn', 1)[0];	
		
		if ($.find('.hideLink').length > 0){
			var link = getElementsByClassNameDc(container, 'hideLink', 1)[0];
			link.onclick = function()
			{
				if (content.className.indexOf('hidden') < 0)
				{				
					$(content).addClass('hidden');
					$(btn).addClass('active');
				}
				else
				{
					$(content).removeClass('hidden');
					$(btn).removeClass('active');
				}
			}
		}
		
		if ( btn ){
			btn.onclick = function()
			{
				if (content.className.indexOf('hidden') < 0)
				{				
					$(content).addClass('hidden');
					$(btn).addClass('active');
					if(lang == 'tc') $(this).text('更多資料');
					else if(lang == 'china') $(this).text('更多?料');
					else  $(this).text('Show');
				}
				else
				{
					$(content).removeClass('hidden');
					$(btn).removeClass('active');
					if(lang == 'tc') $(this).text('隱藏資料');
					else if(lang == 'china') $(this).text('?藏?料');
					else $(this).text('Hide');
				}
			}
		}
	}
	
	if ($('.information.hideContainer').length >= 1)
	{
		$('.information.hideContainer .content').find('> dl:even').addClass('odd');
		$('.information.hideContainer .content').find('> dl:odd').addClass('even');
		$('.information.hideContainer .content').find('> p:even').addClass('odd');
		$('.information.hideContainer .content').find('> p:odd').addClass('even');
	}
}
/* Show & Hide Search ends */

/* expand cell starts */
function expandCell()
{
	if (GetParam('textmode') == 'true') return;
	var area = getElementsByClassNameDc(d, 'area', 1);
	for (var i=0; i < area.length; i++)
	{
		showRow(area[i]);
	}
	
	function showRow(area)
	{

		var div = getElementsByClassNameDc(area, 'cellContainer', 1);
		var btn = getElementsByClassNameDc(area, 'btnExpand', 1);
		
		for (var i=0; i < div.length; i++)
		{
			try{
			btn[i].div = div[i];
			}catch(e){
			
			break;
			}
			
			var row = getElementsByClassNameDc(div[i], 'row', 1);
			var rowArray = row.length;
	
			btn[i].onclick = function()
			{
				for (var i = 1; i <rowArray; i++)
				{
					if (row[i].className.indexOf('hidden') < 0)
					{
						$(row[i]).removeClass('clearfix');
						$(row[i]).addClass('hidden');
						
						$(btn).removeClass('active');
						$(btn).children('a').children('.btnName').css({'display':'inline-block'});
						$(btn).children('a').children('span.arrow').css({'margin':'0'});
					}
					else
					{
						$(row[i]).removeClass('hidden');
						$(row[i]).addClass('clearfix');
						
						$(btn).addClass('active');
						$(btn).children('a').children('span.btnName').css({'display':'none'});
						$(btn).children('a').children('span.arrow').css({'margin':'5px 100px'});
					}
				}
				cellHeight();
			}
		}
	}
}
/* expand cell ends */

/* Cookie starts */
/*** Cookie function created 2012-01-12 ***/

function setCookie(name, value, expires, path, domain, secure)
{	
	var curCookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");

	document.cookie = curCookie;
}

function getCookie(name)
{
	if (document.cookie.indexOf(name) < 0)	
		return null;
	
	var startStr = document.cookie.indexOf(name) + name.length + 1;
	var endStr = document.cookie.indexOf(";", startStr);
	if (endStr == -1)	
		endStr = document.cookie.length;
		
	return unescape(document.cookie.substring(startStr, endStr));
	
}

function delete_cookie ( cookie_name, path, domain )
{
	var cookie_date = new Date ( );  // current date & time
	cookie_date.setTime ( cookie_date.getTime() - 1 );
	document.cookie = cookie_name+"=null;expires="+cookie_date.toGMTString()+";path="+path;
}

/* Cookie ends */

function null2string(in_str, out_str){
	if (in_str == null || in_str.equal(''))
		return out_str;
	else 
		return in_str;
}

/* added 20120319 */
function cellHeight()
{
	if(!$('.cellContainer')) return;
	function findMaxHeight(target, maxHeight)
	{
		var height = $(target).height();
		//console.log("height:" + height + ", maxHeight:" + maxHeight);
		if (height > maxHeight){
			maxHeight = height;				
		}else{
			maxHeight = maxHeight;
		}
		return maxHeight;
	}

	function fixHeight(selector){
		var row = $('.cellContainer .row');
		
		$.each(row, function(i, rowIter){
			//console.log(selector +", rowIter["+i+"]:" + rowIter);
			var maxHeight = 0;
			
			//var cell = $(rowIter).find(".cell");
			var cell = $(rowIter).find(".item");
			
			//find max height of each row
			$.each(cell, function(j, cellIter){
				//console.log(selector +", cellIter["+j+"]:" + cellIter);
				maxHeight = findMaxHeight($(cellIter).find(selector), maxHeight);
			});
			
			$.each(cell, function(j, cellIter){
				if(maxHeight > 0){
				//console.log(selector +", rowIter["+i+"] maxHeight:" + maxHeight);
					//$(cellIter).find(selector).css("height", maxHeight+"px");
					$(cellIter).find(selector).height(maxHeight);
				}
			});
		});

	}
	
	//must set height of <h3> and <p> first
	// 20140214 by Winkie - <h2> for TC & SC
	if ($('.cellContainer').has('h2').length > 0)
		fixHeight("h2");
	else
		fixHeight("h3");
	fixHeight("p");
	//fixHeight(".content");
	//fixHeight(".cellContent");
	
}

/* lightbox */
$(document).ready(function(){
	if($(".didyouknowContainer a").attr("rel") == "didyouknow_group_images"){
		$(".didyouknowContainer a").colorbox({ rel: "didyouknow_group_images"});
	}
	$("#sectionContent #leftCol a").each(function()
	{
		if($(this).attr("rel") && $(this).attr("rel") == "pop_image"){
			$(this).colorbox({
				rel: "pop_image",
				onOpen: function(){
				   $("#colorbox").addClass("awc2");
				}
			});
		}
		/* youtube colorbox 20120919 updated by Winkie 20131118 */
		else if($(this).attr("rel") && $(this).attr("rel").substr(0,9) == "pop_video"){
			$(this).colorbox({iframe:true, innerWidth:800, innerHeight:500, arrowKey:false, scrolling:false, 'fastIframe': false, current: 'video {current} of {total}',
				onComplete:function(){/*$("#cboxPrevious").hide(); $("#cboxNext").hide();$('#cboxCurrent').hide();*/
                    $('.cboxIframe').attr({
                        'webkitAllowFullScreen' : 'true',
                        'mozallowfullscreen' : 'true',
                        'allowFullScreen' : 'true'
                    });
                }
			});
		}
		/* inline 56.com */
		else if($(this).attr("rel") && $(this).attr("rel") == "pop_inline_video"){
			$(this).colorbox({inline:true});
		}
	});
	/* fine-tune pop up coding by Winkie 13/5/2016 */
	$("#sectionContent #leftCol a.cboxElement").each(function()	{
		if($(this).attr("rel")){			
			var popImage = $(this).attr("rel");
			$(this).colorbox({
				rel: popImage,
				onOpen: function(){
				   $("#colorbox").addClass("awc2");
				}
			});
		}
	});
	$("#sectionContent #noCol a").each(function(i)
	{
		/*if($(this).attr("rel") && $(this).attr("rel") == "pop_image"){
			$(this).colorbox({ rel: "pop_image"});
		}*/
		if($(this).attr("rel")){
			var popImage = $(this).attr("rel");
			//if (popImage == 'pop_video')
			if (popImage.indexOf('pop_video') >= 0)
			{
				$(this).colorbox({rel:popImage, iframe:true, innerWidth:800, innerHeight:500, 'fastIframe': false, current: 'video {current} of {total}',
					onComplete:function(){/*$("#cboxPrevious").hide(); $("#cboxNext").hide();$('#cboxCurrent').hide();*/
	                    $('.cboxIframe').attr({
	                        'webkitAllowFullScreen' : 'true',
	                        'mozallowfullscreen' : 'true',
	                        'allowFullScreen' : 'true'
	                    });
                	}
            	});
            }
			else {
				// if (popImage.indexOf('pop_image') >= 0){
				// 	$(this).colorbox({ rel: popImage});
				// }

				/* updated on 20171130 by ken */
				if(popImage.substr(0,3) == "pop"){
					$(this).colorbox({ rel: popImage});
				}
			}
		}
	});
	/* advertisment homepage */
	$("#homeBannerAd a").each(function()
	{
		if($(this).attr("rel"))
		{
			var popImage = $(this).attr("rel");
			$(this).colorbox({ rel: popImage});
		}
	});
	//com.dc.Util.setIcon();
	
	/*if (ieVersion == 8)
	{
		var head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		style.type = 'text/css';
		style.styleSheet.cssText = ':before,:after{content:none !important';
		head.appendChild(style);
		setTimeout(function(){
			head.removeChild(style);
		}, 0);
	}*/
	
	// for 360 video & IE
	$('a.btnVideo360').click(function(){
		if(isIE){
			if (lang == 'tc') alert("部分功能無法於Internet Explorer瀏覽器使用，請轉用Chrome或Firefox以獲取更佳效果。");
			else if (lang == 'china') alert("部分功能?法于Internet Explorer??器使用，??用Chrome或Firefox以?取更佳效果。");
			else if (lang == 'china') alert("部分功能?法于Internet Explorer??器使用，??用Chrome或Firefox以?取更佳效果。");
			else if (lang == 'kr') alert("?? ??? Internet Explorer ?????? ???? ?? ? ????. ??? ??? ?? Chrome ?? Firefox? ????? ????.");
			else if (lang == 'jp') alert("Internet Explorer(IE)??、?使用?????????不具合??生??場合?????。安定??動作??Chrome????Firefox???????事??????????。");
			else if (lang == 'my') alert("Sesetengah ciri tidak akan berfungsi di pelayar Internet Explorer. Sila tukar ke Chrome atau Firefox untuk pengalaman terbaik.");
			else if (lang == 'th') alert("????????????????????????????????????? Internet Explorer ???????????????? Chrome ???? Firefox ??????????????????????????????????????");
			else if (lang == 'id') alert("Beberapa fitur tidak berfungsi di peramban Internet Exporer. Mohon gunakan Chrome atau Firefox untuk pengalaman terbaik.");
			else if (lang == 'de') alert("Da einige Anwendungen im Internet Explorer nicht funktionieren empfehlen wir die Nutzung von Google Chrome oder Firefox.");
			else if (lang == 'fr') alert("Certains contenus ne fonctionnent pas correctement via Internet Explorer. Utilisez Chrome ou Firefox pour un rendu optimal.");
			else if (lang == 'es') alert("Algunas funciones no marchan con Internet Explorer. Cambie a Chrome o Firefox para obtener una mejor visualizacin.");
			else if (lang == 'nl') alert("Enkele onderdelen werken niet op de Internet Explorer browser. Gebruik Chrome of Firefox voor de beste gebruikservaring.");
			else if (lang == 'ru') alert("Некоторые функции не работают в браузере Internet Explorer. Рекомендуем использовать Chrome или Firefox.");
			else if (lang == 'ae') alert("بعض الميزات لا تعمل على متصفح إنترنت إكسبلورر. يرجى التبديل إلى كروم أو فايرفوكس للحصول على أفضل تجربة.");
                        else if (lang == 'vn') alert("Một số tính năng không làm việc trên các trình duyệt Internet Explorer. Xin vui lòng chuyển Chrome hoặc Firefox để có trải nghiệm tốt nhất.");
			else alert("Some features do not work on the  Internet Explorer browser. Please switch to Chrome or Firefox for the best experience.");
		}	
	});	
});

/* popup video 20160104 */
function openVideo(url)
{	
	//$.colorbox({href:'http://www.youtube.com/embed/xcLrjydAtgE?rel=0&amp;autoplay=1', innerWidth:'800', innerHeight:'500', iframe:true, overlayClose:false}); 
	$.colorbox({
		href:url, 
		innerWidth:'800', innerHeight:'500', 
		iframe:true, 
		fastIframe: false,
		//overlayClose:false
		scrolling:false,
		onComplete:function(){
            $('.cboxIframe').attr({
                'webkitAllowFullScreen' : 'true',
                'mozallowfullscreen' : 'true',
                'allowFullScreen' : 'true'
            });
        }
	}); 
}
//Specify spectrum of different font sizes:
var szs = new Array('100%', '110%', '122%'); // standard 100%
var startSz = sz = szs.length;

function getFontSize()
{
	if (getCookie('fontSizeAwc') == null)
	{
		startSz = 0;
	}
	else
	{ 
		startSz = getCookie('fontSizeAwc');
		if (startSz == "NaN")	startSz = 0;
	}	
	changeFontSize(startSz, true);
}

function changeFontSize(inc, start)
{
	if ((!d.getElementById('leftCol')) && (!d.getElementById('noCol'))) return;
	if (!d.getElementById('fontSizeContainer')) return;

	var cEl = null, sz = eval(startSz),i,j,cTags;

	var fontSizeLink = d.getElementById('fontSizeContainer').getElementsByTagName('a');
	//$(fontSizeLink[inc]).addClass('active');
	if (fontSizeLink[inc].className.indexOf('active') >= 0) return;	
	
	sz = inc;
	
	cEl = d.getElementById('mainContent');
	cEl.style.fontSize = szs[ sz ];	
	/* if(d.getElementById('leftCol')){
		cEl = d.getElementById('leftCol');
		cEl.style.fontSize = szs[ sz ];	
	}
	else if(d.getElementById('noCol')){
		cEl = d.getElementById('noCol');
		cEl.style.fontSize = szs[ sz ];	
	} */
	
	//Highlight Btn
	var fontSizeLink = d.getElementById('fontSizeContainer').getElementsByTagName('a');
	for (var i=0; i<fontSizeLink.length; i++)
	{
		fontSizeLink[i].className = fontSizeLink[i].className.replace(/active/, '');
		fontSizeLink[i].clicked = false;
	}
	fontSizeLink[sz].className = fontSizeLink[sz].className += ' active';
	fontSizeLink[sz].clicked = true;
	
	setCookie("fontSizeAwc", sz, nd, cpath, document.domain);
}

var nd= new Date();
nd.setTime(nd.getTime()+(365*24*60*60*1000));
var cdomain = (document.domain) ? document.domain : null;
var cpath = "/";
/*end of change fontsize*/


/* detail page drop down */
function showDropdownList()
{
	var dropdownCurrent = d.getElementById('currentContainer');
	var dropdownList = d.getElementById('dropdownListContainer');
	var btn = d.getElementById('dropdownBtn');
	var list = getElementsByClassNameDc(dropdownList, 'dropdownList', 1);
	
	//var current = list.getElementsByTagName('li');	
	
	dropdownCurrent.onclick = function()
	{
		if (dropdownCurrent.className.indexOf('active') < 0)	
		{
			$(dropdownList).css({'display':'block'});
			//$(dropdownCurrent).css({'display':'none'});
			$(btn).addClass('active');
			$(dropdownCurrent).addClass('active');
			
			//alert(levelArray[3]);
			if(getElementByRel('dropdownListContainer', levelArray[3]))
			{
				
				var current = getElementByRel('dropdownListContainer', levelArray[3]);

				$(current).addClass('active');
			}
			
		}

		else
		{
			$(dropdownList).css({'display':'none'});
			//$(dropdownCurrent).css({'display':'block'});
			$(btn).removeClass('active');
			$(dropdownCurrent).removeClass('active');
		}
	}
}

/* 20120416 */
/* sitemap starts */
function openSitemap()
{
	
	var sectionBtn = $('.subSectionHeader a');
	var arrowBtn = $('.expandBtn');
	var detailContainer = $('.detailSection');
	var sectionContiner;
	//var parent;

	for (var i = 0; i < sectionBtn.length; i++)
	{
		if ($(sectionBtn[i]).parent().parent().next('.detailSection').find('ul').length <= 0)
		{
			$(sectionBtn[i]).addClass('disable');
		}
		$(sectionBtn[i]).click(function()
		{	
			//sectionContiner = $(this).parent();
			sectionContiner = $(this).parent().parent();
			if ($(this).hasClass('active'))
			{
				//$(this).removeClass('active');
				$(this).removeClass('active');
				$(sectionContiner).next('.detailSection').css({'display':'none'});
			}
				
			else
			{
				//$(this).addClass('active');
				$(this).addClass('active');
				$(sectionContiner).next('.detailSection').css({'display':'block'});
			}
		});
		
	}
	
	// added 20130403 open blank for link to /eng/
	if(lang!='eng'){
		$('#sitemapContainer a[href*="eng"]').each(function(){		
			$(this).attr('target','_blank');
		});
	}
}	
/* stitemap ends */

/* 20120426 */
function ebookFullscreen(_url)
{
if(_url)
	window.open(_url,'','width='+screen.width+',height='+screen.height+',top=0,left=0'); 
}


/* print friendly pop up screen starts */
function printFriendly()
{
	var w = 970 + 20;
	var h = 800;
	var l = (screen.width - w) / 2;
	var t = (screen.height - h) / 2;
	var url = location.href;
	var page = window.open(((url.indexOf('?')>0)?url+'&print':url+'?print'), 'printPopup', 'width='+w+', height='+h+', left='+l+', top='+t+', screenX=0, screenY=0, scrollbars=yes, resizable=no');
	page.document.close();
	page.focus();
}
/* print friendly pop up screen ends */

/* euro cookie starts */
function setEuroCookie()
{  
	var nd= new Date();
	nd.setTime(nd.getTime()+(365*24*60*60*1000));
	var cdomain = (document.domain) ? document.domain : null;
	var cpath = "/";
	setCookie(cookie_euroCookie, 'true', nd, cpath, cdomain);
	checkEuroCookie();
}

function checkEuroCookie()
{
        try
        {
                if(getCookie(cookie_euroCookie) == 'true')//have eurocookie, not display warning message div cookiePopup = none
                {
                        document.getElementById('cookieBar').style.display = "none";
                        document.getElementById('hiddenDiv').style.display = "none";
                }else
                {
                        document.getElementById('hiddenDiv').style.display = "block";
                        document.getElementById('cookieBar').style.display = "block";
                }
        } catch(e){}
}       

/* euro cookies ends */

/* GSA Suggested Keyword launched 20140210*/
// $(function() {
// 	var searchSuggestNo = 0;
// 	var currentValue = '';
	
// 	$(window).load(function(){
// 		$('#suggestSearch').remove();
// 		$('<div id="suggestSearch"></div>').appendTo('#search');
// 		$('#searchField').attr('autocomplete','off');
		
// 		$("#searchField").unbind('input keypress keydown keyup');
// 		$("#searchField").bind('keyup', myAutoComplete);
// 		$("#searchField").bind('keydown', autoCompleteKeyPress);
// 		$("#searchField").bind('mouseenter', searchEnter);
// 		$("#searchField").bind('mouseleave', searchLeave);
// 		$("body").bind('click', closeSuggest);
// 	})
	
// 	function myAutoComplete(){
// 		currentValue = $(this).val();
// 		if(currentValue==''){
// 			$('#suggestSearch').hide();
// 		}else{
// 			searchSuggestNo = 0;
// 			$('.suggestSearchresult.focus').removeClass('focus');
// 			$.ajax({
// 				type:"get",
// 				url:'http://gsa.discoverhongkong.com/suggest?q='+currentValue+'&max=10&site=collection_'+lang+'&client=frontend_'+lang+'&access=p&format=rich',//FOR REAL USE
// 				dataType : "jsonp", //FOR REAL USE
// 				crossDomain: true, //FOR REAL USE
// 				error:function(){
// 				},
// 				beforeSend:function(){
// 				},
// 				complete:function(){
// 				},
// 				success:function(json){
// 					$('#suggestSearch').html('');
// 					$('#suggestSearch').show();
// 					$('#suggestSearch').width($( "#searchField").width());
// 					$.each(json.results, function( i, item ) {
// 						var name = item.name;
// 						name = name.replace(/\\/g, "").replace("x27", "'");
// 						$('<div class="suggestSearchresult">'+name+'</div>').appendTo('#suggestSearch').bind('mouseenter', suggestEnter).bind('mouseleave', suggestLeave).bind('click', suggestClick);
// 					})
// 					if($('#suggestSearch').html()==''){
// 						$('#suggestSearch').hide();
// 					}
// 					function suggestEnter(){
// 						$('.suggestSearchresult.focus').removeClass('focus');
// 						$(this).addClass('focus');
// 					}
// 					function suggestLeave(){
// 						$('.suggestSearchresult.focus').removeClass('focus');
// 					}
// 					function suggestClick(){
// 						$("#searchField").val($(this).html());
// 						$('#suggestSearch').hide();
// 						$('#searchSubmit').trigger('click'); 
// 					}
// 				}
				
// 			})
// 		}
// 		return false;
// 	}
// 	function autoCompleteKeyPress(e){
// 		$("#searchField").unbind('keyup', myAutoComplete);
// 		var keyCode = e.keyCode || e.which,
// 		arrow = {up: 38, down: 40 };
// 		if(keyCode!=38 && keyCode!=40){
// 			$("#searchField").unbind('keyup', myAutoComplete);	
// 			$("#searchField").bind('keyup', myAutoComplete);
// 		}else{
// 			switch (keyCode) {
// 				case arrow.up:
// 					searchSuggestNo--;
// 				break;
// 				case arrow.down:
// 					searchSuggestNo++;
// 				break;
// 			}
// 			if(searchSuggestNo<=0){searchSuggestNo=0;}
// 			if(searchSuggestNo>=$('.suggestSearchresult').length){searchSuggestNo=$('.suggestSearchresult').length;}
// 			$('.suggestSearchresult.focus').removeClass('focus');
// 			if(searchSuggestNo==0){
// 				$("#searchField").val(currentValue);	
// 				$("#searchField").unbind('keyup', myAutoComplete);	
// 				$("#searchField").bind('keyup', myAutoComplete);
// 			}else{
// 				$("#searchField").val($('.suggestSearchresult').eq(searchSuggestNo-1).html());
// 				$('.suggestSearchresult').eq(searchSuggestNo-1).addClass('focus');
// 			}
// 		}
// 	}
// 	function closeSuggest(){
// 		$('#suggestSearch').hide();
// 	}
// 	function searchEnter(){
// 		$("body").unbind('click', closeSuggest);
// 	}
// 	function searchLeave(){
// 		$("body").bind('click', closeSuggest);
// 	}
// });

var isMobile = checkMobile();
function checkMobile()
{
	var pda_user_agent_list = new Array("2.0 MMP", "240320", "AvantGo","BlackBerry", "Blazer",
			"Cellphone", "Danger", "DoCoMo", "Elaine/3.0", "EudoraWeb", "hiptop", "IEMobile", "KYOCERA/WX310K", "LG/U990",
			"MIDP-2.0", "MMEF20", "MOT-V", "NetFront", "Newt", "Nintendo Wii", "Nitro", "Nokia",
			"Opera Mini", "Opera Mobi",
			"Palm", "Playstation Portable", "portalmmm", "Proxinet", "ProxiNet",
			"SHARP-TQ-GX10", "Small", "SonyEricsson", "Symbian OS", "SymbianOS", "TS21i-10", "UP.Browser", "UP.Link",
			"Windows CE", "WinWAP", "Android", "iPhone", "iPod", "iPad", "Windows Phone", "HTC"/*, "GTB"*/, "Tablet PC");
	var pda_app_name_list = new Array("Microsoft Pocket Internet Explorer");

	var user_agent = navigator.userAgent.toString();
	for (var i=0; i<pda_user_agent_list.length; i++) {
		if (user_agent.indexOf(pda_user_agent_list[i]) >= 0) {
			return true;
		}
	}
	var appName = navigator.appName.toString();
	for (var i=0; i<pda_app_name_list.length; i++) {
		if (user_agent.indexOf(pda_app_name_list[i]) >= 0) {
			return true;
		}
	}

	return false;
}

/* Thematic Banner 2016 starts */
function setThematicBanner()
{
	var config = {
		'length': 1.5, //sec
		'totalFrames': 18,
		'textSpeed': 30,
		'loopTime': 4000
	};

	var container = $('#thematicBanner');
	var logoBorder2016 = $('#logoBorder2016');
	var thematicBannerTitle = $('#thematicBannerTitle');
	var poster = $(container).find('img');
	var height = poster.height();
	var count = 0;
	var imgPath = container.data().banner;
	var speed;

	var init = function()
	{
		if (!imgPath)	return;

		if (container.data().length) config.length = container.data().length;
		if (container.data().frames) config.totalFrames = container.data().frames;
		if (container.data().textspeed) config.textSpeed = container.data().textspeed;

		speed =  Math.round(1000 / (config.totalFrames / config.length));

		//Border Fade In
		logoBorder2016.css({'opacity': 0, 'display': 'block'});
		var logoSpeed = (lvl1 == 'home')?	1000:0;
		logoBorder2016.delay(logoSpeed).stop().animate({'opacity': 1}, logoSpeed, 'easeInQuad', function()
		{
			//Title Fade In
			//if (thematicBannerTitle.length>0)
			if (!thematicBannerTitle.hasClass('disabled') && thematicBannerTitle.length)
			{
				thematicBannerTitle.css({'display': 'block'});
				fadeInText(thematicBannerTitle);
			}
			//return;

			//PreLoad Sprite
			preloadSprite(function()
			{
				$(container).css({'background-image':'url(' + imgPath + ')', 'background-position':'0 0', 'background-repeat':'no-repeat'});
				
				setTimeout(function()
				{
					poster.hide();
					setInterval(function()
					{
						animate();
					}, speed);
				}, 500);
			});
		});
	};

	var preloadSprite = function(callback)
	{
		var img = new Image();
		img.src = imgPath;
		$(img).load(function()
		{
			//log('img load complete');
			if (callback)	callback();
		});
	};

	var animate = function()
	{		
		var y = - (height * count);		
		$(container).css({'background-position':'0 ' +  y + 'px'});
		 //log('count: ' + count + ' | y: ' + y);

		count ++;
		if (count >= config.totalFrames)	count = 0;
	};

	var fadeInText = function(container)
	{
		var containers = [], messages = [];
		$(container.find('> span')).each(function(){
			containers.push($(this));
			messages.push($(this).html());
		});
		//var messages = [container.html().split('<br>')];	
		
		var messageIndex = 0;
		var curIndex = -1;
		var intervalPlay = true;
		var imgReady = false;
		var fadeInCount = 0;
		//var line1;

		//Testing
		var ver = (GetParam('ver'))?GetParam('ver'):1;

		$.each(containers, function(){
			$(this).html('');
		});

		var messageInterval = setInterval(function()
		{
			if (!intervalPlay)	return;

			var text = messages[messageIndex].substring(0, curIndex);
			//text = (line1)?	line1 + text:text;
			//container.html(text);
			
			containers[messageIndex].html(text);

			curIndex ++;

			if (curIndex > messages[messageIndex].length)
			{
				messageIndex += 1;
				curIndex = 0;
				fadeInCount ++;
				//line1 = text + '<br/>';

				if (messageIndex >= messages.length)
				{
					//clearInterval(messageInterval);
					intervalPlay = false;

					//Add Img
					//if (!imgReady)
					//{
						var img = $('<img>', {'src':'/common/images_awc2/thematic-banner-2016/icon-play.png', 'alt':''});
						var lastIndex = containers.length-1;
						containers[lastIndex].append(img);
						img.stop().animate({'opacity': 0}, 0, 'easeOutQuad', function()
						{
							autoFadInOut(img);

							setTimeout(function()
							{
								/*if (fadeInCount >= 4)
								{
									clearInterval(messageInterval);
								}
								else
								{*/
									if (ver == 2)	containers[0].stop().animate({'opacity': 0}, 300, 'easeOutQuad');
									containers[lastIndex].stop().animate({'opacity': 0}, 300, 'easeOutQuad', function()
									{
										messageIndex = (ver == 2)?	0:lastIndex;
										curIndex = 0;
										intervalPlay = true;
										containers[messageIndex].html('');
										containers[messageIndex].css({'opacity': 1});
										if (ver == 2)
										{											
											containers[1].html('');
											containers[1].css({'opacity': 1});
										}
									});
								//}
							}, config.loopTime);
						});
						//imgReady = true;
					//}

				}
			}
		}, config.textSpeed);
	};

	var autoFadInOut = function(img)
	{
		$(img).stop().animate({'opacity': 1}, 300, 'easeOutQuad', function()
		{
			setTimeout(function()
			{
				$(img).stop().animate({'opacity': 0.3}, 500, 'easeInQuad', function()
				{
					autoFadInOut(img);
				});
			}, 400);
		});
	};

	init();
};

function log(str)
{
	try {console.log(str);} catch(e) {};
}
/* Thematic Banner 2016 ends */

/* Special Tab Box (e.g. Our Brand) */
/* added 20170808 */
$( document ).ready(function() {
	$('.specialTabBox').each(function (index, value) {
		specialTabBox(this);
	});
});
function specialTabBox(target){
	var $this = $(target);

	// tab title height sync
	syncTabTitleHeight();

	// hover action
	$this.delegate('.tabListContainer ul li', 'mouseenter', function(e){
		var tabIndex = $this.find('.tabListContainer ul li').index($(this));

		// remove old active tab and tab detail
		$this.find('.tabListContainer ul li').removeClass('active');
		$this.find('.tabDetails').removeClass('active');

		// active new hover tab
		$this.find('.tabListContainer ul li').eq(tabIndex).addClass('active');
		$this.find('.tabDetails').eq(tabIndex).addClass('active');
	});



	function syncTabTitleHeight(){
		var maxTabTitleHeight = 0;

		$this.find('.tabTitle').each(function (index, value) {
			var tabTitleHeight = $(this).height();
			if (tabTitleHeight > maxTabTitleHeight){
				maxTabTitleHeight = tabTitleHeight;				
			}
		});
		$this.find('.tabTitle').height(maxTabTitleHeight);
	}
}
/* Special Tab Box (e.g. Our Brand) ends */

$(function () {
	$('#searchField').attr('autocomplete', 'off');
});/*  |xGv00|700996903b0e9301ae7ddea2b7025a04 */
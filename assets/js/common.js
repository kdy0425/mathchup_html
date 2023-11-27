//디자인 체크,라디오
$(document).ready(function() {
	$("label.design_radio input:checked,label.design_check input:checked").closest('label').addClass("active");
});

$("label.design_radio").bind("click", function() {
	var radio_name = $(this).find('input[type="radio"]').attr('name');
	if ($(this).find('input').is(":checked")) {
		$('input[type=radio][name='+ radio_name +']').closest('label').removeClass('active');
		$(this).addClass('active');
	} else {
		$(this).removeClass('active');
	}
});

$("label.design_check").bind("click", function() {
	if ($(this).hasClass('active')){
		if($(this).hasClass('all')){	//전체선택인경우 전체선택해제
			$(this).closest('.label_control').find('.design_check').removeClass('active');
			$(this).closest('.label_control').find('.design_check input[type="checkbox"]').prop("checked", false);
			return false;
		}
		//전체선택이 선택된경우 전체선택 해제
		else if($(this).closest('.label_control').find('.all').hasClass('active')){
			$(this).closest('.label_control').find('.all').removeClass('active');
			$(this).closest('.label_control').find('.all input[type="checkbox"]').prop("checked", false);
			$(this).find('input[type="checkbox"]').prop("checked", false);
			$(this).removeClass('active');
			return false;
		}
		else{
			$(this).find('input[type="checkbox"]').prop("checked", false);
			$(this).removeClass('active');
			return false;
		}
	} else {
		//전체선택인경우 전체선택 
		if($(this).hasClass('all')){
			$(this).closest('.label_control').find('.design_check').addClass('active');
			$(this).closest('.label_control').find('.design_check input[type="checkbox"]').prop("checked", true);
			return false;
		}
		else{
			$(this).find('input[type="checkbox"]').prop("checked", true);
			$(this).addClass('active');
			return false;
		}
	}
});

//슬라이더 리로드
function sliderRe(){
	$('.slider').slick('refresh');
}

//레이어팝업 */
function layerShow(thisClass){
    //$('.contLayer').hide();
    $('.'+thisClass).show();
	
	if($('.'+thisClass).hasClass('fixed_layer')){
		$('html,body').css('overflow-y' , 'hidden');
	}
}
function layerHide(thisClass){
    $('.'+thisClass).hide();
	
	if($('.layer_form.fixed_layer:visible').length == 0 ){
		$('html,body').css('overflow-y' , 'auto');
	}
}

//인풋최대 글자수 제한
$(document).on('keyup', '.max_text', function () {
    var numChar = $(this).val().length;
	var maxNum = $(this).attr('maxlength');
	var lenDisplay = $(this).closest('.ip_group').find('.max_len b');
	 if(numChar == maxNum){
	  alert('최대 글자 수가 모두 찼습니다.');
	}
	lenDisplay.text(numChar);
});

//글자수 제한있는 항목 첫 로드 시 계산
if ($('span').hasClass('max_len')){
	$(".max_len").each(function() {
		var numChar = $(this).closest('.ip_group').find('.max_text').val().length;
		$(this).find('b').text(numChar);
	});
}

var mql = window.matchMedia("screen and (max-width: 1200px)");
mql.addListener(function(e) {
    if(e.matches) {
        $('.location_nav').click(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				console.log(1);
				return false;
			}else{
				$('.location_nav').removeClass('active');
				$(this).addClass('active');
				console.log(2);
				return false;
			}
		});
    } else {
		$('.location_nav').removeClass('active');
				console.log(3);
		return false;
	}
});

$('.active_control li a').click(function(){
	$(this).closest('.active_control').find('li').removeClass('active');
	$(this).closest('li').addClass('active');
});


//데이트픽커
$.datepicker.setDefaults({
	dateFormat: 'yy-mm-dd',
	prevText: '이전 달',
	nextText: '다음 달',
	monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	changeMonth: true, //셀렉트박스로 월선택
	changeYear: true, //셀렉트박스로 년선택
	showMonthAfterYear: true,
	//showOn: 'button',
});

if ($('input').hasClass('datepicker')) {
	$(".datepicker").datepicker({});
}


$('.nav_wrap').mouseover(function(){
	$('.nav_wrap').addClass('active');
	var h = 0;
	$('	#header .hd_wrap .hd_bottom #nav > ul > li > ul').each(function(){
		if($(this).outerHeight() > h){
			h = $(this).outerHeight();
		}
	});
	$('#header .hd_wrap .hd_bottom .nav_wrap').height(h + 130);
});
$('.nav_wrap').mouseout(function(){
	$('.nav_wrap').removeClass('active');
	$('#header .hd_wrap .hd_bottom .nav_wrap').height(91);
});
$('.nav_wrap li').focusin(function(){
	$('.nav_wrap').addClass('active');
	var h = 0;
	$('	#header .hd_wrap .hd_bottom #nav > ul > li > ul').each(function(){
		if($(this).outerHeight() > h){
			h = $(this).outerHeight();
		}
	});
	$('#header .hd_wrap .hd_bottom .nav_wrap').height(h + 130);
});
$('.nav_wrap').focusout(function(){
	$('.nav_wrap').removeClass('active');
	$('#header .hd_wrap .hd_bottom .nav_wrap').height(91);
});


$(document).on('click', '#layout #nav > ul > li > a.mobile', function (event) {
	event.preventDefault();

	if($(this).closest('li').hasClass('active')){
		$('#nav > ul > li').removeClass('active');
		$('#nav > ul > li > ul').slideUp();
		return false;
	}else{
		$('#nav > ul > li').removeClass('active');
		$(this).closest('li').addClass('active');
		$('#nav > ul > li > ul').slideUp();
		$(this).closest('li').find('ul').slideDown();
		return false;
	}

	return false;
});


$('.nav_open').click(function(){
	$('.hd_wrap').addClass('nav_open');
});
$('.nav_close').click(function(){
	$('.hd_wrap').removeClass('nav_open');
});


$('.search_btn').click(function(){
	$('.search_form').fadeIn();
	return false;
});
$('.sf_close').click(function(){
	$('.search_form').fadeOut();
	return false;
});
$('.sf_inner').click(function(){
	return false;
});
 $(document).click(function(e){
	if(e.target.className =="sf_inner"){return false} 
	$('.search_form').fadeOut();
 });

//스크롤 디자인
function designScroll(){
	jQuery(document).ready(function(){
		jQuery('.design_scroll').scrollbar();
	});
}
if ($('div').hasClass('design_scroll')) {
	designScroll();
}
if ($('tbody').hasClass('design_scroll')) {
	designScroll();
}

//셀렉트 디자인
$('.sort_selected').click(function(){
	if($(this).closest('.list_sort').hasClass('active')){
		$(this).closest('.list_sort').removeClass('active');
		$(this).closest('.list_sort').find('.sort_list').hide();
		jQuery('.design_scroll').scrollbar();
		return false;
	}else{
		$('.list_sort.active .sort_list').hide();
		$('.list_sort.active').removeClass('active');
		$(this).closest('.list_sort').toggleClass('active');
		$(this).closest('.list_sort').find('.sort_list').toggle();
		jQuery('.design_scroll').scrollbar();
		return false;
	}
});

 $(document).click(function(e){
 		if(e.target.className =="list_sort"){return false} 
 		$('.sort_list').hide();
		$('.list_sort.active').removeClass('active');
 });

$('.sort_list ul li a').click(function(){
	var selectVal = $(this).text();
	var selectData = $(this).attr('data-value');
	$(this).closest('.list_sort').find('.sort_selected strong').text(selectVal);
	$(this).closest('.list_sort').find('.sort_val').val(selectData);
	$(this).closest('.sort_list').find('a').removeClass('active');
	$(this).addClass('active');
	$(this).closest('.sort_list').hide();
	$(this).closest('.list_sort').removeClass('active');
});


$('.mc_section .sort_list ul li a').click(function(){
	var selectVal = $(this).text();
	$(this).closest('.mc_section').find('.list_more .lm_btn strong').text(selectVal +" ");
});


//비밀번호 찾기 탭
$('.tap_form .tap_btn').click(function(){
	$(this).closest('.tap_form').find('.tap_box').removeClass('active');
	$(this).closest('.tap_box').addClass('active');
});

//레이어팝업 접근성
// 접근성 관련 포커스 강제 이동
function accessibilityFocus() {
  $(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){
    var next = $(e.target).attr('data-focus-next'),
        prev = $(e.target).attr('data-focus-prev'),
        target = next || prev || false;
    
    if(!target || e.keyCode != 9) {
      return;
    }
    
    if( (!e.shiftKey && !!next) || (e.shiftKey && !!prev) ) {
      setTimeout(function(){
        $('[data-focus="' + target + '"]').focus();
      }, 1);
    }
  });
}

function tooltip() {
  var openBtn = '[data-tooltip]',
      closeBtn = '.lp_bg,.lp_close';
  function getTarget(t) {
    return $(t).attr('data-tooltip');
  }
  function open(t) {
    var showTarget = $('[data-tooltip-con="' + t + '"]');
    showTarget.show().focus();
    showTarget.find('.lp_bg,.lp_close').data('activeTarget', t);
	designScroll();
  }
  function close(t) {
    var activeTarget = $('[data-tooltip-con="' + t + '"]');
    activeTarget.hide();
    $('[data-tooltip="' + t + '"]').focus();
  }
  $(document)
    .on('click', openBtn, function(e){
      e.preventDefault();
      open(getTarget(e.target));
	  $('html,body').css('overflow-y' , 'hidden');
    })
    .on('click', closeBtn, function(e) {
      e.preventDefault();
      close($(this).attr('data-focus-next'));
	  $('html,body').css('overflow-y' , 'auto');
    })
}

$(document).ready(function(){
  tooltip();
  accessibilityFocus();
});



if (window.matchMedia("(min-width: 1249px)").matches) {
	 $('#skip_to_container a[href="#content"]').click(function(event) {
		$("#content").attr("tabindex", "0").focus();
		$('html, body').scrollTop(44);
		event.preventDefault();
	});
} else {
	 $('#skip_to_container a[href="#content"]').click(function(event) {
		$("#content").attr("tabindex", "0").focus();
		$('html, body').scrollTop(20);
		event.preventDefault();
	});
}


/*2021-11-23*/
$(window).on('scroll', function() {
	if($(window).scrollTop() >  150) {
		$('.to_top').fadeIn(300);
	}else{
		$('.to_top').fadeOut(300);
	}
})
 $('.to_top').click(function(){
	$('html, body').animate({scrollTop : 0}, 400);
	$('#header_h1').focus();
});

$('.family_btn').click(function(e){
  e.preventDefault();
  var $dropWrap = $(this).parent(".ft_family");
  var $dropList = $(this).next();
  var dropListBtm;
  var docHeight = $(document).innerHeight();
    if (!$dropWrap.hasClass("active")) {
      $(".ft_family").removeClass("active").find(".family_btn").attr("aria-expanded", "false");
      $dropWrap.addClass("active");
      $dropList.find(">li").each(function() {
        if ($(this).parents("ul").attr("role") == "listbox")
          if ($(this).hasClass("focused")) $(this).attr({
            "tabindex": "0"
          });
          else $(this).attr({
            "aria-selected": "false",
            "tabindex": "0"
          })
      });
      if ($(this).next("ul").attr("role") == "listbox") $dropList.find("li:first-child").attr({
        "aria-selected": "true",
        "tabindex": "1"
      });
      dropListBtm = $dropList.outerHeight() + $dropList.offset().top;
      if (docHeight < dropListBtm) $dropWrap.addClass("bottom");
      $(this).attr("aria-expanded", "true");
      $dropList.find("[aria-selected='true']").focus()
    } else {
      $dropWrap.removeClass("active").removeClass("bottom");
      $(this).removeAttr("aria-expanded").focus();
      $(this).attr("aria-expanded", "false");
      activeDropWrap = null
    }
});

$('.droplist_item').focusin(function(){
  $(".droplist li").each(function() {
    if (!$(this).hasClass("focused")) $(this).attr("aria-selected", "false")
  });
  $(this).attr("aria-selected", "true")
})

$(document).click(function(e){
	if(e.target.className =="family_btn"){return false} 
	$('.ft_family').removeClass('active');
	$('.family_btn').attr("aria-expanded", "false");
});
/* //2021-11-23*/



/*
  reddit HD : reddit plugin that maximize your visual reddit experience

    Copyright (C) 2010 Mounier Florian aka paradoxxxzero

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/.
*/
$("#sr-header-area").hide();
$(".side").hide();
$(".footer-parent").hide();

var tMargin = 10;

var rTop = false;
var rRight = false;
var rBottom = false;

$("body").mousemove(function (event) {
    if(!rTop && event.pageY < tMargin) {
	$("#sr-header-area").show('fast');
	rTop = true;
    } else if(rTop && event.pageY > $("#sr-header-area").height() + tMargin) {
	$("#sr-header-area").hide('fast');
	rTop = false;
    }
    if(!rRight && event.pageX > $("body").width() - tMargin) {
	$(".side").show('fast');
	rRight = true;
    } else if(rRight && event.pageX < $("body").width() - $(".side").width() - tMargin) {
	$(".side").hide('fast');
	rRight = false;
    }
    if(!rBottom && event.pageY > $("body").height() - tMargin) {
	$(".footer-parent").show();
	var toScroll = $("body").scrollTop() + $(".footer-parent").height();
	$('body').animate({ scrollTop: toScroll }, 500, function () { rBottom = true; });
    } else if(rBottom && event.pageY < $("body").height() - $(".footer-parent").height() - tMargin) {
	$(".footer-parent").hide('fast');
	rBottom = false;
    }
});
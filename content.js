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


// Begin by getting options
chrome.extension.sendRequest(
    {method: "options"},
    function(response) {
	// Search dom elements once
	var $top = $("#sr-header-area");
	var $right = $(".side");
	var $bottom = $(".footer-parent");
	var $sinput = $("#search input");
	var $body = $("body");
	var isTop = response.top;
	var isRight = response.right;
	var isBottom = response.bottom;

	// Hide all
	if(isTop) $top.hide();
	if(isRight) $right.hide();
	if(isBottom) $bottom.hide();

	// Areae for mouse toggling
	var tMargin = 10;

	var rTop = false;
	var rRight = false;
	var rBottom = false;

	// Boolean indicating search box activation status
	var searchFocused = false;
	$sinput.focus(function (event) {
			  searchFocused = true;
		      });
	$sinput.blur(function (event) {
			 searchFocused = false;
		     });

	// Toggle parts on mouse move in area
	$body.mousemove(function (event) {
			    if(isTop) {
				if(!rTop && event.pageY < tMargin) {
				    $top.show('fast');
				    rTop = true;
				} else if(rTop && event.pageY > $top.height() + tMargin) {
				    $top.hide('fast');
				    rTop = false;
				}
			    }
			    if(isRight) {
				if(!rRight && event.pageX > $body.width() - tMargin) {
				    $right.show('fast');
				    rRight = true;
				} else if(rRight && !searchFocused && event.pageX < $body.width() - $right.width() - tMargin) {
				    $right.hide('fast');
				    rRight = false;
				}
			    }
			    if(isBottom) {
				if(!rBottom && event.pageY > $body.height() - tMargin) {
				    $bottom.show();
				    var toScroll = $body.scrollTop() + $bottom.height();
				    $body.animate({ scrollTop: toScroll }, 500, function () { rBottom = true; });
				} else if(rBottom && event.pageY < $body.height() - $bottom.height() - tMargin) {
				    $bottom.hide('fast');
				    rBottom = false;
				}
			    }
			});
    });

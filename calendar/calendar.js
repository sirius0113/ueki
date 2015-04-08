console.log("calendarSample.js");
var MyApp = angular.module('calendarApp', []);

var date = new Date();				// 現在日付を取得
var thisYear = date.getFullYear();
var thisMonth = date.getMonth();
var thisDate = date.getDate();
var sortID = 3;

MyApp.service('CalendarService', [function () {
console.log("service");

	this.year = function() {
		return thisYear;
	}

	this.month = function() {
		return thisMonth + 1;
	}

}]);


MyApp.controller('CalendarCtrl', ['$scope', 'CalendarService', function ($scope, CalendarService) {
console.log("controller");

	$scope.year = function() {
		return CalendarService.year();
	}
	$scope.month = function() {
		return CalendarService.month();
	}
}]);

/*
 * JQuery
 */

$(function(){
console.log("$function");
	var week = [6,0, 1, 2, 3, 4, 5];	// 月曜始まりにするための変換テーブル
//	var weekWord = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
	var weekWord = ["sun","mon","tue","wed","thu","fri","sat"];

	var monthdays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var year = date.getFullYear();
	// うるう年の計算
	if (((year % 4) == 0 && (year % 100) != 0) || (year % 400) == 0){
		monthdays[1] = 29;
	}

	function viewDay(){
		for(var i = 0 ; i < 7 ;i++){
			$(".day-" + week[i]).text(weekWord[i]);
		}
	}

	function viewCalender(){
console.log("viewCalender");

		date = new Date(thisYear, thisMonth, 1);
		var maxDate = monthdays[thisMonth];
		var day = date.getDay(); // 曜日

		// Clear
		for(var i = 0 ; i < 42 ;i++){
			$(".ca-" + i).removeClass("css-none");
			$(".ca-" + i).removeClass("css-this");
		}
		// This month
		var j = 1;
		for(var i = 0 ; i < maxDate ;i++){
			$(".ca-" + (i + week[day])).text(j);
			if(thisDate == j){
				$(".ca-" + (i + week[day])).addClass("css-today");
			}else{
				$(".ca-" + (i + week[day])).addClass("css-this");
			}
			$(".ca-" + (i + week[day])).append('<a data-toggle="modal" href="#myModal"></a>');
			j++;
		}
		// Last month
		var restDay = 6 - ( 6 - [week[day]] ); // 先月分表示数
		var lastMonth = thisMonth -1;
		if(lastMonth == -1){
			lastMonth = 11;
		}
		var lastDay = monthdays[lastMonth];
		for(var i = 0;i < restDay ; i++){
			$(".ca-" + i).text(lastDay - restDay + i + 1 );
			$(".ca-" + i).addClass("css-none");
			$(".ca-" + i).append('<a data-toggle="modal" href="#myModal"></a>');
		}
		// Next month
		j = 1;
		for(var i = week[day] + maxDate ; i < 42 ;i++){
			$(".ca-" + i).text(j);
			$(".ca-" + i).addClass("css-none");
			$(".ca-" + i).append('<a data-toggle="modal" href="#myModal"></a>');
			j++;
		}

		$("#viewMonth").text(thisMonth +1);
		$("#viewYear").text(thisYear);
	}

	// Init
	viewDay();
	viewCalender();

	// Click
	$("#today").click(function() {
		console.log("today");
		var date = new Date();				// 現在日付を取得
		thisYear = date.getFullYear();
		thisMonth = date.getMonth();
		viewCalender();
	});

	$("#delMonth").click(function() {
		console.log("delMonth");
		thisMonth--;
		if(thisMonth == -1){
			thisMonth = 11;
			thisYear--;
		}

		viewCalender();
	});

	$("#incMonth").click(function() {
		console.log("incMonth");
		thisMonth++;
		if(thisMonth == 12){
			thisMonth = 0;
			thisYear++;
		}
		viewCalender();
	});

	$("#clickYear").click(function() {
		console.log("inputYear");
		thisYear = $("#inputYear").val();

		viewCalender();
	});

	$(".dayclick").click(function() {
		console.log("click");
		var text = $(this).text();
		 $("#modalDate").text(text);
		console.log(text);
//			alert("c");
	});

	$("#inputBtn").click(function() {
		console.log("inputtext");
		var text = "x";//$("#inputText").text();
		var contents = 	'<div>'
		+ '01'
		+ '<textarea class="inputArea" id="inputText">input</textarea>'
		+ '</div>';

		$("#interactionList").append(contents);
		sortID++;
	});

	/*
	 * Drag & Drop
	 */

	// Make interactionList sortable
	$("#interactionList").sortable({
		delay : 300
	});
});



var QueryString = function () {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
			query_string[pair[0]] = arr;
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}();

if (typeof QueryString.doc_loc !== 'undefined') {
	if (typeof QueryString.doc_name !== 'undefined') {
		$("#docname").text(QueryString.doc_name);
		document.title = QueryString.doc_name;
	} else
		$("#docname").text(QueryString.doc_loc);
	$.ajax({
		type: 'GET',
		url: QueryString.doc_loc,
		success: function (file_html) {
			$("#document-text").html(file_html);
		}
	});
} else {
	$("#docname").css("font-style", "italic");
	$("#docname").text("Start Page");
	$.ajax({
		type: 'GET',
		url: '/startpage',
		success: function (file_html) {
			$("#document-text").html(file_html);
		}
	});
}

var b_=$("#bold")[0];b_.onmousedown=function(e){e=e||window.event;e.preventDefault();};
var i_=$("#italic")[0];i_.onmousedown=function(e){e=e||window.event;e.preventDefault();};
var u_=$("#underline")[0];u_.onmousedown=function(e){e=e||window.event;e.preventDefault();};

function promptDocName() {
	var name = prompt("Document Name:", $("#docname").text());
	if (name !== null)
		$("#docname").text(name);
}

function bold(elem) {
	document.execCommand('bold');
	$('#bold').toggleClass('down');
}

function italic(elem) {
	document.execCommand('italic');
	$('#italic').toggleClass('down');
}

function underline(elem) {
	document.execCommand('underline');
	$('#underline').toggleClass('down');
}

function selectionIsBold() {
	if (document.queryCommandState)
		return document.queryCommandState('bold');
	return false;
}

function selectionIsItalic() {
	if (document.queryCommandState)
		return document.queryCommandState('italic');
	return false;
}

function selectionIsUnderlined() {
	if (document.queryCommandState)
		return document.queryCommandState('underline');
	return false;
}
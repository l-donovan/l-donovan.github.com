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
	if (typeof QueryString.doc_name !== 'undefined')
		$("#docname").text(QueryString.doc_name);
	else
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

function promptDocName() {
	var name = prompt("Document Name:", $("#docname").text());
	if (name !== null)
		$("#docname").text(name);
}
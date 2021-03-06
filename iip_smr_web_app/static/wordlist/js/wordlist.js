var bolded = false

$(window).load(function() {
	langSelect($('#language').find(":selected").val())
	boldKWIC()
});

function boldKWIC() {
	var table = document.getElementById("latin-pos-table");
	var curword = ""
	for (var i = 0, row; row = table.rows[i]; i++) {
		if($(row).attr('class').includes("level1")) {
			for(var j = 0, col; col = row.cells[j]; j++) {
				var cvar = $(col)
				if(cvar.attr('class').includes("kwic")) {
					const rv = cvar.html().split(" " + curword + " ", 2)
					cvar.html(rv[0] + " <strong>" + curword + "</strong> " + rv[1])
				} else {
					const rowval = cvar.html()
					curword = rowval.substr(0, rowval.indexOf(' '));
				}
			}
		}
	}
}


function alphaClick(event) {
	const letter = $(event.target).html()
	findAndScroll(letter)
}

function findAndScroll(letter) {
	var table = document.getElementById("latin-pos-table");
	for (var r = 0, row; row = table.rows[r]; r++) {
		if($(row).attr('class').includes("level0") && 
			$(row).find("b").html()[0] == letter) {
			offset = row.getBoundingClientRect().top - 100;
			window.scrollTo({
				top: offset
			});
			return;
		}
	}
}

function posFilter() {
	checked = new Set()
	$(".pos-filter").each(function(i, obj) {
		if(obj.checked) {
			checked.add(obj.value)
		}
	})
	const noCheck = checked.size == 0
	var table = document.getElementById("latin-pos-table")
	var hiding = false
	for(var r = 0, row; row = table.rows[r]; r++) {
		if($(row).attr('class').includes("level0")) {
			const rowHTML = row.innerHTML
			const ind = rowHTML.indexOf("</b>")
			const pos = rowHTML.substring(ind + 5, rowHTML.indexOf(" ", ind + 6))
			if(noCheck || checked.has(pos)) {
				$(row).show()
				hiding = false
			} else {
				$(row).hide()
				hiding = true
			}
		} else if (hiding) {
			$(row).hide()
		}
	}
}

function langSelect(option) {
	if(option != "")
		window.location.href = base_url + option
}

function requestLang(lang) {

	requrl = ""

	if(lang == "Latinold") {
		requrl = latin_old
	} else if (lang == "Latinnew") {
		requrl = latin_new
	}

	console.log(requrl)

	$.ajax({
		url: requrl,
		type: 'get',
		success: function(data) {
			$("#latin-table").html(data)
			$("#latin-table").show()
			boldKWIC()
		},
		failure: function(data) {
			console.log("failure")
		}
	});
}

function collapseToggle(obj) {
	var button = $(obj)
	const togclass = "." + button.attr('id').substring(3)
	if(button.html() == "+") {
		button.html("-")
		$(togclass).show()
	} else {
		button.html("+")
		$(togclass).hide()
	}
}

function treeClick(obj, counter) {
	if(obj.indexOf(" | ") > -1) {
		obj = obj.replace(" | ", "|")
	}
	dbtreerow = $("#doubletreerow")
	if(dbtreerow.length > 0 && currRt == obj) {
		dbtreerow.remove();
	} else {
		dbtreerow.remove();
		const togclass = "." + "tog" + counter;
		$(togclass).last().after('<tr id="doubletreerow"><td colspan="2"><div id="doubletree"></div></td></tr>')
		drawDT(treeData, obj);
	}
}

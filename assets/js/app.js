// +------------------------------------------------------------------------+
// | @author        : Michael Arawole (HENT Technologies)
// | @author_url    : https://logad.net
// | @author_email  : henttech@gmail.com
// +------------------------------------------------------------------------+
// | Copyright (c) 2021 HENT Technologies. All rights reserved.
// +------------------------------------------------------------------------+

class app {
	
	constructor() {
		this.container = $("#app");
	}

	hello() {
        console.log("tested");
    }

	loadView(content) {
		this.container.load('../'+content,{param1: "value1",} ,
			function(e){
		});
		
	}

	// XHR requests
	ajax_request(url, data, form = true) {
	    if(form == false){
	        var send = $.ajax({
	            url: url,
	            type: "POST",
	            data: data,
	            dataType: "json",
	            cache: false,
	            error: function (xhr) {
	                if (xhr.status == 404 || xhr.status == 500) {
	                    alert("An unexpected error seems to have occurred. Now that we know, we're working to fix it ☺. ERROR : "+xhr.status);
	                }
	            },
	        });
	    }
	    if(form == true){
	        var send = $.ajax({
	            url: url,
	            type: "POST",
	            data: data,
	            dataType: "json",
	            cache: false,
	            contentType: false,
	            processData: false,
	            error: function (xhr) {
	                if (xhr.status == 404 || xhr.status == 500) {
	                    alert("An unexpected error seems to have occurred. Now that we know, we're working to fix it ☺. ERROR : "+xhr.status);
	                }
	            },
	        });
	    }
	    return send;
	}

	// Handle form submissions
	handleForm (form, options) {
		var btn = form.find('[type=submit]');
		var btn_text = btn.text();
		btn.text('please wait..');
		btn.addClass('disabled');
		btn.attr('disabled', true);
		var response = '';
		var formData = new FormData(form[0]);
		var req = this.ajax_request(options.url,formData);
		req.done(function (data) {
			if (data.code == 200) {
				alert(data.msg);
				if (options.callback_function) {
					console.log(options.callback_function);
					window[options.callback_function](data);
				}
			} else {
				alert(data.msg);
				btn.text(btn_text);
				btn.removeClass("disabled");
				btn.removeAttr("disabled");
			}
		});
		req.fail(function (xhr) {
			response = 'error';
			btn.text(btn_text);
			btn.removeClass("disabled");
			btn.removeAttr("disabled");
		});

		return response;
	}
}

app = new app();
app.hello();
//
// main js function:
//
// What it does:
// 1) Capture user interaction
// 2) send label to back-end (`flask_server.label()`)


//
// list of colour names a bounding box type may have.
// There cannot and shouldnt be more bounding box type
// than there are colours.
//

var colours = ['white',
			  'orange',
			  'pink',
			  'mediumpurple',
			  'salmon',
			  'blue',
			  'brown',
			  'lime',
			  'Maroon',
			  'green',
			  'DarkGreen',
			  'DarkBlue',
			  'Peru',
			  'Bisque',
			  'lightyellow',
			  'darkmagenta',
			  'indigo',
			  'LightSlateGrey',
			  'yellow',
			  'beige',
			  'purple',
			  'DeepPink',
			  'DarkTurquoise',
			  'chocolate',
			  'papayawhip',
			  'mediumspringgreen'];

function make_blank(oInput) {
    if (oInput.value == 'Username') {
        oInput.value = '';
    }
}

function restore_placeholder(oInput) {
    if (oInput.value == '') {
        oInput.value = 'Username';
    }
}

// draws all the bounding boxes and lines on 
// a given canvas context
function draw_labels(ctx, label){
	
	$.each(label['bbs'] , function(i){
		
		var x_0 = label['bbs'][i]['orig_point_0'][0];
		var y_0 = label['bbs'][i]['orig_point_0'][1];
		var x_1 = label['bbs'][i]['orig_point_1'][0];
		var y_1 = label['bbs'][i]['orig_point_1'][1];
		ctx.strokeStyle = label['bbs'][i]['color'];

		if(label['bbs'][i]['label_type'] == 'line'){
			ctx.moveTo(x_0, y_0);
  			ctx.lineTo(x_1, y_1);
  			ctx.stroke();

		}else{
			ctx.beginPath();
	        ctx.strokeRect(x_0, y_0,
        			 	   x_1, y_1);
		}
	})
}

// Changes the color of the selected orientation 
// button
function select_orientation(orientations, orientation){

	$.each(orientations, function(i) {
		$('#orientation li').eq(i)
			.css("color", "black")
			.css("font-weight", "normal");

		if (orientations[i] == orientation){
			$('#orientation li').eq(i)
				.css("color", "red")
				.css("font-weight", "bold");
		}
	})
}

// Changes the color of the selected document-
// type button
function select_category(categories, dt){

	$.each(categories , function(i){
		$('#category li').eq(i)
			.css("color", "black")
			.css("font-weight", "normal");
		
		if (categories[i] == dt){
			$('#category li').eq(i)
				.css("color", "red")
				.css("font-weight", "bold");
		}
	})
}


	// function create_bb_buttons(bbs){
	// 	var bbs_legend = document.getElementById('bounding_boxes');
		
	// 	$.each(bbs , function(i){
			
	// 		var li = $('<li/>')
	// 			.attr("class", "btn btn-a btn-sm smooth")
	// 			.text(bbs[i][0]bounding_boxes)
	// 			.css("background-color", colours[i])
	// 			.css("color", 'black')
	// 			.css("border", "3px solid black")
	// 			.css("margin-top", "1%");

	// 		li.mousedown(function (e) {
	// 			selected_bb = i;
	// 			select_bb(bbs, i);
	// 		});

	// 		li.appendTo(bbs_legend);
	// 	})

	// 	$.each(bbs , function(i){
	// 		$("#bounding_boxes li").eq(i).mousedown(function (e) {
	// 			ctx.strokeStyle = colours[i];
	// 		});
	// 	})
	// }




function create_reset_button(){

	var reset_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'rgb(20, 45, 110)')
			.css("color", 'black')
			.css("border", "2px solid black")
			.css("box-shadow", "2px 2px 1px #000000")
			.css("margin-top", "15%")
			.css("font-size", "21px")
			.css("background", "linear-gradient(#BC0404, #D44B4B)")
			.text('Clear labels')
			.appendTo($("#reset_div"));

	return reset_button;
}


function create_undo_button(){

	var undo_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'rgb(20, 45, 110)')
			.css("color", 'black')
			.css("border", "2px solid black")
			.css("box-shadow", "2px 2px 1px #000000")
			.css("margin-top", "15%")
			.css("font-size", "21px")
			.css("background", "linear-gradient(#BC0404, #D44B4B)")
			.text('Undo')
			.appendTo($("#undo_div"));

	return undo_button;
}


function create_submit_button(){

	var span = $('<span/>')
		.text('(key : enter)')
		.css('line-height', '17%')
		.css("font-size", "10px")
		.css("font-weight", "normal");

	var submit_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", colours[0])
			.css("color", 'black')
			.css("border", "2px solid black")
			.css("box-shadow", "4px 4px 3px #000000")
			.css("margin-top", "15%")
			.css("margin-bottom", "15%")
			.css("font-size", "20px")
			.css("font-weight", "bolder")
			.css("background", "linear-gradient(#BC0404, #D44B4B)")
			.text('SUBMIT')
			.append($('<br/>'))
			.append(span)
			.appendTo($("#submit_button"));

	return submit_button;
}


function create_copy_button(){

	var copy_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.val('Copy to clipboard')
			.appendTo($("#copy_button"));

	return copy_button;
}


function create_download_button(){

	var download_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.val('Download')
			.appendTo($("#download_button"));

	return download_button;
}


function get_dataset_info(){

	var ds_info;

	$.ajax({
	    type : "POST",
	    url : '/get_dataset_info',
	    data: JSON.stringify({}, null, '\t'),
	    contentType: 'application/json;charset=UTF-8',
	    success: function(json_obj) {
	    	ds_info = json_obj['result'];

			$("#qty_span").attr("class", "badge")
						  .text("" + ds_info['num_labelled_imgs']);

			$("#total_span").attr("class", "badge")
							.text("" + ds_info['total_num_imgs']);


			// $('#num_labelled_imgs')
			// 			.text('Number of labelled images: ' + ds_info['num_labelled_imgs'])
			// 			.attr("class", "well well-sm")
			// 			.css("background-color", colours[0])
			// 			.css("color", 'black')
			// 			.css("border", "3px solid black");
			
			// $('#total_num_imgs')
			// 				.text('Total number of images: ' + ds_info['total_num_imgs'])
			// 				.attr("class", "well well-sm")
			// 				.css("background-color", colours[0])
			// 				.css("color", 'black')
			// 				.css("border", "3px solid black");
	    }
	});
}


//
// main:
//

$(document).ready(function(){

	var config = {{ config }};

	var images = config.images;
	var categories = config.categories;
	var orientations = config.orientations;
	var bbs = config.bbs;

	var labelled;
	
	var image_idx = 0;
	var bounding_boxes = [];
	var category = categories[0];
	var orientation = orientations[0];
	var selected_bb = 0;
	var all_labels = [];


	var canvas = document.getElementById('img_canvas');
	canvas.style.cursor = "crosshair";
	var ctx = canvas.getContext("2d");
	var ctx_linewidth = 5;
	var img = new Image();
	var img_width = 650;

	var isDrawing=false;
	var isRect = true;
	var isLine = false;
	
	var label = {};

	var startX;
	var startY;

	var canvasOffset = $("#img_canvas").offset();
	var offsetX = canvasOffset.left;
	var offsetY = canvasOffset.top;	

	var scale_x = 0;
	var scale_y = 0;

	// var user_id_input = $('#user_id');
	var user_id = -1;



	function create_orientation_buttons(orientations){

		var key_values = ['q', 'w', 'e', 'r'];
		var orientation_legend = document.getElementById('orientation');
		
		$.each(orientations, function(i){
			

			var span = $('<span/>')
				.text(' (key : ' + key_values[i] + ')')
				.css("font-size", "10px")
				.css("font-weight", "normal");


			var div = $('<div/>')
				.attr("class", "icon-arrow-"+orientations[i]+"-circle")
				.css("font-weight", "bold")
				.css("font-size", "20px");

			var li = $('<li/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.css("background-color", 'white')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css('margin-bottom', '1%')
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(orientation_legend);

			li.mousedown(function (e) {
				orientation = orientations[i];
				select_orientation(orientations, orientation);
			});

		})
	}

	function create_category_buttons(categories){

		var doc_type_legend = document.getElementById('category');

		$.each(categories , function(i){

			var key_value = i+1;
			
			var span = $('<span/>')
				.text(' (key : ' + key_value + ')')
				.css("font-size", "10px")
				.css("font-weight", "normal");

			var div = $('<div/>').text(categories[i])

			var li = $('<li/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.css("background-color", 'white')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(doc_type_legend);


			li.mousedown(function (e) {
				category = categories[i];
				select_category(categories, category);
			});
		})
	}

	function update_labels_div(){
		
		var json_obj = {};
		var ret = []
		$.ajax({
		    type : "POST",
		    url : '/get_all_labels',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(all_labels) {
		        $("#all_labels_id").text(JSON.stringify(all_labels, null, '\t'));
		    }
		});
	}



	function select_bb(bbs, bb_idx){

		$.each(bbs , function(i){
			$('#bounding_boxes li').eq(i)
				.css("color", "black")
				.css("font-weight", "normal");
			
			if (i == bb_idx){
				$('#bounding_boxes li').eq(i)
					.css("color", "red")
					.css("font-weight", "bold");
					
				selected_bb = i;

				if (bbs[i][1] == 'line'){
					isLine = true;
					isRect = false;
				}else{
					isLine = false;
					isRect = true;
				}

			}
		})
	}

	function create_bb_buttons(bbs){
		var bbs_legend = document.getElementById('bounding_boxes');
		
		$.each(bbs , function(i){
			
			var li = $('<li/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.text(bbs[i][0])
				.css("background-color", colours[i])
				.css("color", 'black')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("margin-top", "1%")
				.css("margin-left", "1%");

			li.mousedown(function (e) {
				selected_bb = i;
				select_bb(bbs, i);
			});

			li.appendTo(bbs_legend);
		})

		$.each(bbs , function(i){
			$("#bounding_boxes li").eq(i).mousedown(function (e) {
				ctx.strokeStyle = colours[i];
			});
		})
	}

	function create_textarea(){
	    var div = $('<div/>');

    	var textarea = $('<textarea/>')
    						.attr('rows', '2')
    						.attr('class', 'smooth')
    						.text('Please select each word to write in here.')
    						.css("border", "1px solid black")
    						.css("font-size", "25px")
    						.css("box-shadow", "2px 2px 1px #000000")
    						.css("border-radius", "4px")
    						.appendTo(div);


		textarea.focus(function() {
		        if (this.value === this.defaultValue) {
		            this.value = '';
		        }
		  })
		  .blur(function() {
		        if (this.value === '') {
		            this.value = this.defaultValue;
		        }
		});
		        						
    	textarea.prop('disabled', 'true');
    	// make textarea appear
    	// div.appendTo($('#legend_col_2'));
    	div.appendTo($("#word_textarea"));
    	return textarea
	}

	function insert_label(image_idx, category, orientation, bounding_boxes, username){
		var currentdate = new Date(); 
		var timestamp = currentdate.getDate() + "/"
		                + (currentdate.getMonth()+1)  + "/" 
		                + currentdate.getFullYear() + " "  
		                + currentdate.getHours() + ":"  
		                + currentdate.getMinutes() + ":" 
		                + currentdate.getSeconds();
		           
		var json_obj = {
    		"img_path": images[image_idx],
    		"category": category,
    		"orientation": orientation,
    		"bbs": bounding_boxes,
    		"is_labelled": true,
    		"username": username,
    		"timestamp": timestamp
    	}
    	
    	$.ajax({
		    type : "POST",
		    url : '/insert_label',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(result) {
		        
		    }
		});
	}

	img.onload = function () {

		// resize image but maintain original ratio
	 	var img_ratio = img.width / img.height;

	 	var new_width = img_width;
	 	var new_height = new_width / img_ratio;
		
		scale_x = img.width / new_width;
		scale_y = img.height / new_height;

		canvas.width = new_width;
	    canvas.height = new_height;
	    
	    ctx.drawImage(img,
	    			  0, 0, img.width, img.height,
	    			  0, 0, new_width, new_height);
		
		ctx.strokeStyle = colours[0];
		ctx.lineWidth = ctx_linewidth;
		
		draw_labels(ctx, label);

		if (mouseIsDown == 0){
			get_dataset_info();
			update_labels_div();
		}
	}

	function get_label(image_idx){


		var json_obj = {
			"img_path": images[image_idx]
		}

		$.ajax({
		    type : "POST",
		    url : '/get_label',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(label_dict) {
		    	
		    	label = label_dict;

		    	//
		    	// restore labels if they exists:
		    	//

		    	// restore category of this image from label
		        if (typeof label_dict['category'] == 'undefined'){
		    		category = categories[0];
		        	select_category(categories, category);

		        }else if (categories.indexOf(label_dict['category']) < 0){
		    		// if the label_dict[category] does not exist:
		    		category = categories[0];
		        	select_category(categories, category);
		        
		        }else{
		    		// if the label_dict[category] does not exist:
		    		category = label_dict['category'];
					select_category(categories, category);
		        }

		        // restore orientation of this image from label
		        if (typeof label_dict['orientation'] == 'undefined'){
					orientation = orientations[0];
					select_orientation(orientations, orientation);
		       		
		        }else if (orientations.indexOf(label_dict['orientation']) < 0){
		        	// if label_dict['orientation'] does not exist:
		        	orientation = orientations[0];
					select_orientation(orientations, orientation);
		        }else{
		        	orientation = label_dict['orientation'];
					select_orientation(orientations, orientation);
		        }

		        if (typeof label_dict['bbs'] == 'undefined'){
					bounding_boxes = [];
		        	select_bb(bbs, 0);

		        }else{
					bounding_boxes = label_dict['bbs'];
					select_bb(bbs, 0);
		        	
		        }
		    }
		});
	}

	function previous_image(){
	    label = {};
	    
	    if (image_idx != 0){
			image_idx--;
		}

		img.src = images[image_idx]+"?t="+ new Date().getTime();

		get_label(image_idx);
		isDrawing = false
	}

	function next_image(){
	    label = {};
	    
	    if (image_idx < images.length){
			image_idx++;
		}

		img.src = images[image_idx]+"?t="+ new Date().getTime();
		
		get_label(image_idx);
		isDrawing = false
	}


	function create_previous_button(){

		var img_navigation_div = document.getElementById('img_navigation');

		var span = $('<span/>')
				.text(' (key : left-arrow)')
				.css("font-size", "10px")
				.css("font-weight", "normal");

		var div = $('<div/>')
				.attr("class", "icon-arrow-left-circle")
				.css("font-weight", "bold")
				.css("font-size", "20px");

		var prev_button = $('<div/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.css("background-color", 'white')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("color", "black")
				.css('margin-bottom', '1%')
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(img_navigation_div);

		prev_button.mousedown(function (e) {
			previous_image();
		});

		return prev_button;
	}


	function create_next_button(){

		var img_navigation_div = document.getElementById('img_navigation');

		var span = $('<span/>')
				.text(' (key : right-arrow)')
				.css("font-size", "10px")
				.css("font-weight", "normal");

		var div = $('<div/>')
				.attr("class", "icon-arrow-right-circle")
				.css("font-weight", "bold")
				.css("font-size", "20px");

		var next_button = $('<div/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.css("background-color", 'white')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("color", "black")
				.css('margin-bottom', '1%')
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(img_navigation_div);

		next_button.mousedown(function (e) {
			next_image();
		});

		return next_button;
	}

	
	// Create page:
	// from provided: 
	// 		- categories, 
	//		- orientation, 
	//		- bounding boxes
	create_category_buttons(categories);
	create_orientation_buttons(orientations);
	create_bb_buttons(bbs);
	var textarea = create_textarea();

	var prev_button = create_previous_button();
	var next_button = create_next_button();
	
	var reset_button = create_reset_button();
	var undo_button = create_undo_button();
	var submit_button = create_submit_button();
	
	var copy_button = create_copy_button();
	var clipboard = new Clipboard('#copy_button');

	var download_button = create_download_button();
	

	img.src = images[0]+"?t="+ new Date().getTime();
	get_label(0);

	var mouseIsDown = 0;


	// user_id_input.mousedown(function(e){
	// 	// disable all events
	// 	$(document).on('keydown', handleKeyDown);
	// 	$(document).off('keydown click');
	// 	user_id_input.on();
		
	// 	user_id_input.keypress(function(e) {

	// 		// on ENTER
	// 		if(e.which == 13) { 
				
	// 			user_id = user_id_input.val();
	// 			$(document).on('keydown', handleKeyDown);
	// 		}
	// 	});
	// })

	function get_user_id(){

		if ($('#user_id').val() == '' || $('#user_id').val() == 'Username'){
			user_id = -1;
			usernameEntered = false;
			// if (user_id == ""){
			// 	user_id_alert = $("div/")
			// 						.attr('class', 'alert alert-danger fade in')
			// 						.text('Please enter a valid user id.');
			// }

			alert('Make sure to enter your username!');
		} else {
			user_id = $('#user_id').val();
			usernameEntered = true;
		}

		return usernameEntered
	}

	//
	// HANDLE EVENTS: function definitions
	//

	function handleResetEvent(e){

		var json_obj = {
			"img_path": images[image_idx]
		}

		$.ajax({
		    type : "POST",
		    url : '/reset',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(l) {


				// set default label values:

				category = categories[0];
				select_category(categories, category);

				orientation = orientations[0];
				select_orientation(orientations, orientation);
				
				label = {};
				bounding_boxes = [];
				select_bb(bbs, 0);

				// clear image from bounding boxes
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				img.src = json_obj['img_path'];

		    }
		});
	}
        

	// function handleMouseDown(e) {
	// 	console.log('handleMouseDown');

	//     mouseX = parseInt(e.pageX - offsetX);
	//     mouseY = parseInt(e.pageY - offsetY); 
	    
	//     $("#downlog").html("Down: " + mouseX + " / " + mouseY);

	//     if (isDrawing) {

	//         isDrawing = false;
	//         ctx.beginPath();

	      //   if (isRect){
	      //   	bb = {
		    	// 	"label": bbs[selected_bb][0],
		    	// 	"label_type": bbs[selected_bb][1],
		    	// 	"color": colours[selected_bb],
		    	// 	"offset": [offsetX, offsetY],
		    		
		    	// 	"point_0": [startX*scale_x,
		    	// 				startY*scale_y],
		    		
		    	// 	"point_1": [(e.pageX - offsetX)*scale_x,
		    	// 				(e.pageY - offsetY)*scale_y],

		    	// 	"orig_point_0": [startX, startY],
		    	// 	"orig_point_1": [mouseX - startX, mouseY - startY],
		    	// }

	// 	        ctx.strokeRect(startX, startY,
	// 	        			   mouseX - startX, mouseY - startY);

	// 	        console.log('here:');
	// 	        console.log(selected_bb);
	// 	        console.log(bbs[selected_bb]);

		   //      if (bbs[selected_bb][1] == 'textbox'){

					// textarea.prop('disabled', false);
		   //      	textarea.focus();
		        	
		   //      	// disable all events
		   //      	$(document).on('keydown', handleKeyDown);
		   //      	$(document).off('keydown click');
		   //      	$(textarea).on();
		        	
		   //      	$(textarea).keypress(function(e) {
		   //      		// on ENTER
					// 	if(e.which == 13) { 
							
					// 		bb["text"] = textarea.val();
	        	
					// 		$(document).on('keydown', handleKeyDown);

					// 		textarea.val('Please write the content of textboxes here.');
					// 		textarea.prop('disabled', true);
					// 	}
					// });
		   //      }

	//         	bounding_boxes.push(bb);

	//         }else if(isLine){
	//         	console.log('tracing line');

	// 			bb = {
	// 	    		"label": bbs[selected_bb][0],
	// 	    		"label_type": bbs[selected_bb][1],
	// 	    		"color": colours[selected_bb],
	// 	    		"offset": [offsetX, offsetY],
		    		
	// 	    		"point_0": [startX*scale_x,
	// 	    					startY*scale_y],
		    		
	// 	    		"point_1": [mouseX*scale_x,
	// 	    					mouseY*scale_y],

	// 	    		"orig_point_0": [startX, startY],
	// 	    		"orig_point_1": [mouseX, mouseY]

	// 	    	}
	//         	bounding_boxes.push(bb);

	//         	ctx.moveTo(startX, startY);
 //      			ctx.lineTo(mouseX, mouseY);
 //      			ctx.stroke();
	//         }

	//         canvas.style.cursor = "default";
	    
	//     } else {

	//     	isDrawing = true;
	//         startX = mouseX;
	//         startY = mouseY;
	//         canvas.style.cursor = "crosshair";
	//     }
	// }

	function handleUndoEvent(e){
		bounding_boxes.pop();
		img.src = images[image_idx]+"?t="+ new Date().getTime();
	}

	function submit_label(){
		usernameEntered = get_user_id()
		if (usernameEntered){		
	    	insert_label(image_idx, category, orientation, bounding_boxes, user_id);

			if (image_idx < images.length){
				image_idx++;
			}

			img.src = images[image_idx]+'?#'+new Date().getTime();
			
			get_label(image_idx);
		}
	}

	function handleKeyDown(e){
		if ($('#user_id').is(':focus')){
			console.log('user_id IS focused')
			// remove focus from text input
			// $('#user_id').blur();
			return;
		}else{
			console.log('user_id is NOT focused')
		}

	    switch(e.which) {
			//
			// ARROWS:
			//

	        case 37: // left
	        	previous_image();
	        	get_dataset_info();
				console.log('previous image');

	        break;

	        case 39: // right
	        	next_image();
	        	get_dataset_info();
				console.log('next image:');
	        break;

	        //
	        // DIGITS:
	        //

			case 49: // 1
				category = categories[0];
				select_category(categories, category);
	        break;

			case 50: // 2
				category = categories[1];
				select_category(categories, category);
	        break;

			case 51: // 3
				category = categories[2];
				select_category(categories, category);
	        break;

			case 52: // 4
				category = categories[3];
				select_category(categories, category);
	        break;

			case 53: // 5
				category = categories[4];
				select_category(categories, category);
	        break;

			case 54: // 6
				category = categories[5];
				select_category(categories, category);
	        break;

			case 55: // 7
				category = categories[6];
				select_category(categories, category);
	        break;

			case 56: // 8
				category = categories[7];
				select_category(categories, category);
			break;

			case 57: // 9
				category = categories[8];
				select_category(categories, category);
	        break;

	        //
	        // LETTERS:
	        //

	        case 81: // Q

		        orientation = orientations[0];
				select_orientation(orientations, orientation);
	        break;

			case 87: // W
		        orientation = orientations[1];
				select_orientation(orientations, orientation);
	        break;

			case 69: // E
		        orientation = orientations[2];
				select_orientation(orientations, orientation);
	        break;

			case 82: // R
		        orientation = orientations[3];
				select_orientation(orientations, orientation);
			break;


	        //
	        // ENTER: sends annotations to back-end
	        //

	        case 13: // enter
		        console.log('Submitting labels to back-end');
		        submit_label();
	        break;

	        default: return; // exit this handler for other keys
	    }
	}

	//
	// HANDLE EVENTS: function calls
	//






	var startX, endX, startY, endY;
	

    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseXY, false);
    canvas.addEventListener("mouseup", mouseUp, false);



	function mouseUp(e) {
	    if (mouseIsDown !== 0) {
	        mouseIsDown = 0;
	        mouseX = parseInt(e.pageX - offsetX);
	        mouseY = parseInt(e.pageY - offsetY);
	        var pos = getMousePos(canvas, e);
	        endX = pos.x;
	        endY = pos.y;
	        // drawSquare(); //update on mouse-up
			
	    	if (isRect){

	        	bb = {
		    		"label": bbs[selected_bb][0],
		    		"label_type": bbs[selected_bb][1],
		    		"color": colours[selected_bb],
		    		"offset": [offsetX, offsetY],
		    		
		    		"point_0": [startX*scale_x,
		    					startY*scale_y],
		    		
		    		"point_1": [(e.pageX - offsetX)*scale_x,
		    					(e.pageY - offsetY)*scale_y],

		    		"orig_point_0": [startX, startY],
		    		"orig_point_1": [mouseX - startX, mouseY - startY]
		    	}


		        if (bbs[selected_bb][1] == 'textbox'){

					textarea.prop('disabled', false);
		        	textarea.focus();
		        	
		        	// disable all events
		        	$(document).on('keydown', handleKeyDown);
		        	$(document).off('keydown click');
		        	$(textarea).on();
		        	
		        	$(textarea).keypress(function(e) {
		        		// on ENTER
						if(e.which == 13) { 
							
							bb["text"] = textarea.val();
	        	
							$(document).on('keydown', handleKeyDown);

							textarea.val('Please write the content of textbox here.');
							textarea.prop('disabled', true);
						}
					});
		        }

	    	} else if (isLine){
	        	
				bb = {
		    		"label": bbs[selected_bb][0],
		    		"label_type": bbs[selected_bb][1],
		    		"color": colours[selected_bb],
		    		"offset": [offsetX, offsetY],
		    		
		    		"point_0": [startX*scale_x,
		    					startY*scale_y],
		    		
		    		"point_1": [mouseX*scale_x,
		    					mouseY*scale_y],

		    		"orig_point_0": [startX, startY],
		    		"orig_point_1": [mouseX, mouseY]

		    	}
	        }

	    	bounding_boxes.push(bb);

			ctx.lineWidth = ctx_linewidth;
	    	draw_labels(ctx, label);

	    }
	}

	function mouseDown(eve) {
	    mouseIsDown = 1;
	    var pos = getMousePos(canvas, eve);
	    startX = endX = pos.x;
	    startY = endY = pos.y;
	    
	    if (isRect){
	    	drawSquare(eve);
	    } else if (isLine){
	    	drawLine(eve);
	    }
	}

	function mouseXY(eve) {

	    if (mouseIsDown !== 0) {
	        var pos = getMousePos(canvas, eve);
	        endX = pos.x;
	        endY = pos.y;

	        drawSquare();

	        if (isRect){
		    	drawSquare();
		    } else if (isLine){
		    	drawLine(eve);
		    }
	    }
	}

	function drawSquare() {
	    // creating a square
	    var w = endX - startX;
	    var h = endY - startY;
	    var offsetX = (w < 0) ? w : 0;
	    var offsetY = (h < 0) ? h : 0;
	    var width = Math.abs(w);
	    var height = Math.abs(h);



	    ctx.clearRect(0, 0, canvas.width, canvas.height);


		// resize image but maintain original ratio
	 	var img_ratio = img.width / img.height;

	 	var new_width = img_width;
	 	var new_height = new_width / img_ratio;
		
		scale_x = img.width / new_width;
		scale_y = img.height / new_height;

		canvas.width = new_width;
	    canvas.height = new_height;
	    
	    ctx.drawImage(img,
	    			  0, 0, img.width, img.height,
	    			  0, 0, new_width, new_height);


		draw_labels(ctx, label);
		get_dataset_info();

		ctx.strokeStyle = colours[selected_bb];
		ctx.lineWidth = ctx_linewidth;
	    ctx.beginPath();
	    ctx.rect(startX + offsetX, 
	    		 startY + offsetY, 
	    		 width, height);
	    ctx.stroke();
	}


	function drawLine(e) { // HERE
	    // creating a square
	    var w = endX - startX;
	    var h = endY - startY;
	    var offsetX = (w < 0) ? w : 0;
	    var offsetY = (h < 0) ? h : 0;
	    var width = Math.abs(w);
	    var height = Math.abs(h);

	    ctx.clearRect(0, 0, canvas.width, canvas.height);


		// resize image but maintain original ratio
	 	var img_ratio = img.width / img.height;

	 	var new_width = img_width;
	 	var new_height = new_width / img_ratio;
		
		scale_x = img.width / new_width;
		scale_y = img.height / new_height;

		canvas.width = new_width;
	    canvas.height = new_height;
	    
	    ctx.drawImage(img,
	    			  0, 0, img.width, img.height,
	    			  0, 0, new_width, new_height);


		draw_labels(ctx, label);
		get_dataset_info();

		ctx.strokeStyle = colours[selected_bb];
		
		var pos = getMousePos(canvas, e);
	    endX = pos.x;
	    endY = pos.y;

        // mouseX = parseInt(e.pageX - offsetX);
        // mouseY = parseInt(e.pageY - offsetY);

	    // ctx.beginPath();
		ctx.lineWidth = ctx_linewidth;
	    ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
	}


	function getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    return {
	        x: evt.clientX - rect.left,
	        y: evt.clientY - rect.top
	    };
	}


	// user_id_input.mousedown(function(e){

	// });

    $(document).keydown(function(e) {
    	handleKeyDown(e);
	});

	reset_button.mousedown(function (e) {
		handleResetEvent(e);
	});

	undo_button.mousedown(function (e) {
		handleUndoEvent(e);
	});

	submit_button.mousedown(function (e) {
		submit_label();
	});

	download_button.mousedown(function (e){
			
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(all_labels));
		var dlAnchorElem = document.getElementById('download_labels');
		dlAnchorElem.setAttribute("href",     dataStr     );
		dlAnchorElem.setAttribute("download", "labels.json");
		dlAnchorElem.click();
	})
});
/*
* Plugin name: Redsand Jquery Custom Check Able Control
* Author: phannhuthan
* Uri: http://redsand.vn
* Version: 3.0
* Last modify: 17/7/2013
*/

/* param
	
	options = {
		change: function(checked, custom_ui, checkbox){
			...
		}
	}
	
*/

(function($){
	$.fn.rsCheckbox = $.fn.rsRadio = $.fn.rsCheckAble = function(options){
	
		options = $.extend({ 
			change: false,
			text: ""
		}, options);
	
		this.filter(':checkbox, :radio').each(function(){
			var checkbox = $(this);
			var ui = checkbox.next('.rs-checkable');
			if(ui.length == 0){
				ui = $('<a class="rs-checkable">' + options.text + '</a>');
				checkbox.after(ui);
			}
			checkbox.css({
				position: 'absolute',
				left: -9999
			});
			ui.addClass(checkbox.attr('class')).addClass(checkbox.is(':checkbox') ? 'rs-checkbox' : 'rs-radio');
			if(checkbox.is(':checked')) ui.addClass('checked');
			if(checkbox.is(':disabled')) ui.addClass('disabled');
			ui.unbind('click').click(function(event){
				event.preventDefault();
				if (!checkbox.is(':disabled')) {
				    checkbox.get()[0].click();
				}
			});	
			checkbox.unbind('change.rs-checkable').bind('change.rs-checkable', function () {
			    if (checkbox.is(':radio')) {
			        var name = checkbox.attr('name');
			        if (checkbox.closest('form').length > 0) {
			            checkbox.closest('form').find('[name="' + name + '"]').next().removeClass('checked');
			        }
			        else {
			            $('[name="' + name + '"]').next().removeClass('checked');
			        }
			    }
			    ui.toggleClass('checked', checkbox.is(':checked'));
			    if (options.change) options.change(checkbox.is(':checked'), ui, checkbox);
			});
		});
		return this;
	}
}(jQuery));
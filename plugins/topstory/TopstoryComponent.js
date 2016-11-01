'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;

var ArticleoptionsComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function TopstoryComponent() { TopstoryComponent.super.apply(this, arguments); }

TopstoryComponent.Prototype = function() {

	this.getInitialState = function() {
    	// if topstory is present add to state.
    	// if topstory is not present.
	    var initialTopStory = this.context.api
	      	.getLinkByType('topstory', 'fdmg/topstory');
	      	console.log(initialTopStory);
      	if (!initialTopStory || initialTopStory.length < 1) {
            return { initialTopStory : { value : '', checked : false } }
        } else {
     		return { initialTopStory: initialTopStory.map(function(initialTopStory){
        		return { value : initialTopStory['@date'], uuid : initialTopStory['@uuid'], checked : initialTopStory['@time'] };
	          	}).pop()}
        }
  	}

	this.render = function() {
		// checkbox.
		// input.
		

		var checked = this.state.initialTopStory.checked;
		var value = this.state.initialTopStory.value;

		var checkbox =
		        $$('input').attr({
		            type: 'checkbox',
		            value: '',
		        }).addClass('form-control').ref('checkbox').on("blur", function (){ this.updateTopStory() });

		var inputField =
		        $$('input').attr({
		            type: 'text',
		            value: '',
		        }).addClass('form-control').ref('input').on("blur", function (){ this.updateTopStory() });

        var el = $$('div').addClass('topstory').append(
        		$$('label').append(checkbox)
        	);

		el.append(inputField);

		return el;
	}

  	this.updateTopStory = function() {
  		// delete existing.
  		// when input empty delete value (not the complete link).
  		// when checkbox unticked delete complete link.

  		// Always delete value when input is empty. Get the input.
		this.deleteTopStory();

		var checked = this.refs.dateInput.val();
		var value = this.refs.timeInput.val();

		if (checked !== '') {
		  this.context.api.addLink('topstory', {
		       '@uuid': genUuid(),
		       '@type': "fdmg/topstory",
		       '@name' : 'topstory',
		       '@value' : 'Story here',
		       '@checked' : 'true or false'
		  });
		}
	}

  	this.deleteTopStory = function () {
      	var api = this.context.api;

      	api.getLinkByType('fdmg/topstory')
       	   .forEach(function(topstory) {
      	        api.removeLinkByUUID('topstory', topstory['@uuid']);
		});

 	};

}

ArticleoptionsComponent.extend(TopstoryComponent);
module.exports = TopstoryComponent;

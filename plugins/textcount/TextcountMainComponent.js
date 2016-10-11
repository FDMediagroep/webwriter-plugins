'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var jQuery = require('substance/util/jquery');
var _ = require('lodash');
var genUUID = require('writer/utils/IdGenerator');

function TextcountMainComponent() {
    TextcountMainComponent.super.apply(this, arguments);

    this.context.api.on('wordcounter', 'document:changed', function () {
        this.onDocumentChanged();
    }.bind(this));
}

TextcountMainComponent.Prototype = function () {

    this.dispose = function() {
        this.context.api.off('wordcounter', 'document:changed');
    };

    // Get the word- and character count.
    this.getCount = function () {
        var nodes = this.context.api.getDocumentNodes();
        var config = this.getConfiguration();
        var countedElements = config.countedElements;

        var textContent = "";

        nodes.forEach(function (node) {

        	if (countedElements.some(function(c) { return node.isInstanceOf(c); })) {

	            if (node.content) {
	                textContent += node.content.trim();
	            }
        	}

        });

        var words = textContent.split(/\s+/);
        var textLength = textContent.length;

        return {
            words: words.length,
            textLength: textLength
        };
    };

    this.getConfiguration = function () {
    	// Get plugins/nodes to count as defined in the configuration.
    	var countedElements = this.context.api.getConfigValue("textcount", "countedElements");
        // Get the available sizes.
        var availableSizes = this.context.api.getConfigValue("textcount", "sizes");
        // Set an extra value to work with when there is no link or config present.
        availableSizes["?"] = Number.MAX_VALUE;
        // Get the character margin (in percentages).
        var marginPercentage = this.context.api.getConfigValue("textcount", "marginPercentage");
        // get the defined size in the article's link (S, L, XL, XXL). If there is no link fall back
        // to "?" which represents MAX_VALUE.
        var links = this.context.api.getLinkByType("textcount", "fdmg/textcount");
        // Get the corresponding character count from the plugin configuration.
        var documentSize = links.length > 0 ? links.pop()["@size"] : "?";
        var targetSize = availableSizes[documentSize];
        
        return {
            availableSizes: availableSizes,
            marginPercentage: marginPercentage,
            targetSize: targetSize,
            countedElements: countedElements
        };
    }

    this.onDocumentChanged = function () {
        var count = this.getCount();

        this.extendState({
            textLength: count.textLength,
            words: count.words
        });
    };

    this.setArticleSize = function () {

        var api = this.context.api;
        var name = "textcount"
        // Remove all existing links.
        api.getLinkByType(name, "fdmg/textcount")
            .forEach(function(link) {
                api.removeLinkByUUIDAndRel(name, link['@uuid'], link['@rel']);
            });

        // What is the current selected size from the dropdown.
        var selected = jQuery('.textcount select option:selected');
        var selectedSize = selected.data("id");

        // Add a new link with a newly selected size.
        api.addLink(name, {
            '@rel': 'textcount',
            '@size': selectedSize,
            '@type': 'fdmg/textcount',
            '@uuid': genUUID()
        });

        // Get the current size in the state and replace it with the
        // newly selected size.
        var currentSize = this.state.availableSizes;
        var newSize = currentSize[selectedSize];

        // Update state with new size.
        this.extendState({ targetSize : newSize })
    };

    this.getInitialState = function () {
        var config = this.getConfiguration();
        var count = this.getCount();

        return {
            textLength: count.textLength,
            words: count.words,
            availableSizes: config.availableSizes,
            marginPercentage: config.marginPercentage,
            targetSize: config.targetSize,
            countedElements: config.countedElements
        };
    };

    this.render = function () {
        var countClass = calculateCountClass.bind(this)();
        var availableSizes = this.state.availableSizes

        var el = $$('div').addClass('sc-information-panel plugin')
            .append($$('h2').append(this.context.i18n.t('Text counter')));

        var numberContainer = $$('div').addClass('number__container clearfix fdmg-sidebar');
        // Populate articleSizeSelect with key and value like: S (1810).

        var articleSizeSelect = $$('div').addClass('count-info form-group')
            .append(
                $$('select')
                    .append(Object.keys(availableSizes).map(function(key){
                        var value = availableSizes[key];

                        return $$('option')
                            .append(key + " " + (key == '?' ? '' : value))
                            .attr({
                                "data-id" : key,
                                "selected" : this.state.targetSize == value,
                                "disabled": (key == '?')
                            })
                    }.bind(this)))
                )
            .on('change', function(){
                this.setArticleSize();
            })
            .append(
                $$('p')
                    .append(this.context.i18n.t('Article size'))               
            );

        var textlengthEl = $$('div').addClass("count-info "+ countClass +"")
            .append($$('span').append(this.state.textLength.toString()))
            .append($$('P').append(this.context.i18n.t('Characters')))
            .attr('title', this.context.i18n.t('Character count'));

        var wordsEl = $$('div').addClass("count-info")
            .append($$('span').append(this.state.words.toString()))
            .append($$('p').append(this.context.i18n.t('Words')))
            .attr('title', this.context.i18n.t('Word count'));

        numberContainer.append([
            articleSizeSelect,
            textlengthEl,
            wordsEl
        ]);
        el.append(numberContainer, $$('hr'));

        return el;

        function calculateCountClass(){
            // Keep track of article margin and return the
            // appropriate class to show the status.
            var targetSize = this.state.targetSize;
            var marginPercentage = this.state.marginPercentage;
            var textLength = this.state.textLength;

            var characterMargin = (targetSize / 100) * marginPercentage;
            var minCharacters = targetSize - characterMargin;
            var maxCharacters = targetSize + characterMargin;

            if (textLength > maxCharacters) {
                return "over-range";
            } else if (textLength === targetSize) {
                return "perfect-range";    
            } else if (textLength > minCharacters && textLength < maxCharacters || textLength == maxCharacters ) {
                return "in-range";
            } 
        }
    };
};
Component.extend(TextcountMainComponent);
module.exports = TextcountMainComponent;
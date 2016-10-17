'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');
var jQuery = require('substance/util/jquery');
var genUUID = require('writer/utils/IdGenerator');

function ArticleoptionsComponent() { Component.apply(this, arguments); }

ArticleoptionsComponent.Prototype = function() {

    this.getName = function () { return this.props.name; }

    this.getType = function () { return "fdmg/" + this.getName(); }

    this.getInitialState = function() {
        return { 'checked' : this.getDocumentChecked() };
    }

    this.getDocumentChecked = function() {
        return this.context.api
            .getLinkByType(this.getName(), this.getType())
            .some(function(item){
                return item['@checked'] === "true";
            });
    }

    this.updateLink = function (value) {

        this.extendState({'checked' : value});

        var api = this.context.api;
        var name = this.getName();
        var type = this.getType();
        var state = this.getState();

        // remove existing
        api.getLinkByType(name, type)
            .forEach(function(link) {
                api.removeLinkByUUIDAndRel(name, link['@uuid'], link['@rel']);
            });

        // add without input value
        api.addLink(name, {
            '@rel': this.getName(),
            '@checked': value,
            '@type': this.getType(),
            '@uuid': genUUID()
        });
    }

    this.addLinkWithInput = function (value) {
        var input = jQuery('#' + this.getName());
        var inputValue = input.val();

        var api = this.context.api;
        var name = this.getName();
        var type = this.getType();

         api.getLinkByType(name, type)
            .forEach(function(link) {
                api.removeLinkByUUIDAndRel(name, link['@uuid'], link['@rel']);
            });

        if (inputValue !== "") {
            // add with input value if input has value
            input.removeClass('novalue');
            api.addLink(name, {
                '@rel': this.getName(),
                '@checked': value,
                '@value': inputValue,
                '@type': this.getType(),
                '@uuid': genUUID()
            });
        } else {
            input.addClass('novalue');
            return
        }
    }

    this.render = function (){
        var state = this.getState();

        var body =  $$('div').addClass('checkbox form-group')
                        .append(
                            $$('label').append(
                                $$('input').attr({'type' : 'checkbox', 'checked' : state.checked}),
                                $$('span').append(state.text)))
                        .on('change', function (){
                            this.updateLink(!state.checked);
                        }.bind(this));

        var input = $$('input')
                        .attr({
                            'type' : 'text',
                            'value' : state.value,
                            'id' : this.getName(),
                            'placeholder' : state.placeholder
                    }).on('blur', function (){
                         this.addLinkWithInput(state.checked); // add input value here
                    }.bind(this)).removeClass('hidden');

        if (!state.checked) {
            var input = input.addClass('hidden');
        }

        if (!state.value) {
            input.addClass('novalue');
        }

        if (!state.input) {
            return $$('div')
                .addClass('fdmg-sidebar')
                .append(
                    $$('div')
                        .addClass('header'),
                    body,
                    $$('hr').addClass('options-hr'));
            } else {
                return $$('div')
                .addClass('fdmg-sidebar')
                .append(
                    $$('div')
                        .addClass('header'),
                    body, input,
                    $$('hr').addClass('options-hr'));
            }
    }

}

Component.extend(ArticleoptionsComponent);

module.exports = ArticleoptionsComponent;

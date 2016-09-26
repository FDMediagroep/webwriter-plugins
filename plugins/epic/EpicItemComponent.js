'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');
var jxon = require('jxon/index');
var Avatar = require('writer/components/avatar/AvatarComponent');
var NilUUID = require('writer/utils/NilUUID');
var findAttribute = require('vendor/infomaker.se/utils/FindAttribute');

function EpicItemComponent() {
    EpicItemComponent.super.apply(this, arguments);

    this.handleActions({
        'avatarLoaded': this.avatarLoaded
    });
}

EpicItemComponent.Prototype = function () {

    this.getInitialState = function () {
        return {
            name: undefined,
            isLoaded: false,
            isSimpleEpic: false,
            loadedEpic: {}
        };
    };

    this.dispose = function () {
        if (this.ajaxRequest) {
            this.ajaxRequest.abort();
        }
        Component.prototype.dispose.call(this);
    };

    this.loadEpic = function () {
        // If no UUID is provided, assume it's a simple epic
        if (NilUUID.isNilUUID(this.props.epic.uuid) && this.props.epic.title) {

            // Hack: Set a timeout to fix some render issues
            setTimeout(function () {
                this.setState({
                    name: this.props.epic.title,
                    isLoaded: true,
                    isSimpleEpic: true,
                    loadedEpic: {name: this.props.epic.title}
                });
            }.bind(this), 1);
        } else {

            this.ajaxRequest = this.context.api.router.ajax('GET', 'XML', '/api/newsitem/' + this.props.epic.uuid, {imType: this.props.epic.type});
            this.ajaxRequest
                .done(function (data) {
                    var conceptXML = data.querySelector('concept');
                    var linksXML = data.querySelector('itemMeta links');
                    var jsonFormat = jxon.build(conceptXML);

                    var epicLinks;
                    if(linksXML) {
                        epicLinks = jxon.build(linksXML);
                    }

                    this.setState({
                        name: jsonFormat.name,
                        isLoaded: true,
                        isSimpleEpic: false,
                        loadedEpic: jsonFormat,
                        loadedEpicLinks: epicLinks
                    });

                }.bind(this))
                .error(function () {
                    this.setState({
                        name: this.props.epic.title,
                        isLoaded: true,
                        isSimpleEpic: true,
                        loadedEpic: {name: this.props.epic.title}
                    });
                }.bind(this));
        }
    };

    this.render = function () {

        var epic = this.props.epic,
            epicItem = $$('li').addClass('epics__list-item').addClass('clearfix').ref('epicItem'),
            displayTitle = this.state.name ? this.state.name : epic.title;

        var deleteButton = $$('button').addClass('epic__button--delete')
            .append($$(Icon, {icon: 'fa-times'}))
            .attr('title', this.context.i18n.t('Remove from article'))
            .on('click', function () {
                this.removeEpic(epic);
            }.bind(this));

        if (!this.state.isLoaded) {
            this.loadEpic();
        } else if (this.state.isSimpleEpic) {
            this.populateElementsForSimpleEpic(epicItem, displayTitle, deleteButton);
        } else {
            this.populateElementForEpic(epicItem, epic, displayTitle, deleteButton);
        }
        epicItem.on('mouseenter', this.showHover);
        epicItem.on('mouseleave', this.hideHover);
        return epicItem;
    };

    this.populateElementsForSimpleEpic = function (epicItem, displayTitle, deleteButton) {
        epicItem.append($$('div').addClass('avatar__container')
            .append($$('img').attr('src', this.context.api.router.getEndpoint() + '/asset/dummy.svg').addClass('avatar')))
            .append($$('div').addClass('metadata__container')
                .append($$('span').append(displayTitle).addClass('epic__name notClickable meta')).attr('title', this.context.i18n.t('Not editable epic')))
            .append($$('div').addClass('button__container')
                .append(deleteButton));


    };

    this.populateElementForEpic = function (epicItem, epic, displayTitle, deleteButton) {

        var displayNameEl = $$('span').append(displayTitle);

        displayNameEl.attr('data-toggle', 'tooltip')
            .attr('data-placement', 'bottom')
            .attr('data-trigger', 'manual');

        displayNameEl.on('mouseenter', this.toggleTooltip);
        displayNameEl.on('mouseout', this.hideTooltip);

        this.updateTagItemName(displayNameEl, this.state.loadedEpic);

        var metaDataContainer = $$('div').addClass('metadata__container')
            .append($$('span').append(displayNameEl).addClass('epic__name meta').on('click', this.showInformation));



        var email = findAttribute(this.state.loadedEpic, 'email');
        if(email) {
            metaDataContainer.append($$('span').append(email).addClass('epic__email meta'));
        }

        epicItem
            .append($$('div').addClass('avatar__container').ref('avatarContainer')
                .append($$(Avatar, {epic: epic, links: this.state.loadedEpicLinks}).ref('avatar')))
            .append(metaDataContainer)
            .append($$('div').addClass('button__container')
                .append(deleteButton));
    };

    this.toggleTooltip = function (ev) {
        $(ev.target).tooltip('toggle');
        ev.target.timeout = window.setTimeout(function () {
            this.hideTooltip(ev)
        }.bind(this), 3000)
    };

    this.hideTooltip = function (ev) {
        if (ev.target.timeout) {
            window.clearTimeout(ev.target.timeout);
            ev.target.timeout = undefined;
        }
        $(ev.target).tooltip('hide');
    };

    this.updateTagItemName = function (tagItem, loadedTag) {
        if (loadedTag && loadedTag.definition) {
            var definition = _.isArray(loadedTag.definition) ? loadedTag.definition : [loadedTag.definition];
            for (var i = 0; i < definition.length; i++) {
                var item = definition[i];
                if (item["@role"] === "drol:short") {
                    if (item["keyValue"] && item["keyValue"].length > 0) {
                        tagItem.attr('title', item["keyValue"]);
                        break;
                    }
                }
            }
        }
    };

    /**
     * Remove epic
     * @param epic
     */
    this.removeEpic = function (epic) {
        this.$el.first().fadeOut(300, function () {
            this.props.removeEpic(epic);
        }.bind(this));

    };

    /**
     * When avatar is done loading, set the src to the loaded epic
     * @param avatar
     */
    this.avatarLoaded = function (avatar) {
        var loadedEpic = this.state.loadedEpic;
        loadedEpic.avatarSrc = avatar.url;
        if (loadedEpic.avatarSrc !== avatar.url) {
            this.extendState({
                loadedEpic: loadedEpic
            });
        }
    };


    /**
     * Show information about the epic in EpicInfoComponent rendered in a dialog
     */
    // this.showInformation = function () {
    //     var epicInfo = require('./EpicInfoComponent');
    //     this.context.api.showDialog(epicInfo, {
    //         epic: this.state.loadedEpic
    //     }, {
    //         secondary: false,
    //         title: this.state.loadedEpic.name,
    //         global: true
    //     });
    // };

    this.showHover = function () {
        var delButton = this.$el.find('.epic__button--delete');
        delButton.addClass('active');
    };
    this.hideHover = function () {
        var delButton = this.$el.find('.epic__button--delete');
        delButton.removeClass('active');
    };

};
Component.extend(EpicItemComponent);
module.exports = EpicItemComponent;

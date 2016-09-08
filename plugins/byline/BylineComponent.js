'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var $ = require('substance/util/jquery');
var idGen = require('writer/utils/IdGenerator');
// var Icon = require('substance/ui/FontAwesomeIcon');
var BylineSearchComponent = require('writer/components/json-search/JsonSearchComponent');

function BylineComponent() {

    BylineComponent.super.apply(this, arguments);
    this.name = 'byline';
}

BylineComponent.Prototype = function() {
    this.getItems = function () {
        return [
        {
          "id": 10000001,
          "fullName": "BNR Webredactie"
        },
        {
          "id": 10000002,
          "fullName": "bnr Administrator"
        },
        {
          "id": 10000003,
          "fullName": "Thijs Baas"
        },
        {
          "id": 10000004,
          "fullName": "Karin Backx"
        },
        {
          "id": 10000005,
          "fullName": "Harmen Simon Teunis"
        },
        {
          "id": 10000006,
          "fullName": "Pieter van den Akker"
        },
        {
          "id": 10000007,
          "fullName": "Jorn Lucas"
        },
        {
          "id": 10000008,
          "fullName": "ANP Nieuws"
        },
        {
          "id": 10000009,
          "fullName": "Marjan van den Berg"
        },
        {
          "id": 10000010,
          "fullName": "Karlijn Meinders"
        },
        {
          "id": 10000101,
          "fullName": "Edme Koorstra"
        },
        {
          "id": 10000102,
          "fullName": "Ronald Olsthoorn"
        },
        {
          "id": 10000201,
          "fullName": "Maurice Driessens"
        },
        {
          "id": 10000202,
          "fullName": "Remco Tomesen"
        },
        {
          "id": 10000203,
          "fullName": "Tijdo van der Zee"
        },
        {
          "id": 10000204,
          "fullName": "Noud Broekhof"
        },
        {
          "id": 10000205,
          "fullName": "Derk de Vos"
        },
        {
          "id": 10000301,
          "fullName": "Ruth Van der Vlugt"
        },
        {
          "id": 10000401,
          "fullName": "Sam de Voogt"
        },
        {
          "id": 10000501,
          "fullName": "sven anker"
        },
        {
          "id": 10000601,
          "fullName": "Paul Laseur"
        },
        {
          "id": 10000701,
          "fullName": "Mark Hulstein"
        },
        {
          "id": 10000702,
          "fullName": "Bas van Setten"
        },
        {
          "id": 10000703,
          "fullName": "Laura Walburg"
        },
        {
          "id": 10000801,
          "fullName": "Kees de Kort"
        },
        {
          "id": 10000901,
          "fullName": "Peter Paul de Vries"
        },
        {
          "id": 10001001,
          "fullName": "Ben van der Burg"
        },
        {
          "id": 10001101,
          "fullName": "Jan Postma"
        },
        {
          "id": 10001201,
          "fullName": "Marianne Zwagerman"
        },
        {
          "id": 10001301,
          "fullName": "Gerrit Visser"
        },
        {
          "id": 10001401,
          "fullName": "Bernard Hammelburg"
        },
        {
          "id": 10001501,
          "fullName": "Rob Jansen"
        },
        {
          "id": 10001601,
          "fullName": "Sven Rohde"
        },
        {
          "id": 10001701,
          "fullName": "Didi Levison"
        },
        {
          "id": 10001801,
          "fullName": "Jeroen Snoeij"
        }
      ];
    };
    this.render = function () {

        var el = $$('div').ref('authorContainer').addClass('authors').append($$('h2').append(this.context.i18n.t('Byline')));

        var authorSearchUrl = this.context.api.router.getEndpoint();

        var searchComponent = $$(BylineSearchComponent, {
            items : this.getItems(),
            // onSelect: this.addAuthor.bind(this),
            // onCreate: this.createAuthor.bind(this),
            createAllowed: true,
            placeholderText: "Byline"
        }).ref('authorSearchComponent');

        // var existingAuthorsList = $$(AuthorListComponent, {
        //     existingAuthors: this.state.existingAuthors,
        //     removeAuthor: this.removeAuthor.bind(this)
        // }).ref('existingAuthorList');

        // el.append(existingAuthorsList);
        el.append(searchComponent);

        return el;

    };

   

};
Component.extend(BylineComponent);
module.exports = BylineComponent;
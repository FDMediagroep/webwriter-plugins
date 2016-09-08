var $ = require('substance/util/jquery');

module.exports = {
    /**
     * Validation function
     *
     * Validation function must return an array of message objects. If no
     * errors, warnings or info messages are returned just return empty array.
     *
     * The context contains referenses to the writer api and i18n for transactions.
     *
     * A message object must contain two properties: type and message
     * {
     *    type: {string}, info, warning, error
     *    message: {string}, translated message
     * }
     *
     * WARNING!
     *
     * Validation should not alter the newsItem in any way. The newsItem parameter
     * is a copy of the original newsItem and thus changes will have no effect.
     * The api still references the original newsItem which means that no api functions
     * that alter the newsItem should be used.
     *
     * This behaviour is going to change...
     *
     * @param {DOMDocument} newsItem News item DOMDocument to validate.
     *
     * @return {array} Array of message objects
     */
    isValid: function(newsItem) {

        var mandatories = this.context.api.getConfigValue('defaultvalidation', 'mandatory');
        console.log(mandatories);
        var links = this.validateLinks(mandatories);
        console.log(links, 'links validate');

        var messages = [],
            pubStatus = this.context.api.getPubStatus(),
            headlines = newsItem.querySelectorAll('idf>group element[type="headline"]'),
            messageType;


        // This validation only checks headline, we want to stop publishing without
        // headline, but allow draft and cancelling with just a warning.
        switch(pubStatus.qcode) {
            case 'imext:draft':
            case 'stat:canceled':
                messageType = 'warning';
                break;
            default:
                messageType = 'error';
        }

        if (headlines.length === 0) {

            // If there are no headlines at all
            messages.push({
                type: messageType,
                message: this.context.i18n.t('The article is missing a headline which might make it hard to find.')
            });

        }
        else if (headlines[0].childNodes.length === 0 ||
                headlines[0].firstChild.nodeName != '#text' ||
                headlines[0].firstChild.textContent.trim() === '') {

            // If there are headlines but the first headline is empty
            messages.push({ 
                type: messageType,
                message: this.context.i18n.t('The first headline in the article should not be empty.')
            });

        }

        // 
        links.forEach(function(link){
            var message = link.message;
            var success = link.success;
            var name = link.name;

             if (!success) {
                $(".plugin." + name).find(".required").addClass("required-active");

                // messages.push({
                //     type: messageType,
                //     message: message
                // });

            } else {


                $(".plugin." + name).find(".required").removeClass("required-active");
            }

        });

        return messages
            .concat(
                links
                .map(function(link){
                    if (!link.success) {
                        return { type: messageType, message: link.message };
                    }

                    return null;
                })
                .filter(function(x) { return x !== null; }));

        // Return message array
        //return messages;
    },

    /*
    *   Meta links validation
    */
    validateLinks: function(links) {

        return links.map(function(link){

            var type = link.type;
            var name = link.name;
            var message = link.message;

            // getLinkByType resturns an Array, in our case this Array only has one or zero elements.
            var types = this.context.api.getLinkByType(name, type);

            var hasId = types.some(function(type) { return !!type['@id']; });

            return { success: !!hasId, message: message, name: name};

        }.bind(this));
    }

};
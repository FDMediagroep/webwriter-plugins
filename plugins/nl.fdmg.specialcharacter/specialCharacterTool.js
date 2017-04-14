import {Tool, FontAwesomeIcon} from 'substance';
import {api} from 'writer';

class SpecialCharacterTool extends Tool {

  render($$) {
    const characters = api.getConfigValue("nl.fdmg.specialcharacter", 'specialCharacters');
    const el = $$('div').addClass('special-characters')
                .append(
                    $$('i').append($$(FontAwesomeIcon, {icon: 'fa-gbp'}))
                );

    const characterWrapper = $$('div').addClass('special-characters-wrapper');

    if (characters) {
      for (let character of characters) {

        const characterButton = $$('button')
        .addClass('se-tool')
        .attr('title', character + ' ' + this.getLabel('insert'))
        .append($$('i').append(character))
        .on('click',() => api.editorSession.executeCommand('specialcharacter', {
          character: character}));

        characterWrapper.append(characterButton)
      }
    } else {
      return $$('div').addClass('special-characters');
    }

    return el.append(characterWrapper);
  }

}

export default SpecialCharacterTool;
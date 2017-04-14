import {Tool, FontAwesomeIcon} from 'substance';
import {api} from 'writer';

class SpecialCharacterTool extends Tool {

  render($$) {
    const characters = api.getConfigValue("nl.fdmg.specialcharacter", 'specialCharacters');

    const wrapperOpener = $$('button').addClass('se-tool').append(
                    $$(FontAwesomeIcon, {icon: 'fa-gbp'}))
                    .on('click',() => document.querySelector('.special-characters-wrapper').classList.add('open'));

    const el = $$('div').addClass('special-characters')
                .append(wrapperOpener);
              
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
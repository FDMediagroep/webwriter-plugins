import {Component} from 'substance';
import {api, event, moment} from 'writer';
import './scss/textanalyzer.scss';
const pluginId = 'nl.fdmg.textanalyzer';

export default class TextAnalyzerComponent extends Component {
  constructor(...args) {
    super(...args);
    this.name = 'textanalyzer';
    this.type = 'fdmg/textanalyzer';
    api.events.on('textanalyzer', event.DOCUMENT_CHANGED, () => {
      this.calculateText();
      this.updateStatus();
    });
  }

  didMount() {
    this.updateStatus();
  }

  getInitialState() {
    const count = this.getCount();

    return {
      textLength: count.textLength,
      words: count.words,
      availableSizes: api.getConfigValue(pluginId, 'sizes'),
    };
  }

  getPlannedDate() {
    //Get planneddate TODO:create seperate info plugins
    //TODO: Make the info popover into a general plugin and add textanalyzer and planneddate to that plugin
    const initialDate = api.newsItem
      .getLinkByType('planneddate', 'fdmg/planneddate');

    if (!initialDate || initialDate.length < 1) {
      return { date : '--/--/----', time : ' --:--' };
    } else { return initialDate.map(initialDate => {
      return { date : moment(initialDate['@date']).format('ll'), uuid : initialDate['@uuid'], time : initialDate['@time'] } }).pop();
    }
  }

  render($$) {
    this.virtualElement = $$;  // Hack to use $$ for later use with updateStatus

    const plannedDate = this.getPlannedDate();
    const time = plannedDate.time;
    const date = plannedDate.date;

    const documentSize = this.readDocumentSize();
    const el = $$('div').addClass('information');

    const plannedDatePlugin = $$('div')
      .addClass('planneddate-info plugin fdmg-sidebar')
      .append(
        $$('h2').append(this.getLabel('Planned date')),
        $$('span').append(date,' ', time)
        // ,$$('hr')
      );

    const textAnalyzerPlugin = $$('div')
      .addClass('textanalyzer plugin')
      .append(
        $$('div')
          .addClass('number__container clearfix')
          .append(
            $$('div')
              .addClass('count-info')
              .append($$('span').append(documentSize.size))
              .append($$('p').append(this.getLabel('Document')))
              .attr({title: this.getLabel('Document')}),
            $$('div')
              .addClass('count-info')
              .append($$('span').append(this.state.textLength.toString()))
              .append($$('p').append(this.getLabel('Characters')))
              .attr({title: this.getLabel('Characters')}),
            $$('div')
              .addClass('count-info')
              .append($$('span').append(this.state.words.toString()))
              .append($$('p').append(this.getLabel('Words')))
              .attr({title: this.getLabel('Words')})
          ),
          $$('hr')
      );

    el.append(textAnalyzerPlugin, plannedDatePlugin);
    return el;
  }

  calculateText() {
    const count = this.getCount();
    this.extendState({
      textLength: count.textLength,
      words: count.words
    });
  }

  getCount() {
    const nodes = api.document.getDocumentNodes();
    const counting = api.getConfigValue(pluginId, 'counting');

    let textContent = "";
    nodes.forEach(function (node) {
      if (node.content && counting.indexOf(node.type) > -1) {
        textContent += node.content.trim();
      }
    });
    const words = textContent.split(/\s+/);
    const textLength = textContent.length;

    return {
      words: words.length,
      textLength: textLength
    };
  }

  updateStatus() {
    const textLength = this.state.textLength;

    if (this.virtualElement) {

      // Notice that passing a VirtualElement (created with using $$) to the
      // popover.setStatusText method is an undocumented feature. Internal
      // Writer API changes may prevent this from working in the future.
      // Please provide an 'plain text' status in the else branch for fallback

      const $$ = this.virtualElement;
      const el = $$('span')
        .setStyle('font-weight', 'bold')
        .append(
          $$('span').attr({id: 'textanalyzer-indicator'}).addClass(this.getStatusColor()).append(textLength.toString()),
          $$('span').append(' ' + this.getLabel('characters'))
        );
      this.props.popover.setStatusText(el)
    } else {
      this.props.popover.setStatusText(`${textLength} ${this.getLabel('characters')}`)
    }
  }

  readDocumentSize() {
    const documentSize = api.newsItem
      .getLinkByType('textcount', 'fdmg/textcount')
      .map(link => link['@size'])
      .pop() || this.state.availableSizes[0]['size'];

    // match against available sizes
    return this.state.availableSizes.find(size =>
      size.size === documentSize
    ) || this.state.availableSizes[0];
  }

  getStatusColor() {
    const target = parseInt(this.readDocumentSize().count, 10);
    const actual = this.state.textLength;
    const margin = target / 100 * parseInt(api.getConfigValue(pluginId, 'marginPct'), 10);
    const min = target - margin;
    const max = target + margin;

    if (target < 0) return 'under-range';
    else if (actual === target) return 'perfect-range';
    else if (actual < min) return 'under-range';
    else if (actual > max) return 'over-range';
    else return 'in-range';
  }

  dispose() {
    api.events.off('textanalyzer', event.DOCUMENT_CHANGED);
  }
}

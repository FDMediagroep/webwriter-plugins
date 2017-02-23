import {Component, FontAwesomeIcon} from 'substance'
import {api, idGenerator} from 'writer'
import './scss/relatedarticles.scss'

class RelatedArticlesComponent extends Component {
  constructor(...args) {
    super(...args)
  }

  getInitialState() {
    this.name = 'relatedarticle';
    this.type = 'fdmg/relatedarticle';
    return this.readState()
  }

  render($$) {
    const el = $$('div')
      .addClass('form-group relatedarticles-container')
      .append(
        $$('h2').append(this.getLabel('Related articles')),
        $$('div')
          .append(
            [0, 1].map((i) =>
              $$('div')
                .append(
                  $$('span')
                    .append($$(FontAwesomeIcon, {icon: 'fa-times'}))
                    .on('click', () => {
                      const ref = this.refs['redirectarticleurl-' + i.toString()];
                      ref.val('');
                      this.save()
                    }),
                  $$('input')
                    .addClass('form-control')
                    .attr({type: 'text', placeholder: this.getLabel('Article url'), value: this.state.urls[i]})
                    .ref('redirectarticleurl-' + i.toString())
                    .on('blur', () => {
                      this.save()
                    })
                )
            )
          )
          .append($$('hr'))
      );

    const urls = this.state.urls;
    if (this.refs['redirectarticleurl-0']) {
      this.refs['redirectarticleurl-0'].val(urls.length >= 1 ? urls[0] : '')
    }

    if (this.refs['redirectarticleurl-1']) {
      this.refs['redirectarticleurl-1'].val(urls.length >= 2 ? urls[1] : '')
    }

    return el
  }

  save() {
    const newUrls = Object.entries(this.refs)
      .filter(e => e[0].indexOf('redirectarticleurl-') === 0)
      .map(e => e[1])
      .map(r => r.val())
      .filter(r => Boolean(r));

    // Remove existing links
    api.newsItem
      .getLinkByType(this.name, this.type)
      .forEach(l => api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel']));

    // Create new links
    newUrls.forEach(url =>
      api.newsItem.addLink(this.name, {
        '@type': this.type,
        '@rel': this.name,
        '@url': url,
        '@id': RelatedArticlesComponent.extractId(url),
        '@uuid': idGenerator()
      })
    );

    this.reloadState()
  }

  reloadState() {
    this.setState(this.readState())
  }

  readState() {
    return {
      urls: api.newsItem
        .getLinkByType(this.name, this.type)
        .map(l => l['@url'])
    }
  }

  static extractId(url) {
    // const res = (/^.*fd\.nl.*\/(\d+).*$/i).exec(url);
    const res = (/^.*(fd\.nl|esb\.nu).*\/(\d+).*$/i).exec(url);

    if (res && res.length === 2) return res[1];

    return ''
  }
}

export default RelatedArticlesComponent

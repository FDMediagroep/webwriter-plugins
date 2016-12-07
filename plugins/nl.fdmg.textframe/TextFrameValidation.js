export default {
  isValid: function(newsItem) {

    const i18n = this.context.i18n;
    const qcode = this.context.api.getPubStatus().qcode;
    //const drafted = (qcode === 'imext:draft');
    const submitted = (qcode === 'stat:withheld' || qcode === 'imext:done');
    const published = (qcode === 'stat:usable');

    const messages = [];

    if (submitted || published) {
      const textframes = Array.from(newsItem.querySelectorAll('object[type="fdmg/textframe"]'));

      textframes.forEach((tf, i) => {

        const title = tf.attributes.getNamedItem('title');
        tf.querySelector('data>text');

        if (!title || title.value.trim() === '') {
          messages.push({message: `${i18n.t('Textframe is missing title')} (${i + 1})`, type: 'error'})
        }
      })
    }
    return messages
  }
}

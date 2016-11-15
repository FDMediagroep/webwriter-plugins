const general_translations = {
};

const textcount = {
    'Size': 'Grootte',
    'Text counter': 'Tekstinformatie'
};


const epic = {
    'Epic' : 'Het complete verhaal'
    'Set epic' : 'Complete verhaal zoeken'
};

const genre = {
    'Genre' : 'Genre'
};

const breakingarticle = {
    'Breaking article' : 'Breaking artikel'
};

const donotindex = {
    'Do not index' : 'Artikel niet indexeren'
};

const paywall = {
    'Free article' : 'Gratis artikel'
};

const relatedarticle = {
    'Do not show related articles' : 'Gerelateerde artikelen niet tonen'
};

const Workinstruction = {
   'Workinstruction placeholder' : 'Werkinstructies (b.v. Locatie etc.)' 
};

const rubric = {
    'Rubric' : 'Rubriek'
};

const shortarticle = {
    'Short article' : 'Kort artikel'
};

const section = {
    'Section' : 'Sectie'
};

const articletype = {
    'Article type' : 'Artikel type'
};

const textframe = {
    'Textframe' : 'Tekstkader',
    'Title' : 'Titel',
    'Text' : 'Tekst'
};

const relatedlink = {
    'Related article' : 'Uitstapmoment',
    'Also read' : 'Lees ook',
    'Article title' : 'Titel van artikel',
    'Title' : 'Titel',
    'Text' : 'Tekst'
};

const relatedarticles = {
    'Related articles' : 'Gerelateerde artikelen',
    'Article URL' : 'Artikel url'
};

const quote = {
    'Source' : 'Bron',
    'Quote' : 'Quote'
};

const stackframe = {
    'Stackframe' : 'Stapelkader',
    'Title' : 'Titel',
    'Text' : 'Tekst'
};

const numberframe = {
    'Numberframe' : 'Cijferkader',
    'Amount' : 'Aantal',
    'Title' : 'Titel',
    'Text' : 'Tekst'
};

const redirectlink = {
    'Redirect article' : 'Redirect artikel',
    'URL to article' : 'URL naar artikel (verplicht)'
};

const fd4validation = {
  'Missing headline' : 'Geen titel ingevuld',
  'More than one headline' : 'Artikel mag maximaal 1 titel bevatten',
  'Missing author' : 'Auteur is niet ingevuld',
  'Missing teaser block' : 'Teaser mist',
  'Too many teaser blocks' : 'Teveel teasers aanwezig',
  'Missing teaser title' : 'Teaser titel niet ingevuld',
  'Missing teaser body' : 'Teaser tekst niet ingevuld',
  'Missing text length' : 'Artikel heeft geen tekstlengte',
  'Not enough characters' : 'Artikel bevat te weinig tekens',
  'Too many characters' : 'Artikel bevat teveel tekens',
  'Missing section' : 'Sectie is niet opgegeven',
  'Missings tags' : 'Geen tags ingevuld',
  'Invalid related article url' : 'Gerelateerd artikel url niet valide',
  'Topstory input value is empty' : 'Topstory staat aan maar er is geen tekst ingevuld',
  'There are one or more empty HTML-embeds' : 'Artikel bevat een lege HTML-embed',
  'Missing one or more quote messages' : 'Een of meerdere quotes bevat geen tekst',
  'Missing one or more quote sources' : 'Een of meerdere quotes bevat geen bron',
  'No textframe title' : 'Een of meerdere tekstkaders heeft geen titel',
  'No textframe content' : 'Een of meerdere tekstkaders heeft geen tekst',
  'No textframe image' : 'Een of meerdere tekstkaders heeft geen afbeelding',
  'No stackframe heading' : 'Een of meerdere stapelkaders heeft geen titel',
  'No stackframe content' : 'Een of meerdere stapelkaders heeft geen tekst',
  'No numberframe heading' : 'Een of meerdere cijferkaders heeft geen titel',
  'No numberframe content' : 'Een of meerdere cijferkaders heeft geen tekst',
  'No relatedlink prefix' : 'Een of meerdere uitstapmomenten heeft geen voorvoegsel',
  'No relatedlink leadtext' : 'Een of meerdere uitstapmomenten heeft geen tekst',
  'No relatedlink relatedurl' : 'Een of meerdere uitstapmomenten heeft geen gerelateerde url',
  'Missing one or more image credits' : 'Een of meerdere afbeeldingen heeft geen credits '
};

const workinstructions = {
    'Workinstructions' : 'Werkinstructies',
    'Workinstruction placeholder' : 'b.v. locatie en opmerkingen',
};

const author = {
    'Author' : 'Auteur',
    'Add author' : 'Auteur toevoegen',
    'Not editable author' : 'Deze auteur kan niet bewerkt worden',
    'Remove from article' : 'Uit artikel verwijderen'
};

const tags = {
    'Removed from article' : '',
    'Tags' : 'Tags',
    'Add tag' : 'Tag toevoegen'
};

const publish = {
    'Ready for approval': 'Laatste nieuws',
    'Delete article' : 'Artikel verwijderen',
    'Deleted' : 'Verwijderd',
    'The article has been deleted' : 'Het artikel is verwijderd'
};

const comments = {
    'Enable comments' : 'Commentaar inschakelen'

};

function merge() {
    var result = {};
    for(var index in arguments){
        var input = arguments[index]
        for(var key in input) result[key]=input[key];
    }
    return result;
};

module.exports = merge(
    general_translations,
    textcount,
    epic,
    genre,
    breakingarticle,
    donotindex,
    comments,
    paywall,
    relatedarticle,
    rubric,
    shortarticle,
    section,
    articletype,
    textframe,
    relatedlink,
    quote,
    stackframe,
    numberframe,
    redirectlink,
    fd4validation,
    workinstructions,
    author,
    tags,
    publish
);

const general_translations = {
};


const textcount = {
    'Article size': 'Artikelgrootte',
    'Text counter': 'Tekstinformatie'
};

const epic = {
    'Epic' : 'Epic'
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

const nocomments = {
    'Disable comments' : 'Commentaar uitschakelen'
};

const paywall = {
    'Free article' : 'Gratis artikel'
};

const showrelatedarticles = {
    'Do not show related articles' : 'Gerelateerde artikelen niet tonen'
};

const rubric = {
    'Rubric' : 'Rubriek'
};

const relatedarticles = {
    'Related Article 1' : 'Gerelateerd artikel 1',
    'Related Article 2' : 'Gerelateerd artikel 2',
    'Related articles' : 'Gerelateerde artikelen'
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

const quote = {
    'Source' : 'Bron',
    'Quote' : 'Quote'
};

const stackframe = {
    'Stackframe' : 'Stapelkader',
    'Title' : 'Titel',
    'Text' : 'Tekst'
};

const textframe = {
    'Textframe' : 'Tekstkader'
};

const numberframe = {
    'Numberframe' : 'Cijferkader',
    'Amount' : 'Aantal',
    'Title' : 'Titel',
    'Text' : 'Tekst'
};

const redirectartcile = {
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
  'Missing author': 'Auteur is niet ingevuld',
  'Missing headline': 'Headline is niet ingevuld',
  'Too many headlines': 'Te veel headlines ingevuld',
  'Missing teaser': 'Teaser mist',
  'Missing teaser title': 'Teaser titel niet ingevuld',
  'Missing teaser body': 'Teaser tekst niet ingevuld',
  'Missing section': 'Sectie is niet ingevuld',
  'Missing tags': 'Tags zijn niet opgegeven'
}

function merge() {
    var result = {};
    for(var index in arguments){
        var input = arguments[index]
        for(var key in input) result[key]=input[key];
    }
    return result;
}

module.exports = merge(
    general_translations,
    textcount,
    epic,
    genre,
    breakingarticle,
    donotindex,
    nocomments,
    paywall,
    showrelatedarticles,
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
    relatedarticles,
    showrelatedarticles
);

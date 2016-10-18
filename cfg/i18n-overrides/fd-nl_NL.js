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

const relatedarticle = {
    'Do not show related articles' : 'Gerelateerde artikelen niet tonen'
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
    redirectlink
);
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

const nocomments = {
    'Disable comments' : 'Commentaar uitschakelen'
};

const paywall = {
    'Free article' : 'Gratis artikel'
};

const relatedarticle = {
    'Do not show related articles' : 'Gerelateerde artikelen niet tonen'
};

const Workinstruction = {
   'Workinstruction placeholder' : 'Werkinstructies (b.v. Locatie etc.)' 
}

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
    'ARTICLE URL' : 'Artikel (url)'
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
  'Missing author': 'Auteur is niet ingevuld',
  'Missing headline': 'Headline is niet ingevuld',
  'Too many headlines': 'Artikel mag maximaal 1 titel bevatten',
  'Missing teaser': 'Teaser mist',
  'Missing teaser title': 'Teaser titel niet ingevuld',
  'Missing teaser body': 'Teaser tekst niet ingevuld',
  'Missing section': 'Sectie is niet ingevuld',
  'Missing tags': 'Tags zijn niet opgegeven'
}

const workinstructions = {
    'Workinstructions' : 'Werkinstructies',
    'Workinstruction placeholder' : 'b.v. locatie en opmerkingen',
}

const author = {
    'Author' : 'Auteur',
    'Add author' : 'Auteur toevoegen',
    'Not editable author' : 'Deze auteur kan niet bewerkt worden',
    'Remove from article' : 'Uit artikel verwijderen'
}

const tags = {
    'Removed from article' : '',
    'Tags' : 'Tags',
    'Add tag' : 'Tag toevoegen'

}

const publish = {
    'Ready for approval': 'Laatste nieuws (submitted)',
    'Delete article' : 'Artikel verwijderen',
    'Deleted' : 'Verwijderd',
    'The article has been deleted' : 'Het artikel is verwijderd'

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
    redirectlink,
    fd4validation,
    workinstructions,
    author,
    tags,
    publish
);

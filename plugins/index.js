import LocalFocus from './nl.fdmg.localfocus/index'

import TextAnalyzer from './nl.fdmg.textanalyzer/index';

import Author from './nl.fdmg.author/index';
import Tags from './nl.fdmg.tags/index';

import DoNotIndex from './nl.fdmg.donotindex/index';
import FDPersonal from './nl.fdmg.fdpersonal/index';
import ShowRelatedArticles from './nl.fdmg.showrelatedarticles/index';
import Paywall from './nl.fdmg.paywall/index';
import Topstory from './nl.fdmg.topstory/index';
import Comments from './nl.fdmg.comments/index';
import Breakingarticle from './nl.fdmg.breakingarticle/index';
import Shortarticle from './nl.fdmg.shortarticle/index';

import Section from './nl.fdmg.section/index';
import Genre from './nl.fdmg.genre/index';
import Rubric from './nl.fdmg.rubric/index';

import RelatedArticles from './nl.fdmg.relatedarticles/index';

import ArticleType from './nl.fdmg.articletype/index';
import RedirectLink from './nl.fdmg.redirectlink/index';
import Epic from './nl.fdmg.epic/index';

import TextcountSelector from './nl.fdmg.textcountselector/index';

import Quote from './nl.fdmg.quote/index';
import NumberFrame from './nl.fdmg.numberframe/index';
import StackFrame from './nl.fdmg.stackframe/index';
import RelatedLink from './nl.fdmg.relatedlink/index';
import TextFrame from './nl.fdmg.textframe/index';
//import Stockticker from './nl.fdmg.stockticker/index';

(() => {
  LocalFocus()

  TextAnalyzer();

  Author();
  Tags();

  DoNotIndex();
  FDPersonal();
  ShowRelatedArticles();
  Paywall();
  Topstory();
  Comments();
  Breakingarticle();
  Shortarticle();

  Section();
  Genre();
  Rubric();

  RelatedArticles();

  ArticleType();
  RedirectLink();
  Epic();

  TextcountSelector();

  Quote();
  NumberFrame();
  StackFrame();
  RelatedLink();
  TextFrame();

  //Stockticker();
})()

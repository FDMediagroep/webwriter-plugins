import SidebarTabs from './nl.fdmg.sidebartabs/index';

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
import FullWidth from './nl.fdmg.fullwidth/index';

import Section from './nl.fdmg.section/index';
import Genre from './nl.fdmg.genre/index';
import Rubric from './nl.fdmg.rubric/index';

import RelatedArticles from './nl.fdmg.relatedarticles/index';

import ArticleType from './nl.fdmg.articletype/index';
import RedirectLink from './nl.fdmg.redirectlink/index';
import Advertorial from './nl.fdmg.advertorial/index';
import ServicePage from './nl.fdmg.servicepage/index';
import Epic from './nl.fdmg.epic/index';
import Preview from './nl.fdmg.preview/index';

import TextcountSelector from './nl.fdmg.textcountselector/index';

import Stockticker from './nl.fdmg.stockticker/index';
import Quote from './nl.fdmg.quote/index';
import NumberFrame from './nl.fdmg.numberframe/index';
import StackFrame from './nl.fdmg.stackframe/index';
import RelatedLink from './nl.fdmg.relatedlink/index';
import TextFrame from './nl.fdmg.textframe/index';
import HtmlEmbed from './nl.fdmg.htmlembed/index';

import Heartbeat from './nl.fdmg.heartbeat/index';
import History from './nl.fdmg.history/index';
import PublishFlow from './nl.fdmg.publishflow/index';
import Planneddate from './nl.fdmg.planneddate/index';
import Workinstructions from './nl.fdmg.workinstructions/index';
import Workflowstate from './nl.fdmg.workflowstate/index';

import ImageSearch from './nl.fdmg.imagesearch/index';

import XimTeaserStandin from './nl.fdmg.ximteaserstandin/index';
import XimImageStandin from './nl.fdmg.ximimagestandin/index';
import HeadlineStandin from './nl.fdmg.headlinestandin/index';

// Import this last!
import Translations from './nl.fdmg.translations/index';

(() => {
  SidebarTabs();
  LocalFocus();

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
  FullWidth();

  Section();
  Genre();
  Rubric();

  RelatedArticles();

  ArticleType();
  RedirectLink();
  Advertorial();
  ServicePage();
  Epic();
  Preview();

  TextcountSelector();

  Stockticker();
  TextFrame();
  Quote();
  NumberFrame();
  StackFrame();
  RelatedLink();

  HtmlEmbed();

  Heartbeat();
  History();
  PublishFlow();
  Planneddate();
  Workinstructions();
  Workflowstate();

  ImageSearch();

  XimTeaserStandin();
  XimImageStandin();
  HeadlineStandin();

  // Import this last!
  Translations();
})();

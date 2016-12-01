import DoNotIndex from './nl.fdmg.donotindex/index'
import FDPersonal from './nl.fdmg.fdpersonal/index'
import ShowRelatedArticles from './nl.fdmg.showrelatedarticles/index'
import Paywall from './nl.fdmg.paywall/index'

(() => {
  DoNotIndex()
  FDPersonal()
  ShowRelatedArticles()
  Paywall()
})()

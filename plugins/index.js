import DoNotIndex from './nl.fdmg.donotindex/index'
import FDPersonal from './nl.fdmg.fdpersonal/index'
import ShowRelatedArticles from './nl.fdmg.showrelatedarticles/index'

import Section from './nl.fdmg.section/index'

(() => {
  DoNotIndex()
  FDPersonal()
  ShowRelatedArticles()

  Section()
})()

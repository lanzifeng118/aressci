import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/p-home/home'
import Product from 'components/p-product/product'
import ProductAll from 'components/p-product/all/all'
import ProductList from 'components/p-product/list/list'
import ProductSearch from 'components/p-product/search/search'
import ProductDisplay from 'components/p-product/display/display'
import Experience from 'components/p-experience/experience'
import ExperienceAll from 'components/p-experience/all/all'
import ExperienceList from 'components/p-experience/list/list'
import News from 'components/p-news/news'
import NewsList from 'components/p-news/list/list'
import NewsDisplay from 'components/p-news/display/display'
import Support from 'components/p-support/support'
import About from 'components/p-aboutus/aboutus'
import AboutDisplay from 'components/p-aboutus/display/display'
import ErrorPage from 'components/p-error/error'

Vue.use(Router)
let obj = {
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/error',
      component: ErrorPage
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/product',
      component: Product,
      redirect: 'product/all',
      children: [
        {
          path: 'all',
          component: ProductAll
        },
        {
          path: 'list',
          component: ProductList,
          children: [
            {path: ':id'}
          ]
        },
        {
          path: 'search',
          component: ProductSearch,
          children: [
            {path: ':id'}
          ]
        },
        {
          path: 'display',
          component: ProductDisplay,
          children: [
            {
              path: ':id',
              children: [
                {path: ':id'}
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/experience',
      redirect: 'experience/all',
      component: Experience,
      children: [
        {
          path: 'all',
          component: ExperienceAll
        },
        {
          path: 'list',
          component: ExperienceList,
          children: [
            {path: ':id', component: ExperienceList}
          ]
        }
      ]
    },
    {
      path: '/news',
      redirect: 'news/all',
      component: News,
      children: [
        {
          path: 'all',
          component: NewsList
        },
        {
          path: 'list/:id',
          component: NewsList
        },
        {
          path: 'display',
          component: NewsDisplay,
          children: [
            {path: ':id', component: NewsDisplay}
          ]
        }
      ]
    },
    {
      path: '/support',
      component: Support
    },
    {
      path: '/aboutus',
      redirect: 'aboutus/display',
      component: About,
      children: [
        {
          path: 'display',
          component: AboutDisplay,
          children: [
            {path: ':id', component: AboutDisplay}
          ]
        }
      ]
    }
  ]
}
export default new Router(obj)

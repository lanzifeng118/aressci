import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/p-home/home'
import Product from 'components/p-product/product'
import ProductAll from 'components/p-product/all/all'
import ProductList from 'components/p-product/list/list'
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
// import Resource from 'components/resource/resource'
// import ResourcePhoenix from 'components/resource/phoenix/phoenix'
// import ResourceAsk from 'components/resource/phoenix/ask/ask'
// import ResourceCase from 'components/resource/phoenix/case/case'
// import ResourceDrager from 'components/resource/drager/drager'
// import ResourceAircuity from 'components/resource/aircuity/aircuity'

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
          redirect: 'display/01',
          component: AboutDisplay,
          children: [
            {path: ':id', component: AboutDisplay}
          ]
        }
      ]
    }
    // {
    //   path: '/resource',
    //   redirect: 'resource/phoenix',
    //   component: Resource,
    //   children: [
    //     {
    //       path: 'phoenix',
    //       component: ResourcePhoenix,
    //       redirect: 'phoenix/ask',
    //       children: [
    //         {
    //           path: 'ask',
    //           component: ResourceAsk
    //         },
    //         {
    //           path: 'case',
    //           component: ResourceCase
    //         },
    //         {
    //           path: 'industrylinks',
    //           component: ResourceCase
    //         },
    //         {
    //           path: 'industryterms',
    //           component: ResourceCase
    //         },
    //         {
    //           path: 'PCoptimizer',
    //           component: ResourceCase
    //         }
    //       ]
    //     },
    //     {
    //       path: 'drager',
    //       component: ResourceDrager
    //     },
    //     {
    //       path: 'aircuity',
    //       component: ResourceAircuity
    //     }
    //   ]
    // }
  ]
}
export default new Router(obj)

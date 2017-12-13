import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from 'components/error/error'
import Home from 'components/home/home'
import Product from 'components/product/product'
import ProductAll from 'components/product/all/all'
import ProductList from 'components/product/list/list'
import ProductDisplay from 'components/product/display/display'
import Experience from 'components/experience/experience'
import ExperienceAll from 'components/experience/all/all'
import ExperienceList from 'components/experience/list/list'
import News from 'components/news/news'
import NewsList from 'components/news/list/list'
import NewsDisplay from 'components/news/display/display'
import Service from 'components/service/service'
import About from 'components/about/about'
import AboutDisplay from 'components/about/display/display'
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
      path: '/service',
      component: Service
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

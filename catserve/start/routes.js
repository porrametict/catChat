'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.post('login','UserController.login').validator('Login')
Route.post('getUser','UserController.getuser')

Route.resource('user','UserController')/*.validator(new Map([
    [['store'], ['StoreUser']],
    [['update'], ['UpdateUser']]
  ]))*/


  Route.on('/chat').render('chat')
  Route.on('/quiz').render('quiz')
  Route.on('/login').render('login')
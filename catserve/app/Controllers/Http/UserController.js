'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async login ({request,response,auth,view})
  {
      const {username,password} = request.all()
      let token = await auth.authenticator('user').attempt(username,password);
      //return token
      console.log("in USERCONTRoLER",token);
      //return view.render('home',{userToken : token})
      return view.render('home',{userToken:token});
  }
  
  async getuser({request, auth}) {
   let user = await auth.authenticator('user').user;
       return user
  }


  async index ({ request, response, view }) {

    let query =await User.query().fetch();
    return query
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    
    let form  = request.all()
    let user = new User();
    user.fill(form)
    await user.save()
    return user;
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let user = User.query().where('id',params.id).first()
    return user;
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    let user = await User.findOrFail(params.id)

    let form =request.except(['password_comfirmation'])
    user.merge(form)
    await user.save()
    return user ;
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    let user = await User.findOrFail(params.id)
     return user.delete()
  }
}

module.exports = UserController

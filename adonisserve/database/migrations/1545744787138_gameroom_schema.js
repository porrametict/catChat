'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameroomSchema extends Schema {
  up () {
    this.create('gamerooms', (table) => {
      table.increments()
      table.string("name_room")
      table.integer("host_id")
      table.timestamps()
    })
  }

  down () {
    this.drop('gamerooms')
  }
}

module.exports = GameroomSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomsSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.string("room_code")
      table.integer("host_id")
      table.integer("subject_id")
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomsSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatroomSchema extends Schema {
  up () {
    this.create('chatrooms', (table) => {
      table.increments()
      table.string("name_room")
      table.timestamps()
    })
  }

  down () {
    this.drop('chatrooms')
  }
}

module.exports = ChatroomSchema

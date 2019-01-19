'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScoresSchema extends Schema {
  up () {
    this.create('scores', (table) => {
      table.increments()
      table.integer("roomId")
      table.integer("userId")
      table.integer("hostId")
      table.integer("score")
      table.timestamps()
    })
  }

  down () {
    this.drop('scores')
  }
}

module.exports = ScoresSchema

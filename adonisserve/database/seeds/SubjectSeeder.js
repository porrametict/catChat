'use strict'

/*
|--------------------------------------------------------------------------
| SubjectSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Subject = use('App/Models/Subject')

class SubjectSeeder {
  async run () {

    let subject1 = {
      subject_name :  "Fundamental of Database",
      subject_code :  "227206" 
    }

    let newSubject  = new Subject () 
    newSubject.fill(subject1)
    await newSubject.save()

    let sj2 = {
      subject_name :  "Object-Oriented Software Engineering",
      subject_code :  "227251" 

    }
    let newsj3  = new Subject () 
    newsj3.fill(sj2)
    await newsj3.save()

    let sj3 = {
      subject_name : "User Interface Design",
      subject_code : "227252"
    }

    let newsj2  = new Subject () 
    newsj2.fill(sj3)
    await newsj2.save()

    let sj4 = {
      subject_name : "Socialized Peronality",
      subject_code : "004201"
    }

    let newsj4  = new Subject () 
    newsj4.fill(sj4)
    await newsj4.save()

    let sj5 = {
      subject_name : "Multicultural Society",
      subject_code : "002202" 
    }
    
    let newsj5  = new Subject () 
    newsj5.fill(sj5)
    await newsj5.save()

  }
}

module.exports = SubjectSeeder

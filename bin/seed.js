#!/usr/bin/env node

const {db, Campus, Student} = require('../server/db')
const data = require('../data/campuses.json')

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(data.map(async campusData => {
    const campus = await Campus.create({
      name: campusData.name,
      location: campusData.location,
      headmaster: campusData.headmaster,
      headmaster_email: campusData.headmaster_email,
      image_url: campusData.image_url
    })
    await Promise.all(campusData.students.map(async studentData => {
      const student = await Student.create(studentData)
      await student.setCampus(campus)
    }))
  }))

  db.close()
  console.log(`

    Seeding successful!
    Time to do stuff!

  `)
}

seed().catch(err => {
  db.close()
  console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `)
})

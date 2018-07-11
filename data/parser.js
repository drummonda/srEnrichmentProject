let data = `[{
  "name": "Hogwarts",
  "location": "Heathrow, England",
  "headmaster": "Albus Dumbledore",
  "headmaster_email": "albus@hogwarts.wiz",
  "image_url": "hogwarts.jpg",
  "students": [{
    "name": "Cody",
    "age": "11",
    "favorite_food": "Tacos",
    "image_url": "cody.jpg"
  }, {
    "name": "Ron (aka Reggie)",
    "age": "2",
    "favorite_food": "Peanut Butter",
    "image_url": "reggie.jpg"
  }, {
    "name": "Hermoine",
    "age": "3",
    "favorite_food": "Ice cream",
    "image_url": "jas.jpg"
  }, {
    "name": "Athena",
    "age": "9",
    "favorite_food": "Grass",
    "image_url": "athena.jpg"
  }]
},{
  "name": "Durmstrang",
  "location": "Instanbul, Turkey",
  "headmaster": "Igor Karkaroff",
  "headmaster_email": "igor@durm.wiz",
  "image_url": "durmstrang.jpg",
  "students": [{
    "name": "Viktor",
    "age": "27",
    "favorite_food": "Licorice",
    "image_url": "viktor.jpg"
  }, {
    "name": "Igor",
    "age": "21",
    "favorite_food": "Purell",
    "image_url": "igor.jpg"
  }, {
    "name": "Helga",
    "age": "32",
    "favorite_food": "pills",
    "image_url": "helga.jpg"
  }, {
    "name": "Ivy",
    "age": "9",
    "favorite_food": "Sunshine",
    "image_url": "ivy.jpg"
  }]
},{
  "name": "Beauxbaton",
  "location": "Copenhagen, Denmakr",
  "headmaster": "Olympe Maxime",
  "headmaster_email": "olympe@beaux.wiz",
  "image_url": "beauxbaton.jpg",
  "students": [{
    "name": "Ilena",
    "age": "12",
    "favorite_food": "Sheep",
    "image_url": "ilena.jpg"
  }, {
    "name": "Fleur",
    "age": "22",
    "favorite_food": "Fairies",
    "image_url": "fleur.jpg"
  }, {
    "name": "Allegra",
    "age": "3",
    "favorite_food": "Haggis",
    "image_url": "allegra.jpg"
  }, {
    "name": "June",
    "age": "10",
    "favorite_food": "Margerine",
    "image_url": "june.jpg"
  }]
}]`

let newData = JSON.parse(data);
console.log(newData);

const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

class Card {
  // constructor(){

  // }

  //yangi yaratib qoshib beradi
  static async add(car) {
    const card = await Card.fetch();
    const idx = card.cars.findIndex((c) => c.id === car.id);
    const condidate = card.cars[idx];
    if (condidate) {
      //demak bu mmoshina  bazasida bor
      condidate.count++;
      card.cars[idx] = condidate;
    } else {
      //demak bu moishi9na  yoq unda yaratamiz
      car.count = 1;
      card.cars.push(car);
    }
    // card.price= +car.price+ card.price
    card.price += +car.price;
    return new Promise((resolve, rejects) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) {
          rejects(err);
        } else {
          resolve();
        }
      });
    });
  }
  static fetch() {
    // bu esa bor  produktaga qoshib beradi
    return new Promise((resolve, rejects) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          rejects(err)
        } else {
          resolve(JSON.parse(content))
        }
      });
    });
  }

  //remove ochirish metodi
  static async remove(id) {
    const card = await Card.fetch()
    const idx = card.cars.findIndex(c => c.id === id)
    const car = card.cars[idx] //mersades
    if (car.count === 1) {
      card.cars = card.cars.filter(c => c.id !== id)
    } else {
      card.cars[idx].count--
    }
    card.price -=car.price


return new Promise((resolve,rejects)=>{
  fs.writeFile(p,JSON.stringify(card),(err)=>{
    if (err) {
      rejects(err)
    } else {
      resolve(card)
    }
  })
})

  }
}
module.exports = Card;
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

class Car {
  constructor(model, price, img) {
    //hohlagancha atasa boladi
    this.model = model;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }
  toJSON() {
    return {
      model: this.model,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  async save() {
    const cars = await Car.getAll(); //massiv
    cars.push(this.toJSON());
    return new Promise((resolve, rejects) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "cars.json"),
        JSON.stringify(cars),
        (err) => {
          if (err) {
            rejects(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

 
  static getAll() {
    return new Promise((resolve, rejects) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "cars.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            rejects(err);
          } else {
            resolve(JSON.parse(content)); //stringni massiv qilib beradi
          }
        }
      );
    });
  }


 static async update(car) {
    const cars = await Car.getAll();
    const idx = cars.findIndex(c => c.id === car.id);
    cars[idx] = car  
    return new Promise((resolve, rejects) => {
      fs.writeFile(
        path.join( __dirname, "..", "data", "cars.json"),
        JSON.stringify(cars),
        (err) => {
          if (err) {
            rejects(err);
          } else {
           
            resolve();
          }
        }
      );
    });

  }



  static async getById(id) {
    const cars = await Car.getAll();
     return  cars.find(c => c.id === id);
   
  }

 
}
module.exports = Car;

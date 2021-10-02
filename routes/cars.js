const { Router, query } = require("express");
const router = Router();
const Car = require("../models/cars");

router.get("/", async (req, res) => {
  const cars = await Car.getAll();
  
  res.render("cars", {
    title: "Books name",
    isCars: true,
    cars,
  });
});
//idi boyicha THIS IS LINK GET SOROV
router.get("/:id", async (req, res) => {

  const car = await Car.getById(req.params.id); //obyekt olyabti
  res.render("car", {
    layout: "empty",
    title: `Books name ${car.model} `,
    car,
  });
});
///EDIT UCHUN GET  ID BOYLAB
router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    res.redirect("/");
  }
  const car = await Car.getById(req.params.id);

  res.render("carEdit", {
    title: "Edit books",
    car,
  });
});

////EDIT UCHUN POST SOROV
router.post("/edit", async (req, res) => {

  await Car.update(req.body);
  
  
  res.redirect("/cars");
  
});

module.exports = router;

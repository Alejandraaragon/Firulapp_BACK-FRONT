const { Router } = require('express');
const { API_KEY } = process.env;
const { Breed, Temperament } = require("../db");
const { getInfoTotal } = require("../controllers/controllers.js");
const router = Router();
const axios = require('axios');


router.get("/dogs", async (req, res) => {
    const name = req.query.name;
    const allDogs = await getInfoTotal();
    try {
            if(name) {
            const dogName = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length
            ? res.status(200).json(dogName)
            : res.status(404).send({error:"Dog not found"})
            } else {
            res.status(200).json(allDogs)
        }
    } catch (error) {
        res.status(404).send({error: "Dog not found"})
    }
});


router.get("/dogs/:id", async (req, res) => {
    const { id } = req.params;
    const allDogs = await getInfoTotal();
   try {
    if(id){
        const dogId = allDogs.filter(e => e.id == id)
        dogId.length
        ? res.status(200).json(dogId)
        : res.status(404).json({error: "Dog not found"})
    } 
   } catch (error) {
    res.status(404).json({error: "Dog not found"})
   }
    
})

 router.get("/temperament", async (_req, res) => {
    try {
         const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);//
         const infTemp = await apiInfo.data.map(e => e.temperament);//trae los temps en cadenas de string ej: ['Stubborn, Alert, Companionable, Intelligent, Cunning, Trainable', 'Alert, Reserved, Intelligent, Even Tempered, Watchful, Calm',]
         let tempSplit = await infTemp.join().split(',')//separa cada temperamente con comas ej: [' Adventurous', ' Clownish']
         let tempTrim = await tempSplit.map(n => n.trim())//saca los espacios entre las comillas ej: ['Adventurous', 'Clownish']
          
         tempTrim.forEach(async (i) => {
            if(i.length > 0 ){
                await Temperament.findOrCreate({
                where:{ name: i}
            })
            }
          })
          
        const allTemper = await Temperament.findAll();
        res.status(200).json(allTemper);

    } catch (error) {
        res.status(404).send({error: 'There are not temperaments'})
        
    }
   
}) 

router.post("/dogs", async (req, res) => {
    let { name,
          height_min,
          height_max,
          weight_min,
          weight_max,
          life_span,
          image,
          temperament,
          createdAtDb
        } = req.body;

    let newDog = await Breed.create({
          name,
          height_min,
          height_max,
          weight_min,
          weight_max,
          life_span,
          image,
          createdAtDb
    })    

    let tempDb = await Temperament.findAll({
        where: {name: temperament}
    })

    newDog.addTemperament(tempDb)
    return res.status(200).send("Dog created")
})

//  router.use(express.json());
 module.exports = router;
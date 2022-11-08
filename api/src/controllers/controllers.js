const { Breed, Temperament } = require("../db")
const axios = require("axios");
const { API_KEY } = process.env;
//?api_key=${API_KEY}

const getAllInfoApi = async () => {
    const getApiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`); 
    let infoApi = await getApiInfo.data.map((e) => {  
        return {
            id: e.id,
            name: e.name,
            height_min: parseInt(e.height.metric.split("-")[0]),
            height_max: parseInt(e.height.metric.split("-")[1]),
            weight_min: parseInt(e.weight.metric.split("-")[0]),//3 - 6
            weight_max: parseInt(e.weight.metric.split("-")[1]),
            life_span: e.life_span,
            image: e.image.url,
            temperament: e.temperament
          };
         
       }); 
       return infoApi
   }; 
 
   const getInfoDb = async () => {
   let infoDb = await Breed.findAll({
        include: {
            model: Temperament,
            atributtes: ["name"],
            through: {
                atributtes: []
            }
        }
    });
    infoDb = await infoDb.map(d => {
        return {
            id: d.id,
            name: d.name,
            height_min: d.height_min,
            height_max: d.height_max,
            weight_min: d.weight_min,
            weight_max: d.weight_max,
            life_span: d.life_span,
            image: d.image.url,
            createdAtDb: d.createdAtDb,
            temperament: d.temperaments.map(e => {return e.name}).join(",")
        }
    });
    return infoDb; 
    };

    const getInfoTotal = async () => {
        let apiInfo = await getAllInfoApi();
        let dbInfo = await getInfoDb();
        let infoTotal = apiInfo.concat(dbInfo)
        
    
        return infoTotal;  
    };

module.exports = {
        getInfoTotal
    } 
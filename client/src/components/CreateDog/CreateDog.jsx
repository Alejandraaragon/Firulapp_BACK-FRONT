import React, { useEffect, useState }from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperament, postDog, getAllDogs } from "../../redux/actions";
import style from "../CreateDog/CreateDog.module.css";

/* const validateUrl = (url) => {
    try {
        new URL(url);
    } catch (e) {
        return false;
    }
    return true;
}; */

function validate(input){
  let error = {};//guardo los errores en un objeto vacio

  if(!input.name){//si no hay un name devolver el error: name es obligatorio
    error.name = "Name is mandatory"
  }else if(!/[^a-z\s]/i.test(input.name) === false){//debe contener caracteres letras con espacios e incluir mayusculas y minusculas. Si esto NO pasa nnetonces el input.name es falso y dará error
    error.name = "Not a numbers"
  }else if(input.name.length > 100){// si el nombre es mayor a 100 caracteres
    error.name = "100 characters max"
  }else if(input.name.length < 3){//si el nombr es menor a 3 caracteres
    error.name = "3 characters min"
  }
  if(!input.height_min || input.height_min <= 0){//si no hay altura minima o si la altura minima es menor o igual a cero
    error.height_min = "The min height must be bigger"
  }else if(input.height_min || input.height_max){//si hay una altura minima o una altura maxima debe ser un numero
    if(!/^[0-9]*$/){
    error.height = "It must be only numbers"
    }
  }
  if(!input.height_max || input.height_max <= 0){// si no hay altura maxima o si la altura maxima es menor o igual a cero
    error.height_max = "The max height  must be bigger"
  }
  if(parseInt(input.height_min) >= parseInt(input.height_max)){//pasamos de cadena a entero. Si la altura minima es mayor o igual a la altura maxima
    error.height_min_max = "The height min can not be bigger or equal than the max height"
  }
  if(!input.weight_min || input.weight_min <= 0){///si no hay peso minimo o si el peso minimo es menor o igual a cero
    error.weight_min = "The min weight must be bigger"
  }else if(input.weight_min){//si hay un peso minimo debe ser nuneroi
    if(!/^[0-9]*$/){
        error.weight_min = "It must be only numbers"
    } 
  }
  if(!input.weight_max || input.weight_max  <= 0){// si no hay aun peso maximo o el peso maximo es menor o igual a 0
    error.weight_max  = "The max weight must be bigger"
  }else if(input.weight_max){// si hay un peso maximo debe ser numero
    if (!/^[0-9]*$/) {
        error.weight_max = "It must be only numbers"
    }
  }
  if(parseInt(input.weight_min) >= parseInt(input.weight_max)){//pasamos de cadena a entero. Si el peso minimo es mayor o igual al peso maximo
    error.weight_min_max = "The weight min can not be bigger or equal than the max weight"
  }
  if(!input.life_span || input.life_span <= 0){//si no hay tiempo de vida o el tiempo de vida es menor o igual a 0
    error.life_span = "The lifetime must be longer"
  }else if(input.life_span){//si hay un tiempo de vida debe ser numero
    if (!/^[0-9]*$/) {
        error.life_span2 = 'It must be only numbers'
    }
  }
 /*  if(!input.image){
    error.image = "Image URL is required"
  }if(!validateUrl(input.image)){
    error.image = "Invalid image URL"
  } */
  if(!input.temperament[0]){
    error.temperament = "At least one temperament of Dog is required";
}
  return error;

}


const CreateDog = () => {

const dispatch = useDispatch();
/* const history = useHistory(); */

const allTemperaments = useSelector((state) => state.temperament)
const allDogs = useSelector((state) => state.filterDogs)

//creo dos estados locales
const [error, setError] = useState({})//se van a guardar todos los errores
const [input, setInput] = useState({

        name: '',
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span: 0,
        image: '',
        temperament:[]
})

useEffect(() => {
    dispatch(getAllDogs())
    dispatch(getTemperament())
}, [dispatch])

//CADA CARACTER QUE SE EMITE EN EL INPUT DE CADA CASILLA
const handleInputChange = (e) => {
   setInput({
    ...input,
    [e.target.name]: e.target.value,
   })
   setError(validate({//si hay un error, se guarda en el estado error y se setea aplicando la funcion validate
    ...input,
    [e.target.name]: e.target.value,
   }))
   console.log(input)
}

//Selecciona el temperamento que traemos desde la accion
//si no hay nada en el estado input.temperaments que incluya un valor
//setearlo con una copia del estado anterior + un valor nuevo 
const handleSelect = (e) => {
   if(!input.temperament.includes(e.target.value)){
    setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
    })
   }
}

const handleDeleteTemp = (e) => {
    setInput({
        ...input,
        temperament: input.temperament.filter(n => n !== e)
    })//cuando recorre el elemento  debe compararlo y debe ser diferente
}
 
const handleSubmit = (e) => {
  e.preventDefault();
  if (!input.name.trim()){
    alert('Dog Name is required');
}else if (allDogs.find((e) => e.name.toLowerCase() === input.name.toLowerCase())){
alert(`The Dog  ${input.name} already exist. Please choose another Name.`);
}else if (!input.height_min || input.height_min <= 0){
alert('Invalid Dog height min value');
} else if (!input.height_max || input.height_max <= 0){
alert('Invalid Dog height max value');
} else if (!input.weight_min || input.weight_min <=0){
alert('Invalid Dog weight min value');
} else if (!input.weight_max || input.weight_max <=0){
alert('Invalid Dog weight max value');
} else if (!input.life_span || input.life_span <= 0){
alert('Invalid Dog lifetime value');
} else if (!input.image){
alert("Invalid image is required");
} else if (!input.temperament || input.temperament.length === 0){
alert('At least one Dog temperament is required.');
} else { 

  dispatch(postDog(input))
  alert("The dog was created")
  setInput({
    name: '',
    height_min: 0,
    height_max: 0,
    weight_min: 0,
    weight_max: 0,
    life_span: 0,
    temperament:[]
  })
  //history.push("/home")//cuando se termine de guardar y nos muestre el alert vaya al home de nuevo
} 
}
return (
<div className={style.containCreate}>
    <div>{/* 2. div  */}
    <Link to="/home">
        <button className={style.btnHome}>HOME</button>
    </Link>
    </div>{/* 2. div  */}
    <div className={style.containAll}> {/* 3. div  */}
       <h2 className={style.title}>CREATE DOG</h2>
        <form onSubmit={e => handleSubmit(e)}>
            <div className={style.infoInput}>{/* 4. div- encierra: Name, Height Min, Height Max, Weight Min, Weight Max, Life Time*/}
               <div>
                <h3>Name:</h3>
                <input className={error.name && "danger"} type="text" value={input.name} name='name' onChange={e => handleInputChange(e)} placeholder='Name' />
                <p>{error.name}</p>
               </div>
               <div>
                <h3>Height Min:</h3>
                <input className={error.height_min && "danger"} min='0' type="number" value={input.height_min} name="height_min" onChange={e => handleInputChange(e)} placeholder='height min' />
                <p>{error.height_min}</p>
               </div>
               <div>
                <h3>Height Max:</h3>
                <input className={error.height_max && "danger"} min='0' type="number" value={input.height_max} name="height_max" onChange={e => handleInputChange(e)} placeholder='height max'/>
                <p>{error.height_max}</p>
               </div>
               <div>
                <h3>Weight Min:</h3>
                <input className={error.weight_min && "danger"} min='0' type="number" value={input.weight_min} name="weight_min" onChange={e => handleInputChange(e)} placeholder='weight min'/>
                <p>{error.weight_min}</p>
               </div>
               <div>
                <h3>Weight Max:</h3>
                <input className={error.weight_max && "danger"} min='0' type="number" value={input.weight_max} name="weight_max" onChange={e => handleInputChange(e)} placeholder='weight max'/>
                <p>{error.weight_max}</p>
               </div>
               <div>
                <h3>Life Time:</h3>
                <input className={error.life_span && "danger"} min='0' type="number" value={input.life_span} name="life_span" onChange={e => handleInputChange(e)} placeholder='lifetime'/>
                <p>{error.life_span}</p>
               </div>
               <div>
                <h3>Image:</h3>
                <input className={error.image && "danger"} type="text" value={input.image} name="image" onChange={e => handleInputChange(e)} placeholder='image'/>
                <p>{error.image}</p>
               </div>
            </div>{/* 4. div- encierra: Name, Height Min, Height Max, Weight Min, Weight Max, Life Time*/}
            <div className={style.temperCreate}>{/* 5 div - encierra temperamento */}
               <h3>Temperament:</h3>
               <select onChange={e => handleSelect(e)}>
                 <option hidden value="All">Temperament</option>
                 {
                    allTemperaments?.map(e => {
                        return (
                          <option value={e.name} key={e.id}>{e.name}</option>  
                        )
                    })
                 }
                 
               </select>
               <div>{/* 6 div */}
               {input.temperament.map((d , i) => {
                            return (
                                <div key={i++}>
                            <div> {d} </div>
                            <button onClick={() => handleDeleteTemp(d)}>X</button>
                            </div>
                                )
                            })
                        }     
               </div>{/* 6 div */}
            </div>

            {    /*error && //si hay un error y 
               (error.name ||//
                error.height_min ||
                error.height_max ||
                error.weight_min ||
                error.weight_max ||
                error.life_span ||
                error.height_min_max ||
                error.weight_min_max ||
                !input.name.length ||
                input.height_min <= 0 ||
                input.height_max <= 0 ||
                input.weight_min <= 0 ||
                input.weight_max <= 0 ||
                input.life_span <= 0 ||
                input.height_min >= input.height_max ||
                input.weight_min >= input.weight_max ||
                !input.temperament.length) */

                !error.name &&
                !error.height_min &&
                !error.height_max &&
                !error.weight_min &&
                !error.weight_max &&
                !error.life_span &&
                !error.image &&
                !error.temperament
                ?
                 
                 <button className={style.btnCreate} type='submit'><strong>CREATE</strong></button>
              
                :
                <div disabled type='submit'>DOG NOT CREATED YET</div>
               /*  <div>THE DOG CAN NOT BE CREATED YET</div> */ 
            }
        </form>
    </div>{/* 3. div  */}
</div>
)

}

export default CreateDog;
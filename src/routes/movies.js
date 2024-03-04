const { Router } = require("express");
const router = Router();
const fs = require('node:fs');

//extract the data from json file
const readData = () => {
  try { 
  const data = fs.readFileSync('../movies.json');
  return JSON.parse(data);
  } catch(error) {
    console.log(error);
  }
}
readData();

// update/write new data on json file 
const writeData = (data) => {
  try {
    fs.writeFileSync('../movies.json', JSON.stringify(data));
  } catch(error) {
    console.log(error);
  }
}

let movies = require('../movies.json');
 
router.use('/', (req, res, next) => {
  console.log('Router use for /movies');
  next();
 }
);
  

router.get('/', (req, res) => {
  res.json(movies);
})

router.get('/:id', (req, res) => {  
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.status(200).send(movie)
  } else {
    res.status(404).json({error: "The movie has not been found."})
  }
})

router.post('/', (req, res) => {
  const { title, director, year, rating } = req.body;

  if (title && director && year && rating) {

    //create an id for the new movie object
    const id = movies.length + 1; 
    
    //passing the values and the id created into a new object
    const newMovie = {id, ...req.body};
    movies.push(newMovie);
    res.status(201).json(movies);
    
  } else {
    res.status(400).json({error :'Wrong request.'})
  }  
}
)

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, rating } = req.body; 

  if (title && director && year && rating) {
    const updatedMovie = movies.find(movie => movie.id === id);
    if(updatedMovie) {
        updatedMovie.title = title;
        updatedMovie.director = director;
        updatedMovie.year = year;
        updatedMovie.rating = rating;
        res.json(movies);

    // if the movie does not exist, the app will create a new Movie object with the new data
    } else if(!updatedMovie){ 
      const id = movies.length + 1;
      const newMovie = {id, ...req.body};
      movies.push(newMovie);
      res.status(201).json(movies);
      console.log('The movie was not found, but was added as a new Movie object.');
    }
  } else {
    res.status(400).json({error :'Wrong request.'})
  } 
  }
);

router.delete('/:id', (req, res)=> {
  const id = parseInt(req.params.id);
  const selectedMovie = movies.find(movie => movie.id === id)
  if (selectedMovie) {
    movies = movies.filter((movie) => movie.id !== Number(id));
    res.status(200).send(movies)
  } else {
    res.status(404).send({message: `The movie with the ID ${id} has not been found.`})
  }
}
)

module.exports = router;
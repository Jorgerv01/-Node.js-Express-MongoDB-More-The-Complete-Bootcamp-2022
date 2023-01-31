const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

// standard
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Sacamos cada tour de nuestra base de datos ficticia
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// Creamos la funciones CRUD
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here...',
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// // Obtener todos los tours
// app.get('/api/v1/tours', getAllTours);
// // Obtener un tour en concreto
// app.get('/api/v1/tours/:id', getTour);
// // Modificar un tour con patch (modificar propiedades del objeto)
// app.patch('/api/v1/tours/:id', updateTour);
// // Eliminar un tour
// app.delete('/api/v1/tours/:id', deleteTour);
// // Crear un nuevo tour
// app.post('/api/v1/tours', createTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Iniciar servidor a traves de un determinado puerto
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

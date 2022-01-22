import express, { NextFunction, Response, Request } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();

interface Product {
  id: string;
  title: string;
  price: number; // "+" to convert string to number
}

const DUMMY_PRODUCTS: Product[] = []; // not a database, just some in-memory storage for now

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/products', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.post('/product', (req: Request, res: Response, next: NextFunction) => {
  const { title, price } = req.body;

  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid title and price.'
    });
  }

  const createdProduct: Product = {
    id: uuidv4( ),
    title,
    price
  };

  DUMMY_PRODUCTS.push(createdProduct);

  res
    .status(201)
    .json({ message: 'Created new product.', product: createdProduct });
});

app.listen(5000); // start Node + Express server on port 5000

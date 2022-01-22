"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now
app.use(body_parser_1.default.json());
// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});
app.get('/products', (req, res, next) => {
    res.status(200).json({ products: DUMMY_PRODUCTS });
});
app.post('/product', (req, res, next) => {
    const { title, price } = req.body;
    if (!title || title.trim().length === 0 || !price || price <= 0) {
        return res.status(422).json({
            message: 'Invalid input, please enter a valid title and price.'
        });
    }
    const createdProduct = {
        id: (0, uuid_1.v4)(),
        title,
        price
    };
    DUMMY_PRODUCTS.push(createdProduct);
    res
        .status(201)
        .json({ message: 'Created new product.', product: createdProduct });
});
app.listen(5000); // start Node + Express server on port 5000

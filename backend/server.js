import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;
const SERVER_IP_ADDRESS = process.env.SERVER_IP_ADDRESS;
app.listen(PORT, () => {
  console.log(`Server is running on port http://${SERVER_IP_ADDRESS}:${PORT}`);
});
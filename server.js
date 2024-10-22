const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/courses', require('./Routes/courseRoutes'));
app.use('/api/videos', require('./Routes/videoRoutes'));
app.use('/api/comments', require('./Routes/commentRoutes'));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

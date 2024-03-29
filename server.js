if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');
const directorRouter = require('./routes/directors');
const movieRouter = require('./routes/movies');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride('_method'));

// NOTE https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/', indexRouter);
app.use('/directors', directorRouter);
app.use('/movies', movieRouter);

app.listen(process.env.PORT || 3666, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});

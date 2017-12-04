var   express = require("express"),
      app = express();

var indexRoutes = require("./routes/index");
    
app.set('port', (process.env.PORT || 3000));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use('/',indexRoutes);

app.listen(app.get('port'),()=>{
    console.log('Working at', app.get('port'));
});
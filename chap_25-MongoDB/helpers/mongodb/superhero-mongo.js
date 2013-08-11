var SuperHero, hero, mongoose;
 
mongoose = require("mongoose");
 
//_ = require("underscore");
 
var MONGOHQ_URL = 'mongodb://<login>:<pwd>@mongohq.com:<port>/<database name>';
mongoose.connect(MONGOHQ_URL);

//mongoose.connect(process.env.MONGOHQ_URL);
 
var SuperHeroSchema = mongoose.Schema({
  name: "string"
});
 
SuperHero = mongoose.model('SuperHero', SuperHeroSchema);
 
hero = new SuperHero({
  name: "Superman"
});
 
hero.save(function(err) {
  if (err) {
    return console.log("kryptonite");
  } else {
    return console.log("Up, up, and away!");
  }
});
 
SuperHero.find({}, function(err, documents) {
  return console.log(documents[0]);
});

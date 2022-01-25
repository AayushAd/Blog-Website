const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const _ = require('lodash');
const ejs = require("ejs");


const homeStartingContent = "Are you someone who likes keeping a journal or diary? Do you find it rewarding to keep up with your daily activities or to make notes on your feelings or vacation times with family? If so, then you are at the right place. Start writing your journals now.";

const aboutContent = "This daily journal blog website was created using NodeJS and ExpressJS.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let posts = [];

app.get('/', (req, res) => {

  res.render('home', { homeStartingContent, posts })
})

app.get('/about', (req, res) => {
  res.render('about', { aboutContent })
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect('/');
})

app.get('/posts/:postName', (req, res) => {
  let { postName } = req.params
  for (const post of posts) {
    if (_.lowerCase(post.title) === _.lowerCase(postName)) {
      let title = post.title
      let content = post.content;
      res.render('post', { title, content })
    }
  }
})















app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

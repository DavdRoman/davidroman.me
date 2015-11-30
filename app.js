// Modules

var express = require('express')
var bodyParser = require('body-parser')
var stylus = require('stylus')
var nib = require('nib')
var fs = require('fs')
var githubRepos = require('github-repositories')

var app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: function(str, path) {
        return stylus(str).set('filename', path).use(nib())
    }
}))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Body

app.get('/', function(req, res) {
    res.redirect('/projects')
})

app.get('/projects', function(req, res) {
    var projects = JSON.parse(fs.readFileSync(__dirname + '/data/projects.json', 'utf8'))
    var oss = JSON.parse(fs.readFileSync(__dirname + '/data/oss.json', 'utf8'))

    githubRepos('DavdRoman', {token: process.env.GITHUB_ACCESS_TOKEN}, function (error, repos) {
        oss.forEach(function(p) {
            var i = oss.indexOf(p)
            if (!error && repos) {
                repos.forEach(function(repo) {
                    if (p.url === repo.html_url) {
                        oss[i].stars = repo.stargazers_count
                        oss[i].forks = repo.forks_count
                    }
                })
            }
        })

        res.render('projects', {oss: oss, projects: projects})
    })
})

app.get('/about', function(req, res) {
    res.render('about')
})

app.get('/hire', function(req, res) {
    res.render('hire')
})

app.listen(process.env.PORT || 8080)

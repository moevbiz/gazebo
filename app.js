const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000
const dir =  process.cwd(); // cwd

app.set('view engine', 'pug')

const content = path.join(__dirname, '/content')
const gazebos = []

fs.readdir(content, (err, files) => {
    if (err) throw err
    files.forEach(file => {
        try {
            gazebos.push(file)
        }
        catch(e) {
            console.log(e)
        }
    })
})

function render(thisGazebo, req, res) {
    let images = []
    let imgFolder = path.join(__dirname, 'content/', thisGazebo, '/images/')
    fs.readdir(imgFolder, (err, files) => {
        let images = []
        if (err) throw err
        files.forEach(file => {
            try {
                images.push({
                    'name': file,
                    'path': path.join('content/', thisGazebo, '/images', file),
                    'ext': path.extname(file),
                })
            }
            catch(e) {
                console.log(e)
            }
        })
        res.render('view', {
            title: thisGazebo,
            gazebos: gazebos,
            images: images
        })
    })
}

//homepage
app.get('/', (req, res) => {
    let gzb = gazebos[gazebos.length -1]
    render(gzb, req, res)
})

//slug
app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    if (gazebos.includes(slug)) {
        render (slug, req, res)
    }
    else {
        res.render('error');
    }
})

//serve images
app.get('/content/:slug/images/:img', function (req, res) {
    let filepath = path.join(__dirname, '/content/', req.params.slug, '/images/', req.params.img)
    res.sendFile(filepath);
});

// static folder
app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})
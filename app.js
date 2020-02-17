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

//browse directory and subdirectories
function browse(currentPath) {
    let files = fs.readdirSync(currentPath)
    files.forEach(file => {
        try {
            var stats = fs.statSync(path.join(currentPath, file))
            if (stats.isFile()) {
                console.log(file)
            }
            else if (stats.isDirectory()) {
                newPath = path.join(currentPath, file)
                browse(newPath);
            }
        }
        catch(e) {
            console.log(e)
        }
    })
}

// render page
function render(thisGazebo, req, res) {
    let imageFolder = path.join(__dirname, 'content/', thisGazebo, '/images/')
    let dir = path.join(__dirname, 'content/', thisGazebo)
    fs.readdir(imageFolder, (err, files) => {
        if (err) throw err
        let images = []
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

// render page
function render2(thisGazebo, req, res) {
    let imageFolder = path.join(__dirname, 'content/', thisGazebo, '/images/')
    let dir = path.join(__dirname, 'content/', thisGazebo)
    let files = fs.readdirSync(dir)
    files.forEach(file => {

    })
    fs.readdir(dir, (err, files) => {
        if (err) throw err
        let images = []
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
    // let dir = path.join(__dirname, 'content/', gzb)
    render(gzb, req, res)
    // browse(dir)
})

//slug
app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    if (gazebos.includes(slug)) {
        render (slug, req, res)
    }
    else {
        res.redirect('/');
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
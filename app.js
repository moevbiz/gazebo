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
        let data = []
        if (err) throw err
        files.forEach(file => {
            try {
                data.push({
                    'name': file,
                    'path': path.join(imgFolder, file),
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
            images: data
        })
    })
}

//homepage
app.get('/', (req, res) => {
    let gzb = gazebos[gazebos.length -1]
    render(gzb, req, res)
})

app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    if (gazebos.includes(slug)) {
        render (slug, req, res)
    }
    else {
        res.render('error');
    }
})

//slug
// app.get ('/:slug', (req, res) => {
//     let slug = req.params.slug || '';

//     if (slug && gazebos.includes(slug)) {
//         let imgFolder = path.join(__dirname, 'content/', req.originalUrl, '/images/')
//         let data = [];
//         browse(imgFolder, 'images', data)
//     } else {
//         res.send('nope')
//     };

//     function browse(url, arrayName, data) {
//         let thisData = [];
//         fs.readdir(url, (err, files) => {
//             if (err) throw err
//             files.forEach(file => {
//                 try {
//                     thisData.push({
//                         'name': file,
//                         'path': path.join(url, file),
//                         'ext': path.extname(file),
//                     })
//                 }
//                 catch(e) {
//                     console.log(e)
//                 }
//             })
//             data.push({[arrayName]: thisData})
//             res.send(data);
//         })
//     }

// })

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})
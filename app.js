const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000
const dir =  process.cwd(); // cwd

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

//slug
app.get ('/content/:slug', (req, res) => {
    let slug = req.params.slug || '';
    let data = [];

    if (slug && gazebos.includes(slug)) {
        let imgFolder = path.join(__dirname, req.originalUrl, '/images/')
        browse(imgFolder, 'images');
    } else {
        res.send('nothing here')
    };

    function browse(url, arrayName) {
        fs.readdir(url, (err, files) => {
            console.log("browsing", url);
            if (err) throw err
            files.forEach(file => {
                try {
                    data.push({
                        'name': file,
                        'path': path.join(url, file)
                    })
                }
                catch(e) {
                    console.log(e)
                }
            })
            res.send(data)
        })
    }

})

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})
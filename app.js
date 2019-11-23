const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000
const dir =  process.cwd(); // cwd

//slug
app.get ('/content/:slug', (req, res) => {
    let slug = req.params.slug || '';
    let imgFolder;

    if (slug) {
        imgFolder = path.join(__dirname, req.originalUrl, '/images/')
    };

    var data = [];

    browse(imgFolder, 'images');

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
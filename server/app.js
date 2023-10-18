const express = require('express')
const multer = require('multer')
const fs = require('fs')

const app = express()
const port = 3000

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage })

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
	next();
});

app.get('/', (req, res) => {
	res.sendFile('/client/index.html');
});

app.post('/', upload.single('upload'), (req, res) => {
	const file = req.file
	if (!file) {
		res.status(400).send('Ошибка при загрузке файла')
		return
	}

	const formData = req.body;
	const data = JSON.stringify(formData)
	console.log(formData);

	fs.appendFile('./test.txt', data, (err) => {
		if (err) {
			console.error(err)
			res.send('Ошибка при сохранении данных в файл')
			return
		}
		res.send('Данные успешно сохранены в файл')
	})
});

app.listen(port, () => {
	console.log('сервер запущен...')
})
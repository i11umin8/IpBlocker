import * as config from 'config'
import app from './App';

const port = config.get('port');
app.listen(port, (err) => {
	if(err) {
		return console.log(err)
	}
	return console.log(`server is listening on ${port}`)
})

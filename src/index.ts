import http from 'http';
import { config } from 'dotenv';

import runSchedule from './schedule';

require('@babel/register')({ extensions: ['.js', '.ts'] });

config();

http
	.createServer(() => {
	})
	.listen(process.env.PORT, () => {
		console.log(`Server has started at port ${process.env.PORT}`);
		runSchedule();
	})
	.on('error', (err) => console.error(err));

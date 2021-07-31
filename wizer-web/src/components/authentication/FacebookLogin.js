
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const fbLogin = (accesstoken) => {
	console.log(accesstoken);
	axios
		.post('http://127.0.0.1:8000/auth/convert-token', {
			token: accesstoken,
			backend: 'facebook',
			grant_type: 'convert_token',
			client_id: 'v64mPi1R9ofTJqsuzyjOtZJe6O0zTM6VmGDVgYOG',
			client_secret:
				'Ylf6nay64p5GCYrenSLpsJofAj8F2QC0sfbykc58ocYctkyQ51bheTAwzY7JBqMQqDreqwm4UNccTK1utfhhElTTuwSd9mDZ9UXLUPIFzpGWrcWMT4j1gz5R7WznO5II',
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
		});
};

export default fbLogin;
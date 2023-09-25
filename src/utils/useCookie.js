import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, options=null) => {
  /*Example setCookie('refreshToken', refreshToken, {
      	path: '/',
      	secure: '/',
      	expires: new Data().getMinutes() + 1;
  });*/
 	return cookies.set(name, value, {...options});
}

export const getCookie = (name) => {
 return cookies.get(name);
}
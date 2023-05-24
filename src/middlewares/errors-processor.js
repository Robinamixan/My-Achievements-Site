import { env } from 'node:process';

export default function(error, request, response, next) {
  if (!error) {
    next();
  }

  const statusCode = error.statusCode || 500;
  const responseData = {message: error.message};

  if (error.relatedErrors) {
    responseData.errors = error.relatedErrors;
  }

  if (env.APP_ENV !== 'dev' && statusCode === 500) {
    responseData.message = 'Server error!';
    responseData.errors = null;
  }

  if (statusCode === 500) {
    console.log('Debug [' + new Date().toISOString() + ']: Request url: ' + request.originalUrl );
    console.log('Debug [' + new Date().toISOString() + ']: ' + error.message + ' [Status code: ' + statusCode + ']');
  }

  return response.status(statusCode).json(responseData);
}
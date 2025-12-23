//Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6. It can be used intercept HTTP requests and responses and enables client-side protection against XSRF. It also has the ability to cancel requests.
//Axios has built-in XSRF(Cross-Site Request Forgery) protection, while Fetch does not. Axios has the ability to intercept HTTP requests but Fetch, by default, does not. Axios allows canceling requests and request timeout but fetch does not.

// Axios is a promise-based HTTP Client for node.js and the browser.
// Make XMLHttpRequest from the browser, Make http requests from node.js, Cancel Request
// Supports the Promise API, Intercept request and response
// Transform request and response data
// Timeouts, Query parameters serialization with support for nested entries
// Automatic request body serialization to: Json, Multipart, FormData, URL encoded form.
// Posting HTML forms as JSON
// Setting bandwidth limits for node.js

// Install using npm: npm install axios
// Can use CDN to link the axios for JS.
// axios.get('url?query=1').then(function (response){}).catch(function (error){}).finally(function(){})
// If post request can send parameter: axios.post('/user', {  firstName: 'Fred',...
// Performing Multiple Concurrent Request: Promise.all([axiosOne(), axiosTwo(), ...]).then(function ([one, two]){}) or, const [one, two] = await Promise.all()
// A concurrent request means multiple tasks or operations are processed at the same time, rather than one after another, to improve efficiency and speed.
// HTML Form as JSON: await axios.post('/user', document.querySelector('#my-form'), {headers: {'Content-Type': 'application/json'}}
// For Multipart header will be multipart/form-data
// 'Content-Type': 'application/x-www-form-urlencoded'

// API:
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Abdul',
    }
});
// For get we can pass responseType
// Got Data in: response.data
// Request Method Aliases: axios.request(config), axios.get(url[, config]), delete, head, options, post(url[, data[, config]]), put, patch, postForm, putForm, patchForm.

// Instance: An Axios instance is a pre-configured Axios client. Mainly use for reusable purpose, create a common initialization then use it everywhere.
// const api = axios.create({ ... }), api.get('/users')
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // e.g. https://api.mycrm.com/api
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})
api({
    //..Can define Objects
}) // Also can define request and response interceptors
api.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status === 401) {
        await refreshToken();
        return instance(error.config); // Retry original request
    }

    throw error;
});

// Finally, use it anywhere. api.get()..

// Request Configuration:
// url: '/user', method: 'get'
// baseUrl: '': baseURL` will be prepended to `url` unless `url` is absolute.
// allowAbsoluteUrls: determines whether or not absolute URLs will override a configured `baseUrl`.
// transformRequest: [function (data, headers) {.. : allows changes to the request data before it is sent to the server
// transformResponse: [function (data) { ...
// headers: {'X-Requested-With': 'XMLHttpRequest'}: Custom Headers to be Sent
// params: {... : URL parameters to be sent with the request
// paramsSerializer: ptional config in charge of serializing `params`
// data: {... : data to be sent as the request body
// Alternative Syntax: data: 'Country=Brasil&City=Belo Horizonte'
// timeout: 1000- specifies the number of milliseconds before the request times out.
// withCredentials: false- indicates whether or not cross-site Access-Control requests
// adapter: function (config) {.. :  allows custom handling of requests which makes testing easier.
// auth: {.. : indicates that HTTP Basic auth should be used, set an `Authorization` header, overwriting any existing
// auth only for http, For Bearer tokens and such, use `Authorization` custom headers instead.
//  responseType: 'json'- the type of data that the server will respond with. Options: 'arraybuffer', 'document', 'json', 'text', 'stream'
// responseEncoding: 'utf8', // default
// xsrfCookieName: 'XSRF-TOKEN',- default. name of the cookie to use as a value for xsrf token.
// xsrfHeaderName
// onUploadProgress: function (progressEvent) {.. :  allows handling of progress events for uploads
// onDownloadProgress: function (progressEvent) {\
// maxContentLength: 2000-  max size of the http response content in bytes allowed in node.js
// maxBodyLength
// validateStatus: hether to resolve or reject the promise for a given http status code.
// maxRedirects
// beforeRedirect: (options, { headers }) => {
// socketPath: null- defines a UNIX Socket to be used in node.js
// transport: undefined- transport method that will be used to make the request
// httpAgent: new http.Agent({ keepAlive: true }),
// httpsAgent
// proxy: {- defines the hostname, port, and protocol of the proxy server.
// signal: new AbortController().signal- to cancel the request
// cancelToken: new CancelToken(function (cancel) {
// decompress: true-  whether or not the response body should be decompressed
// insecureHTTPParser: undefined
// transitional: {
// env: {}- automatically serialize the payload into a FormData object
// formSerializer
// maxRate - for http header only

// Response Schema:
// data: {}-  response that was provided by the server
// status: 200 - HTTP status code from the server response
// statusText: 'OK'
// headers: {}-  HTTP headers that the server responded with
// config: {}- e config that was provided to `axios` for the request
// request: {}-  request that generated this response
axios.get('/user/12345')
    .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    });
// If we use catch, then response will be available through the error object.

// Specify config defaults that will be applied to every request:
// axios.defaults.baseURL = 'https://api.example.com';

// Interceptors:
// can intercept requests or responses before they are handled by then or catch.
// use function adds a handler to the list of handlers to be run when the Promise is fulfilled or rejected.
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},
    // { synchronous: true, runWhen: () => /* This function returns true */ }
);

axios.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// Remove an interceptor Layer:
// axios.interceptors.request.eject(myInterceptor);

// Handling Errors:
// Structure: message(quick summary of error message), name(Where the error originated from like AxiosError), stack (stack trace of the error), config, code, status
axios.get('/user/12345', {
    validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
    }
})
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.toJSON()); //  an object with more information about the HTTP error.
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });


// Vform:
// Tiny library for Vue 2/3 to help with forms and validation when using Laravel as a back-end.
// npm install axios vform
// <input v-model="form.username" type="text" name="username" placeholder="Username">
// <div v-if="form.errors.has('username')" v-html="form.errors.get('username')" />
import Form from 'vform'
form: new Form({
    username: '',
    password: ''
})
// const response = await this.form.post('/api/login')

// Instance Properties:
// form.busy: Indicates if the form is sent to the server.
// form.successful: Indicates if the response form the server was successful.
// form.recentlySuccessful: Indicates if the response form the server was successful for two seconds.
// form.errors: validation errors from the server
// form.progress: { total: number, loaded: number, percentage: number } | undefined

// Instance Methods:
// form.submit, form.post|patch|put|delete|get
// form.clear(), form.reset(), form.update({}), form.fill({}), form.onKeydown(event: KeyboardEvent): Clear errors on keydown.
// We can set a custom axios instance the use it:
const instance = axios.create({
    baseURL: 'https://some-domain.com/api/'
})

Form.axios = instance

// Errors:
// errors.all(), errors.has(field: string): boolean, errors.hasAny(...fields: string[]): boolean, errors.any(): boolean
// Get the first error message for the given field: errors.get(field: string): string|undefined
// Get all the error messages: errors.getAll(field: string): string[]
// errors.only(...fields: string[]): string[]
// Get all the errors in a flat array: errors.flatten(): string[]
// errors.clear(field: string|undefined)
// errors.set(errors = {}): Set the error object.
// errors.set(field: string, message: string)

// Vform provides some component for bootsrap and tailwind
// import { Button, HasError,  AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'
// Vue.component(AlertSuccess.name, AlertSuccess)
// <HasError :form="form" field="username" />
// <AlertError :form="form" message="There were some problems with your input." />

// File Upload:
// const file = event.target.files[0]
// this.form.file = file
/**
 * Splynx Node.js API v. 1.0.4
 * Author: Ruslan Malymon (Splynx s.r.o.), Tsumanchuk Volodymyr
 * http://docs.splynx.apiary.io/ - documentation
 */

const express = require('express')
const app = express()
const  cors = require('cors')

app.use(cors())
// Include splynx-nodejs-api library
const SplynxApi = require('splynx-nodejs-api');

let customers = []

// With protocol and port if needed
const SPLYNX_HOST = 'http://billing.touchitnetworks.com';

// Need get api key info from this page: https://SPLYNX_HOST/admin/administration/api-keys
const API_KEY = '8f233267b64f1132f44851a13ff6c5ca';
const API_SECRET = '67567244275200d8c600e08004724f57';

// Create new api object
const api = new SplynxApi(SPLYNX_HOST, API_KEY, API_SECRET);

// If need see more info
// api.debug = true;

// Get list of all customers
api.get('admin/customers/customer')
    .then(res => {
       customers=res.response;
       // console.log('kiss',res.response.map(c => c.phone).filter(n => n.startsWith('7')));
    }).catch(err => {
    console.log('Errors with status ' ,err);
});

app.get('/customers',(req,res)=>{
    res.send(customers.map(c =>{
        return {name:c.name,id:c.id,phone:c.phone}
    }))
})


app.listen(3000,()=>console.log('Listening'))

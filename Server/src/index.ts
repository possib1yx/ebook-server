import express from 'express'
import { clearScreenDown } from 'readline';

const app = express ();

const port = process.env.PORT || 8989

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen(port , ()=>{
    console.log(`The apps is runind on ${port}`)
})
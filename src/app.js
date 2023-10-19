
const OpenAI=require('openai');
// const ejs=require('ejs')
require('dotenv').config()
const express=require('express')
const app = express();
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set('view engine','ejs')
app.set('views','views')
const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});
app.get('/',async(req,res)=>{
    try{

      res.render('home',{response:''})
 

    }catch(error){
      console.log("Error", error)
    }
  })
  app.post('/',async(req,res)=>{
    try {
      
  const content=req.body.content
  console.log('data:',content)
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `${content}` }],
      model: 'gpt-3.5-turbo',
      // prompt:'text',
      max_tokens:3000
    });
    // console.log(chatCompletion.choices[0].message.content);
    var response=chatCompletion.choices[0].message.content
    res.render('home',{response})
  } catch (error) {
      console.log('error in chat:',error)
  }
})
app.listen(3000,()=>{
  console.log(`server running on https//:127.0.0.1:${3000}`)
})

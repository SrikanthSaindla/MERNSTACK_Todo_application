const express =require("express")
const mongoose=require("mongoose")
const TaskSchema=require('./model')
const cors=require("cors")

 

mongoose.connect("mongodb+srv://srikanthsaindla:srikanthsaindla@cluster0.wcaywtl.mongodb.net/?retryWrites=true&w=majority").then(
()=>console.log("DB connected..") 
)
const app=express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.post('/addtask',async(req,res)=>{
   const {todo}=req.body;
   try{
  const NewData=new TaskSchema({
    todo:todo
  });
  await NewData.save()
  return res.json(await TaskSchema.find())

   }catch(err){
    console.log(err)
   }
})

app.get("/gettask",async(req,res)=>{
     try{
         
        return res.json( await TaskSchema.find())
     }
     catch(err){
        console.log(err)
     }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
await TaskSchema.findByIdAndDelete(req.params.id)
  return res.json(await TaskSchema.find())

    }catch(err){
           console.log(err)
    }
})


app.listen(5000,()=>console.log("sever is running.."))

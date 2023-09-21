const express=require("express")
const fileUpload=require("express-fileupload")
const cors =require("cors")
const fs=require("fs")
const path=require("path")
// create app
const app=express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(fileUpload())
// make static files available 
app.use("/images",express.static(path.join(__dirname,"public/images")))

// Upload file and store in uploads folder
app.post("/",(req,res)=>{
    try {
        const filename=req.files.myFile.name
        // console.log(req.files)
        const file=req.files.myFile
        let path=__dirname+"/uploads/"+filename
        file.mv(path)
        res.status(200).json({success:"File uploaded"})  
    } catch (error) {

    }
})

// Stroring image file  in images variable
const images=[]
 files=fs.readdirSync(__dirname+"/public/images/",(error,file)=>{
    if(error){
        console.log(error)
    }
// console.log(file)
    const imageFiles=file.filter(file=>{
        const extension=path.extname(file).toLowerCase()
        return [".jpg",".jpeg",".png"].includes(extension) })
       imageFiles.forEach(files => {
      console.log(files)
    });
})

files.forEach(file=>{
  images.push(file)
})


// returning images for use over internet

app.get("/downloads",(req,res)=>{
const imageUrl= []
images.forEach(image=>{
imageUrl.push("http://ip:port/images/"+image)
})

return res.status(200).json({imageUrl})
})

// Product json file for api use
const product=[
    {
      "name":"Coca-cola",
      "price":35,
      "category":"soft",
      "image":"coca.jpeg"
    },
    {
      "name":"Sprit",
      "price":40,
      "category":"soft",
      "image":"sprite.jpg"
    },
    {
      "name":"7Up",
      "price":25,
      "category":"soft",
      "image":"7up.png"
    },
    {
      "name":"Fanta",
      "price":35,
      "category":"soft",
      "image":"fanta.png"
    },
    {
      "name":"Pepsi",
      "price":35,
      "category":"soft",
      "image":"pepsi.png"
    }
  ]


app.get("/products",(req,res)=>{
    console.log(req.body)
    return res.status(200).json(product)
})

// Get parameter to update it from apri request
app.put("/update/:id",(req,res)=>{
    const incom_item_id=req.params.id
    // Update process
     
    return res.status(200).json({success:incom_item_id})
})

// app.post("/data",(req,res)=>{
//     console.log(req.body)
//     res.status(200).json(req.body)
// }
// )

app.listen(4000,()=>{
    console.log("app run on port 4000 server")
})
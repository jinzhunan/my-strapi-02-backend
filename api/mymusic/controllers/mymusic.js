'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const cloudinary = require('cloudinary').v2
const axios = require('axios')
const NodeID3 = require('node-id3')
let streamifier = require('streamifier');
var fs = require('fs');



module.exports = {

    

    async findOne(ctx){
        const { id } = ctx.params;
       
        cloudinary.config({
                cloud_name: "dadofeceb",
                api_key: "678159935934783",
                api_secret: "h_P8QG-v0QXbAqakKu43VBHddB4"
        })
       



        // console.log(`${__dirname}/001.png`)
        const musics = await strapi.services.mymusic.findOne({ id })
        // console.log(musics)

        if(musics.eachsong === null){

        var eachsong =[]

        for (let i = 0 ; i < musics.songs.length ;i++){

            let url = musics.songs[i].url
            let name = musics.songs[i].name

            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                  folder: "foo"
                },
                async function(error, result) {
                    if (error) throw error
                    console.log({
                        name:name,
                        url: result.url,
                        title: result1.title,
                        album: result1.album,
                        artist: result1.artist
                    })
                    eachsong.push({
                        name:name,
                        url: result.url,
                        title: result1.title,
                        album: result1.album,
                        artist: result1.artist
                    })   
                    if(eachsong.length ===  musics.songs.length){
                        eachsong = JSON.stringify(eachsong);

                        console.log(id)
                        await axios.put(`https://stark-harbor-44453.herokuapp.com/mymusics/${id}`,{eachsong}).then(
                            function(response){
                                console.log(response.data.eachsong)
                         
                            }
                        )
                        
                    }

                    
                }
            );

            
                let result =  await axios.get(url,{
                    responseType: 'arraybuffer'
                }).then(response =>  new Buffer.from(response.data, 'binary'))
                let result1 =  NodeID3.read(result)
                let imgURL = ''
                // console.log(result1)

      
                if(result1.image !== undefined){
                    console.log('1')

                    //   AWS SEARCH AND UPLOAD
                    // cloudinary.uploader.upload(result1.image.imageBuffer),result=>{
                    //     console.log(result)
                    // }

                    const haha = streamifier.createReadStream(result1.image.imageBuffer).pipe(cld_upload_stream);

                    console.log(haha.url)

                }else{
                    eachsong.push({
                        name:name,
                        url: '',
                        title: result1.title,
                        album: result1.album,
                        artist: result1.artist
                    })                     
                }

        }
    }
        // console.log(eachsong)

        return musics
    }
};


// (err, data) => {
//     if (err) throw err
//     // set the bucket file url
//         imgURL = data.Location
//         // console.log(`File uploaded successfully. ${data.Location}`);
//         // new musicImg
        
//          eachsong.push({
//             name:name,
//             url: imgURL,
//             title: result1.title,
//             album: result1.album,
//             artist: result1.artist
//         })                                        
    
//     if(eachsong.length ===  musics.songs.length){
//         eachsong = JSON.stringify(eachsong);

//         console.log(id)
//         await axios.put(`https://stark-harbor-44453.herokuapp.com/collection-musics/${id}`,{eachsong}).then(
//             function(response){
//                 // var obj = JSON.parse(response.data.eachsong)
//                 // console.log(obj)
         
//             }
//         )
        
//     }


// }
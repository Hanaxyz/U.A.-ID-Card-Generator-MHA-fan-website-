
const photo=document.querySelector(".photo");
const studentPhoto = document.querySelector(".student-photo");
const label = document.querySelector(".upload-label");
const card = document.querySelector(".card");
const downloadButton = document.querySelector(".download-button");
const aboutButton = document.querySelector(".about");
const aboutBox = document.querySelector(".about-box");
const closeButton = document.querySelector(".close");

photo.addEventListener('change',()=>{
     const file=photo.files[0];
      const Imgurl=URL.createObjectURL(file);

      const image=new Image();
      image.src=Imgurl;
      studentPhoto.src=Imgurl;

    label.style.display="none";

    image.onload=()=>{

    const canvas=document.createElement("canvas");
    const draw=canvas.getContext("2d");


    // original image & canvas width and height :

    const StudentPhotoHeight=studentPhoto.offsetHeight;
    const StudentPhotoWidth=studentPhoto.offsetWidth;

    canvas.height=StudentPhotoHeight;
    canvas.width=StudentPhotoWidth;


      // determine the image aspect:

      const imageAspect=image.width/image.height;

      //determine the canvas aspect 
      const canvasAspect=StudentPhotoWidth/StudentPhotoHeight;

       let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

       if(imageAspect > canvasAspect){

        drawHeight=StudentPhotoHeight;// the uploaded image is wider than the canvas (student pic area):
       drawWidth=StudentPhotoHeight*imageAspect;
       offsetX = (canvas.width - drawWidth) / 2; // or we can use StudentPhotoWidth

   

       }

       else {

        //the uploaded img is taller than the area :

        drawWidth=StudentPhotoWidth;
        drawHeight=StudentPhotoWidth/imageAspect;
        offsetY = (canvas.height - drawHeight) / 2;// also we can use StudentPhotoHeight




       }


       draw.drawImage(
        image,
        0,0, image.naturalWidth , image.naturalHeight,
        offsetX,offsetY,drawWidth,drawHeight,




        
       );
     









    

     
    




  


studentPhoto.src = canvas.toDataURL('image/png', 0.9);
       

    };



})
downloadButton.addEventListener("click", () => {

    html2canvas(card).then(canvas => {

        canvas.toBlob(blob => {

            const url = URL.createObjectURL(blob);

            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isMobile) {

                const newWindow = window.open();

                if (newWindow) {
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>UA ID Card</title>
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                            </head>
                            <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                                <img src="${url}" style="max-width:100%; height:auto;">
                            </body>
                        </html>
                    `);

                    newWindow.document.close();
                }

            } else {

                const link = document.createElement("a");

                link.href = url;
                link.download = "UA-ID-Card.png";

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            }

        }, "image/png");

    }).catch(error => {

        console.log("HTML2CANVAS ERROR:", error);
        alert("Download failed");

    });

});
aboutButton.addEventListener("click", () => {

    aboutBox.style.display = "flex";

});


closeButton.addEventListener("click", () => {

    aboutBox.style.display = "none";

});





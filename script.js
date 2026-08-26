
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
const StudentPhotoHeight = studentPhoto.offsetHeight;
const StudentPhotoWidth = studentPhoto.offsetWidth;

const dpr = window.devicePixelRatio || 1;

canvas.width = StudentPhotoWidth * dpr;
canvas.height = StudentPhotoHeight * dpr;

canvas.style.width = StudentPhotoWidth + "px";
canvas.style.height = StudentPhotoHeight + "px";

draw.scale(dpr, dpr);


      // determine the image aspect:

      const imageAspect=image.width/image.height;

      //determine the canvas aspect 
      const canvasAspect=StudentPhotoWidth/StudentPhotoHeight;

       let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

       if(imageAspect > canvasAspect){

        drawHeight=StudentPhotoHeight;// the uploaded image is wider than the canvas (student pic area):
       drawWidth=StudentPhotoHeight*imageAspect;
       offsetX = (StudentPhotoWidth - drawWidth) / 2; 

   

       }

       else {

        //the uploaded img is taller than the area :

        drawWidth=StudentPhotoWidth;
        drawHeight=StudentPhotoWidth/imageAspect;
        offsetY = (StudentPhotoHeight - drawHeight) / 2;




       }


       draw.drawImage(
        image,
        0,0, image.naturalWidth , image.naturalHeight,
        offsetX,offsetY,drawWidth,drawHeight,




        
       );
     









    

     
    




  


studentPhoto.src = canvas.toDataURL('image/png');

    };



})



aboutButton.addEventListener('click',()=>{

    aboutBox.style.display = "flex";



});

closeButton.addEventListener("click", () => {
     aboutBox.style.display = "none";

});

downloadButton.addEventListener("click", () => {

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    html2canvas(card, {
        scale: isMobile ? 2 : 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
    }).then(canvas => {

        const image = canvas.toDataURL("image/png");
        
        if (isMobile) {
            const link = document.createElement("a");
            link.href = image;
            link.download = "UA-ID-Card.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const link = document.createElement("a");
            link.href = image;
            link.download = "UA-ID-Card.png";
            link.click();
        }

    }).catch(error => {
        console.error(error);
        alert("Download failed, please try again.");
    });

});

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];
//unsplash API
const count=30;
const _0x47ad18=_0x5b0a;function _0x5b0a(_0x15a7cf,_0x3ad20f){const _0x4e6aa6=_0x4e6a();return _0x5b0a=function(_0x5b0aa,_0xd5b1f){_0x5b0aa=_0x5b0aa-0x143;let _0x54e15b=_0x4e6aa6[_0x5b0aa];return _0x54e15b;},_0x5b0a(_0x15a7cf,_0x3ad20f);}(function(_0x3521ce,_0x253441){const _0x2afe01=_0x5b0a,_0x3794c6=_0x3521ce();while(!![]){try{const _0x190dc6=-parseInt(_0x2afe01(0x14d))/0x1+-parseInt(_0x2afe01(0x147))/0x2+parseInt(_0x2afe01(0x14a))/0x3*(parseInt(_0x2afe01(0x146))/0x4)+-parseInt(_0x2afe01(0x14c))/0x5*(-parseInt(_0x2afe01(0x149))/0x6)+parseInt(_0x2afe01(0x145))/0x7+parseInt(_0x2afe01(0x14b))/0x8*(parseInt(_0x2afe01(0x148))/0x9)+-parseInt(_0x2afe01(0x144))/0xa;if(_0x190dc6===_0x253441)break;else _0x3794c6['push'](_0x3794c6['shift']());}catch(_0x21cb47){_0x3794c6['push'](_0x3794c6['shift']());}}}(_0x4e6a,0x928bd));function _0x4e6a(){const _0x1cdb4d=['2220568cazTYm','4ijnZaK','126210RrQaxR','16839DSBweU','36504CumiXG','1322694IYmSvz','1184XaIXdv','920jdGMuI','748541xyxErK','P6VxJNvKEV4Oggv6NKODaV0_1vU2ZB-j1YPJ4j0B-2M','7425870yNEYSA'];_0x4e6a=function(){return _0x1cdb4d;};return _0x4e6a();}const apiKey=_0x47ad18(0x143);


//const apiKey= 'P6VxJNvKEV4Oggv6NKODaV0_1vU2ZB-j1YPJ4j0B-2M'
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready=true;
        console.log('ready =',ready);
        imagesLoaded=0; 
        loader.hidden=true;
    }
}

//Helper Function to set attributes on DOM elements
function setAttributes(element, attributes){
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

//Create Elements For Links& photos, add to DOM
function displayPhotos(){
    totalImages= photosArray.length;
    //console.log('total images', totalImages);
    //run function for each object in photosArray
    // console.log("yo")
    // console.log(photosArray.length);
    photosArray.forEach(photo =>{
        //Create <a> to link to Unsplash
        // console.log("hey");
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target:'_blank'
        })
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');
        //create <img> for photo
        const img=document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load',imageLoaded);
        // img.setAttribute('src',photo.urls.regular);
        // // console.log(photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        // Put <img> inside <a>, then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}

//get photos from unsplash API
async function getphotos(){
    try{
        const response= await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
       // console.log(photosArray);
        // console.log(data);
    } catch (error) {
        //catching errors here 

    }

}

// check to see if scrolling near bottom of the page, load more photos
window.addEventListener('scroll',()=>{
    // console.log('scrolled');
    if(window.innerHeight + window.scrollY>= document.body.offsetHeight-1000 && ready){
        ready=false;
        getphotos();
    }
})

//onload
getphotos();



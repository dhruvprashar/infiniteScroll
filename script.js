const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];
//unsplash API
const count=30;
const apiKey= 'P6VxJNvKEV4Oggv6NKODaV0_1vU2ZB-j1YPJ4j0B-2M'
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



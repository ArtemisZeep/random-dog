import React, { useEffect } from "react";
import iconLeft from "../images/icons/Icon_arrow_left.svg";
import iconRight from "../images/icons/icon_arrow_right.svg";
import testImage from "../images/main-page/alvan-nee-T-0EW-SEbsE-unsplash.jpg";
import Dog from "../utils/Dog";
import Wiki from "../utils/Wiki";
import Photo from "../utils/Photo";
import StartPage from "./Start";

const dog = new Dog({
  url: "https://dog-breeds2.p.rapidapi.com/dog_breeds",
  headers: {
    "X-RapidAPI-Key": "cc73f521e3mshadb9f2bb1a859adp11457ajsnff4a64747cb1",
    "X-RapidAPI-Host": "dog-breeds2.p.rapidapi.com",
  },
});




function MainPage() {
  const [dogs, getDogs] = React.useState({});
  const [info, getInfo] = React.useState("");
  const [name, setName] = React.useState("");
  const [photos, getPhotos] = React.useState([]);
  const [photo, getPhoto] = React.useState({});
  const [origin, setOrigin] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [wiki, setWiki] = React.useState("");
  const [text, getText] = React.useState("");
  const [photoIndex, getPhotoIndex] = React.useState();
  const [startImage, setStartImage] = React.useState();
  const [previousImageIndex, setPreviousImageIndex] = React.useState();
  const [length, getLength] = React.useState();




  function getNewDesc(number) {
    const newTitle = dogs[number].url;
    const title = newTitle.replace("https://en.wikipedia.org/wiki/", "");

    const wiki = new Wiki({
      url: "https://en.wikipedia.org/w/api.php",
      data: title,
    });

    Promise.all([wiki.getInfo()])
      .then(([info]) => {
        getInfo(info);
        const text = info.replace(/<[^>]+>/g, "");
        getText(text);
        return info;
      })
      .catch((err) => {
        console.log(`Возникла глобальная ошибка, ${err}`);
      });
  }

  const getNewPhotoArray = (number) => {
    const newTitle = dogs[number].breed;
    const title = newTitle.replace(" ", "%20");

    const photo = new Photo({
      url: `https://bing-image-search1.p.rapidapi.com/images/search?q=${title}%20dog`,
      headers: {
        "X-RapidAPI-Key": "fa25da3ffamsh9bc1f269e92e98dp1387f7jsnbdf6b9d4bc82",
        "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
      },
    });

    Promise.all([photo.getAllPhotos()])
      .then(([photos]) => {
        getPhotos(photos);
        setStartImage(photos.value[0].contentUrl);
        getLength(photos.value.length);
        return photos;
      })
      .catch((err) => {
        console.log(`Возникла глобальная ошибка, ${err}`);
      });

    return photos;
  };

  const moveNext = () => {
    if (photoIndex < photos.value.length - 1) {
      const newIndex = photoIndex + 1;
      setPreviousImageIndex(photoIndex);
      setStartImage(photos.value[newIndex].contentUrl);
      getPhotoIndex(newIndex);
    }
    if (photoIndex === photos.value.length - 1) {
      const newIndex = 0;
      setPreviousImageIndex(photoIndex);
      getPhotoIndex(newIndex);
      setStartImage(photos.value[newIndex].contentUrl);
    } else {
      console.log("e");
    }
  };

  const movePrevious = () => {
    if (photoIndex > 0) {
      const newIndex = photoIndex - 1;
      setPreviousImageIndex(photoIndex);
      setStartImage(photos.value[newIndex].contentUrl);
      getPhotoIndex(newIndex);
    }
    if (photoIndex === 0) {
      const newIndex = photos.value.length - 1;
      setPreviousImageIndex(photoIndex);
      getPhotoIndex(newIndex);
      setStartImage(photos.value[newIndex].contentUrl);
    } else {
      console.log("e");
    }
  };

  function getRandomNumber() {
    return Math.round(Math.random() * dogs.length);
  }

  function setNewName(number) {
    const name = dogs[number].breed;
    setName(name);
  }

  function setNewOrigin(number) {
    const origin = dogs[number].origin;
    setOrigin(origin);
  }

  function setNewHeight(number) {
    const objectHeight = dogs[number].meta.height;

    if (typeof objectHeight === "object") {
      const dogs = "Dogs: " + objectHeight.dogs;
      const bitches = "Bitches: " + objectHeight.bitches;
      const height = dogs + "; " + bitches;
      setHeight(height);
    } else {
      const height = objectHeight;
      setHeight(height);
    }
  }

  function setNewWeight(number) {
    const objectWeight = dogs[number].meta.weight;

    if (typeof objectWeight === "object") {
      const dogs = "Dogs: " + objectWeight.dogs;
      const bitches = "Bitches: " + objectWeight.bitches;
      const weight = dogs + "; " + bitches;
      setWeight(weight);
    } else {
      const weight = objectWeight;
      setWeight(weight);
    }
  }
  function setNewWiki(number) {
    const wiki = dogs[number].url;
    setWiki(wiki);
  }




  function handleImageError() {
    if (previousImageIndex === photos.value.length - 1 && photoIndex === 0) {
      const newIndex = 1;
      setPreviousImageIndex(photoIndex);

      setStartImage(photos.value[newIndex].contentUrl);
      getPhotoIndex(newIndex);
    }
    if (previousImageIndex === 0 && photoIndex === photos.value.length - 1) {
      const newIndex = photos.value.length - 2;
      setPreviousImageIndex(photoIndex);

      setStartImage(photos.value[newIndex].contentUrl);
      getPhotoIndex(newIndex);
    }
    if (previousImageIndex === 1 && photoIndex === 0) {
      const newIndex = photos.value.length - 1;
      setPreviousImageIndex(photoIndex);

      setStartImage(photos.value[newIndex].contentUrl);
      getPhotoIndex(newIndex);
    }
    if (
      previousImageIndex === photos.value.length - 2 &&
      photoIndex === photos.value.length - 1
    ) {
      const newIndex = 0;
      setPreviousImageIndex(photoIndex);

      setStartImage(photos.value[newIndex].contentUrl);
      getPhotoIndex(newIndex);
    }
    if (previousImageIndex == null) {
      const newIndex = 1;
      setPreviousImageIndex(photoIndex);

      setStartImage(photos.value[newIndex].contentUrl);
      getPhotoIndex(newIndex);
    }
    if (previousImageIndex < photoIndex) {
      moveNext();
    }
    if (previousImageIndex > photoIndex) {
      movePrevious();
    } else {
      console.log("e");
    }
  }





  
  async function getDogsArray() {
    const GetNewInfoFirst = (dogs) => {
        const number = Math.round(Math.random() * dogs.length);
    
    const name = dogs[number].breed;
    setName(name);
    
    
    const origin = dogs[number].origin;
    setOrigin(origin);
    
    const objectHeight = dogs[number].meta.height;
    
    if (typeof objectHeight === "object") {
      const dogs = "Dogs: " + objectHeight.dogs;
      const bitches = "Bitches: " + objectHeight.bitches;
      const height = dogs + "; " + bitches;
      setHeight(height);
    } else {
      const height = objectHeight;
      setHeight(height);
    }
    
    
    const objectWeight = dogs[number].meta.weight;
    
    if (typeof objectWeight === "object") {
      const dogs = "Dogs: " + objectWeight.dogs;
      const bitches = "Bitches: " + objectWeight.bitches;
      const weight = dogs + "; " + bitches;
      setWeight(weight);
    } else {
      const weight = objectWeight;
      setWeight(weight);
    }
    
     const wiki = dogs[number].url;
    setWiki(wiki);
    
    function getNewDesc(number) {
        const newTitle = dogs[number].url;
        const title = newTitle.replace("https://en.wikipedia.org/wiki/", "");
    
        const wiki = new Wiki({
          url: "https://en.wikipedia.org/w/api.php",
          data: title,
        });
    
        Promise.all([wiki.getInfo()])
          .then(([info]) => {
            getInfo(info);
            const text = info.replace(/<[^>]+>/g, "");
            getText(text);
            return info;
          })
          .catch((err) => {
            console.log(`Возникла глобальная ошибка, ${err}`);
          });
      }
        getNewDesc(number);
    
        const getNewPhotoArray = (number) => {
            const newTitle = dogs[number].breed;
            const title = newTitle.replace(" ", "%20");
        
            const photo = new Photo({
              url: `https://bing-image-search1.p.rapidapi.com/images/search?q=${title}%20dog`,
              headers: {
                "X-RapidAPI-Key": "fa25da3ffamsh9bc1f269e92e98dp1387f7jsnbdf6b9d4bc82",
                "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
              },
            });
        
            Promise.all([photo.getAllPhotos()])
              .then(([photos]) => {
                getPhotos(photos);
                setStartImage(photos.value[0].contentUrl);
                getLength(photos.value.length);
                return photos;
              })
              .catch((err) => {
                console.log(`Возникла глобальная ошибка, ${err}`);
              });
        
            return photos;
          };
        getNewPhotoArray(number);
        getPhotoIndex(0);
      };

    function getDogsArr() {
      return Promise.all([dog.getAllDogs()])
        .then(([dogs]) => {
          getDogs(dogs);
          GetNewInfoFirst(dogs)
        })
        .catch((err) => {
          console.log(`Возникла глобальная ошибка, ${err}`);
        });
    }
  
  
    await getDogsArr();
  }
  
  useEffect(() => {
    async function fetchData() {
      await getDogsArray();
    }
    fetchData();
  }, []);

  const GetNewInfo = () => {
    const number = getRandomNumber();
    setNewName(number);
    setNewOrigin(number);
    setNewHeight(number);
    setNewWeight(number);
    setNewWiki(number);
    getNewDesc(number);
    getNewPhotoArray(number);
    getPhotoIndex(0);
  };
  


  return (
    <div className="body-main">
      <div className="body-main__photo-block">
        <img
          className="body-main__icon"
          src={iconLeft}
          onClick={movePrevious}
        ></img>
        <img
          className="body-main__photo"
          src={startImage}
          onError={handleImageError}
          alt="Dog"
        ></img>
        <img
          className="body-main__icon"
          src={iconRight}
          onClick={moveNext}
        ></img>
      </div>
      <p className="body-main__add">Photos can take a few seconds to load</p>
      <p className="body-main__add">
        {photoIndex + 1}/{length}
      </p>
      <h1 className="body-main__name">{name}</h1>
      <h2 className="body-main__desc">Origin: {origin}</h2>
      <h2 className="body-main__desc">Height: {height}</h2>
      <h2 className="body-main__desc">Weight: {weight}</h2>
      <p className="body-main__text">{text}</p>
      <a className="body-main__link" href={wiki} target="_blank">
        Wikipedia
      </a>
      <button className="body-main__button" onClick={GetNewInfo}>
        Generate new
      </button>
    </div>
  );
}

export default MainPage;

let data = [
    {
      id: 1,
      imageUrl:
        "https://wallpaperaccess.com/full/316662.jpg",
      title: "Paris",
      url: "#  ",
    },
    {
      id: 2,
      imageUrl: "https://wallpaperaccess.com/full/1175572.jpg",
      title: "California",
      url: "#",
    },
    {
      id: 3,
      imageUrl:
        "https://wallpaperaccess.com/full/1486926.jpg",
      title: "Abu dhabi",
      url: "#",
    },
    {
      id: 4,
      imageUrl: "https://images3.alphacoders.com/653/thumb-1920-653603.jpg",
      title: "Venice",
      url: "#",
    },
  ];
  
  const arrowLeft = document.getElementById("arrow-left");
  const arrowRight = document.getElementById("arrow-right");
  const sliderConetnt = document.getElementById("slider-content");
  const dotBurtuli = document.getElementsByClassName("dot");
  
  let sliderIndex = 0;
  
  function createAtag(item) {
    const tag = document.createElement("a");
    tag.setAttribute("href", item.url);
    tag.classList.add("slide");
  
    return tag;
  }
  
  function createImgtag(item) {
    const tagImage = document.createElement("img");
    tagImage.setAttribute("src", item.imageUrl);
    tagImage.setAttribute("alt", item.title);
  
    return tagImage;
  }
  
  function createH2ag(item) {
    const tagTitle = document.createElement("h2");
    tagTitle.textContent = item.title;
    tagTitle.classList.add("slider-title");
  
    return tagTitle;
  }
  
  function createDots(item) {
    const dotsParent = document.createElement("div");
    dotsParent.classList.add("dotsParent");
  
    data.forEach((element) => {
      const dotChild = document.createElement("div");
      dotChild.classList.add("dot");
      dotChild.setAttribute("data-id", element.id - 1);
  
      dotChild.addEventListener("click", function (event) {
        let id = event.target.getAttribute("data-id");
        sliderIndex = id;
        setSlide();
      });
  
      dotsParent.appendChild(dotChild);
    });
  
    return dotsParent;
  }
  function cuurentDotactive() {
    dotBurtuli[sliderIndex].classList.add("active");
  }
  
  function setSlide() {
    sliderConetnt.innerHTML = "";
    const slideItem = createAtag(data[sliderIndex]);
    const h2Tag = createH2ag(data[sliderIndex]);
    const imgTag = createImgtag(data[sliderIndex]);
    const dots = createDots();
  
    slideItem.appendChild(imgTag);
    slideItem.appendChild(h2Tag);
    sliderConetnt.appendChild(slideItem);
    sliderConetnt.appendChild(dots);
  
    cuurentDotactive();
    console.log(slideItem);
  }
  
  function arrowLeftClick() {
    if (sliderIndex == 0) {
      sliderIndex = data.length - 1;
      setSlide();
      return;
    }
    sliderIndex--;
    
    setSlide();
  }
  function arrowRIghtClick() {
    if (sliderIndex == data.length - 1) {
      sliderIndex = 0;
      setSlide();
      return;
    }
    sliderIndex++;
    
    setSlide();
  }
  
  arrowLeft.addEventListener("click", arrowLeftClick);
  arrowRight.addEventListener("click", arrowRIghtClick);
  setInterval(() => {
    arrowRIghtClick();
  }, 5000);
  
  setSlide();
  

 
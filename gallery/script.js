const btnElement = document.getElementById("btn");
const errorMessageElement = document.getElementById("errorMessage");
const galleryElement = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = document.getElementById("input").value;
  if (inputValue > 10 || inputValue < 1) {
    errorMessageElement.style.display = "block";
    errorMessageElement.innerText = "Number should be between 0 and 11";
    return;
  }

  const imgs = "";

  try {
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=ZiXZ5ythcVAvsx7CQgm_gU8AmaAz2qzRrglNQusoYtk`
    ).then((res) =>
      res.json().then((data) => {
        console.log(data);
        if (data) {
          data.forEach((pic) => {
            //console.log(pic.urls.small);
            imgs += `<img src="${pic.urls.small}" alt="image"`;
            galleryElement.style.display = "block";
            galleryElement.innerHTML = imgs;
          });
        }
      })
    );
    errorMessageElement.style.display = "None";
  } catch (error) {
    errorMessageElement.style.display = "Block";
    errorMessageElement.innerText = "An error happened";
  }
}
btnElement.addEventListener("click", fetchImage);

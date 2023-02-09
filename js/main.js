const countOfOffers = 25;
const countOfComments = 10;
const minLikes = 15;
const maxLikes = 200;
const descriptions = ['description1', 'description2', 'description3'];
const name = ['test1', 'test2', 'test3'];
const messages = ['comments1', 'comments2', 'comments3', 'comments4'];
const countAvatar = 6;

function getRandomNumber(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(array){
  const randomArrayNumber = getRandomNumber(0, array.length -1);
  return array[randomArrayNumber];
}

function getComment(index){
  return {
    id: index + 1,
    avatar: `img/avatar-${getRandomNumber(1, countAvatar)}.svg`,
    message: getRandomArray(messages),
    name: getRandomArray(name),
  };
}
const comments = new Array(countOfComments).fill(null).map((e, index) => getComment(index));

function getRandomComments(){
  let minRange = getRandomNumber(1, comments.length);
  let maxRange = getRandomNumber(1, comments.length);

  while(minRange >= maxRange){
     minRange = getRandomNumber(1, comments.length);
     maxRange = getRandomNumber(1, comments.length);

  }
  return comments.filter(
    (value, index) => index >= minRange - 1 && index <= maxRange - 1
  );

}

function getOffer(index){
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArray(descriptions),
    likes: getRandomNumber(minLikes, maxLikes),
    comments: getRandomComments(),
  };
}
const photos = new Array(countOfOffers).fill(null).map((e, index) => getOffer(index));
console.log(photos);





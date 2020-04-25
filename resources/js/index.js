//MAIN////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', ()=>{
  checkHash();
})

window.addEventListener('hashchange', ()=>{
  checkHash();
})
//ROUTER////////////////////////////////////////////////////////////////////////////////

let container = document.querySelector('.container');

let routes ={
  "#home": homePage,
"#project": projectPage
};

const checkHash = ()=>{
  let theHash = window.location.hash;
  if(theHash.length ==0){theHash="#home";}
  renderRoute(theHash);
}

const renderRoute = (hash)=>{
container.innerHTML = routes[hash];
if(hash =="#home"){
  getHome();
}
else if(hash =="#project"){
  try{
    renderDetailPage(projectDetail);
  }
  catch{
    const selectAProject = document.querySelector('.select-a-project');
    window.location.hash = "#home";
    selectAProject.style.opacity = "1";
    setTimeout(()=>{selectAProject.style.opacity = "0"}, 2000);
  }
}
}

//ABOUT/////////////////////////////////////////////////////////////////////////////
const toggleAbout = (e) => {
  const header = document.querySelector('header');
  header.classList.toggle('active');
  if (header.classList.contains('active')) {
    e.target.innerHTML = "Close";
  } else {
    e.target.innerHTML = "About";
  }
}

//IMAGE MOUSEOVER EFFECTS ///////////////////////////////////////////////////////////////////
const setImgMouseEffect = ()=>{
const seeMoreCursor = document.querySelector('.see-more');
const showcaseImg = document.querySelector('.showcase-img');

showcaseImg.addEventListener('mousemove', (e) => {
  let angle = 15;
  let rateX = (angle * 2) / e.target.clientWidth;
  let rateY = (angle * 2) / e.target.clientHeight;
  let rotateX = Math.round((-angle + (e.offsetY * rateY)) * -1);
  let rotateY = Math.round(-angle + (e.offsetX * rateX));
  showcaseImg.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

  seeMoreCursor.style.opacity = "1";
  seeMoreCursor.style.top = `${e.clientY}px`;
  seeMoreCursor.style.left = `${e.clientX}px`;
})
showcaseImg.addEventListener('mouseleave', () => {
  showcaseImg.style.transform = "translate(0)";
  seeMoreCursor.style.opacity = "0";
})
showcaseImg.addEventListener('mouseup', () => {
  showcaseImg.style.transform = "translate(0)";
  seeMoreCursor.style.opacity = "0";
})
}

//DYNAMIC PROJECT PROFILES //////////////////////////////////////////////////////////////////////
//const showcaseImg = document.querySelector('.showcase-img'); already above
// let container = document.querySelector('.container');
const showcaseDot = `<div class="showcase-dot"></div>`;
let showcaseDots = "";

let projectIndex = 0;
let step = 0;

let results = [];
let projectDetail = [];

const viewMore = (e) => {
  window.location.hash = "project";
  projectDetail = results[projectIndex];
  console.log(projectDetail);
}

const fetchData = async () => {
  let path = "./resources/projects.json";
  let response = await fetch(path);
  let data = await response.json();
  results = data.projects;
  console.log(results);
}

const updateDots = () => {
  const showcaseDotContainer = document.querySelector('.showcase-dots');
  for (i = 0; i < results.length; i++) {
    showcaseDotContainer.innerHTML += showcaseDot;
  }
  showcaseDots = document.querySelectorAll('.showcase-dot');
}

const setInitialPageIndex = () => {
  let length = results.length;
  if(step==0){
    step = 100 * length;
  }
}

const setProjectPage = (increment) => {
  let length = results.length;
  step = step + increment;
  projectIndex = step % length;
  renderProjectPage(results[projectIndex]);
}

const renderProjectPage = (i) => {
  const showcaseImg = document.querySelector('.showcase-img');
  const showcaseHeading = document.querySelector('.showcase-text-container .heading');
  const showcaseTechnologies = document.querySelector('.showcase-text-container p');
  const showcaseViewLive = document.querySelector('.showcase-text-container .showcase-view-live');
  const showcaseViewMore = document.querySelector('.showcase-text-container .showcase-view-more');
  const chevronLeft = document.querySelector('.chevron-left');
  const chevronRight = document.querySelector('.chevron-right');
  container.style.background = i.bgColor;
  showcaseImg.style.backgroundImage = `url(${i.img.webp})`;
  showcaseImg.classList.toggle('animated');
  setTimeout(()=>showcaseImg.classList.toggle('animated'), 500);
  showcaseHeading.textContent = i.name;
  showcaseTechnologies.textContent = i.technologies;
  showcaseViewLive.href = i.url;
  showcaseViewMore.dataset.id = i.id;
  showcaseDots.forEach((dot, index)=>{
    dot.style.background = "transparent";
    if(index==projectIndex){
      dot.style.background = "rgb(101, 101, 101)";
    }
  }
  )
  showcaseDots[projectIndex].style.background = "rgb(101, 101, 101)";
}

const preloadImg = ()=>{
  let cachedWebp = [];
  let cachedGif = [];
  results.forEach((r,index)=>{
    cachedWebp[index] = new Image();
    cachedWebp[index].src= r.img.webp;
    cachedGif[index] = new Image();
    cachedGif[index].src= r.img.gif;
  });
}

const getHome = ()=>{
  fetchData().then(()=>{
    updateDots();
    setInitialPageIndex();
    renderProjectPage(results[projectIndex]);
    setImgMouseEffect();
    preloadImg();
  });
}

const renderDetailPage = (i) => {
  const detailImg = document.querySelector('.detail-img');
  const detailViewLive = document.querySelector('.detail-text-container .detail-view-live');
  const detailHeading = document.querySelector('.detail-text-container .detail-heading');
  const detailTechnologies = document.querySelector('.detail-text-container .detail-technologies');
  const detailBrief = document.querySelector('.detail-text-container .detail-brief');
  const detailSolution = document.querySelector('.detail-text-container .detail-solution');
  container.style.background = i.bgColor;
  detailImg.style.backgroundImage = `url(${i.img.gif})`;
  detailHeading.textContent = i.name;
  detailTechnologies.textContent = i.technologies;
  detailViewLive.href = i.url;
  detailBrief.innerHTML = i.brief;
  detailSolution.innerHTML = i.solution;


}

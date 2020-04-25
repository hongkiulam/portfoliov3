
let homePage = `<div class="project-showcase">
  <h1 class="showcase-title">projects</h1>
  <div class="showcase-img-container">
    <a class="showcase-img"  onclick="viewMore(event)"></a>
  </div>
  <div class="showcase-text-container">
    <h2 class="heading"></h2>
    <p></p>
    <p><a href="" class="showcase-view-live" target="_blank">View Live</a>
      <a  class="showcase-view-more" data-id="1" onclick="viewMore(event)">View More</a></p>
  </div>
  <div class="showcase-dots">
  </div>
  <div class="chevron chevron-left" onclick="setProjectPage(-1)">
    <i class="fas fa-chevron-left"></i>
  </div>
  <div class="chevron chevron-right" onclick="setProjectPage(1)">
    <i class="fas fa-chevron-right"></i>
  </div>
</div>`;

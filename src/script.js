window.onload = function() {
    let screenWidth = window.innerWidth;
    let html = document.querySelector('html');
  
    if (screenWidth >= 950 && screenWidth <= 7000) {
      html.style.display = "none";
      alert("This website is not supported on computer devices. Please visit from a mobile or iPad.");
      window.location.href = "loading.html";
    };
  };
  
  
  // edufaith alert function
  
  
  let edufaithAlert = (alertMessage) => {
    let alertContainer = document.createElement('div');
    alertContainer.classList.add('edufaith-alert');
    alertContainer.innerHTML = `
      <div class="ed_parent">
        <div class="alert-icon"><i class="fas fa-info-circle"></i></div>
        <div class="alert-message">${alertMessage}</div>
        <button class="close-alert" onclick="this.parentElement.style.display='none';">&times;</button>
      </div>
    `;
  
    let alertOverlay = document.createElement('div');
      alertOverlay.classList.add('alert-overlay');
  
      document.body.appendChild(alertOverlay)
      document.body.appendChild(alertContainer);
  
      setTimeout(() => {
        alertContainer.remove();
        alertOverlay.remove()
    }, 3000);
  
    document.querySelector('.close-alert').onclick = function() {
      document.body.removeChild(alertOverlay);
      document.body.removeChild(alertContainer);
  };
  }
  
  
  // for sidebar
  
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  let isDragging = false;
  let startX = 0;
  
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarOverlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
  });
  
  const startDrag = (e) => {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
  };
  
  const drag = (e) => {
    if (isDragging) {
      const currentX = e.pageX || e.touches[0].pageX;
      if (currentX - startX < -50) {
        closeSidebar();
      }
    }
  };
  
  const closeSidebar = () => {
    sidebar.classList.remove('active');
    sidebarOverlay.style.display = 'none';
    isDragging = false;
  };
  
  document.addEventListener('mousedown', startDrag);
  document.addEventListener('touchstart', startDrag);
  
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);
  
  document.addEventListener('mouseup', () => { isDragging = false });
  document.addEventListener('touchend', () => { isDragging = false });
  
  document.getElementById('close-btn').addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);
  
  
  // for submit spinner
  
  document.querySelectorAll('.input_submit').forEach(button => {
      button.addEventListener('click', function() {
          const spinner = document.createElement('div');
          spinner.classList.add('search-spinner');
          this.innerHTML = '';
          this.appendChild(spinner);
          setTimeout(() => {
              spinner.remove();
              this.innerHTML = '<p><img src="icons/Search.png" width="30"></p>';
          }, 8000);
      });
  });
  
  // for mobile app alert
  
  document.querySelectorAll('.mobile-app').forEach(item => {
    item.addEventListener('click', () => {
      edufaithAlert("Oops! The page you're looking for seems to have taken a wrong turn.");
    });
  });
  
  
  window.addEventListener('load', function(){
    document.querySelector('iframe').style.display = 'none';
  });
  
  
  // for bytes and videos pages
  
  // for bytes scroll buttons
  // for right button
  let scrollBytes = document.getElementById('bytes_scroll_btn_right');
  scrollBytes.addEventListener('click', () => {
    const bytesDiv = document.querySelector('.bytes');
    bytesDiv.scrollBy({
      left: 200, //adjust it
      behavior: 'smooth'
    });
  });
  
  // for left button
  let scrollBytestwo = document.getElementById('bytes_scroll_btn_left');
  scrollBytestwo.addEventListener('click', () => {
    const bytesDivtwo = document.querySelector('.bytes');
    bytesDivtwo.scrollBy({
      left: -200, //adjust it
      behavior: 'smooth'
    });
  });
  
  function openFullscreenVideo(videoSrc) {
    let fullScreenWindow = window.open(videoSrc, "_blank", "fullscreen=yes");
    fullScreenWindow.focus();
  }
  
  
  // for add byte button
  let addByte = document.getElementById('add-byte');
  addByte.addEventListener('click', () => {
    edufaithAlert("To add byte, you need to login to our website first.");
  })
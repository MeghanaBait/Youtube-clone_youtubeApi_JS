// API Key: "AIzaSyCTBnWVy8HxbL8hoi0-16y_aZcCrx2G7Ak"
// "AIzaSyDI7xuxOTRzMsDfaecSlpFJfHOKQV04dnk"
const API_KEY = "AIzaSyCTBnWVy8HxbL8hoi0-16y_aZcCrx2G7Ak";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const getChannelIcon = (video_data) => {
    fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${video_data.snippet.channelId}`)
        .then(res => res.json())
        .then((data) => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            displayVideos(video_data);
        })
        .catch(err => console.log(err));
}


videoCardContainer = document.querySelector('.videos-container');

function calculateDaysAgo(publishedDate) {
    const today = new Date();
    const diffInMs = today - new Date(publishedDate); // Corrected variable name
    const daysAgo = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return daysAgo;
}

const displayVideos = (data) => {
    // title string Truncate
    const truncatedTitle = data.snippet.title.length > 55 ? data.snippet.title.substring(0, 25) + '...' : data.snippet.title;

    // days ago 
    const publishedAgo = calculateDaysAgo(data.snippet.publishedAt);

    videoCardContainer.innerHTML += `
    <div class="video">
        <a href="video.html?videoId=${data.id.videoId}">
        <img src="${data.snippet.thumbnails.high.url}" alt="${data.snippet.title}" class="thumbnail">
        </a>
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <a href="video.html?videoId=${data.id.videoId}">
                    <h4 class="title">${truncatedTitle}</h4>
                </a>
                <p class="channel-name">${data.snippet.channelTitle}</p>
                <div>
                    <h5 class="days">${publishedAgo} days ago</h5>
                </div>
            </div>
        </div>
    </div>
    `;

}

// display videos
function getVideosInfo(videos) {
    // fetching channel icons
    videos.forEach(video => {
        // console.log(video);
        getChannelIcon(video);
    });
}

//Get Videos
function getVideos(query) {
    fetch(`${BASE_URL}/search?key=${API_KEY}&part=snippet&type=video&q=${query}&maxResults=50&chart=mostPopular&regionCode=IN`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            getVideosInfo(data.items);
        })
        .catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
    getVideos("");

    // search bar
    const searchInput = document.querySelector('.search-bar');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            getVideos(query);
            searchInput.value = "";
        } else {
            alert("Please enter a search query")
        }
    });
});

// Sidebar Toggle
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener('click', () =>{
    sidebar.classList.toggle('active');
});


// filter buttons

const filterButtons = document.querySelectorAll('.filter-options');

filterButtons.forEach(button =>{
    button.addEventListener('click', function(){
        filterButtons.forEach(btn => btn.classList.remove('active'));

        this.classList.add('active');
        const query = this.textContent.trim();
        if(query === "all"){
            getVideos("");
        }else{
            getVideos(query);
        }
    });
});


const API_KEY = "AIzaSyCTBnWVy8HxbL8hoi0-16y_aZcCrx2G7Ak";
const BASE_URL = "https://www.googleapis.com/youtube/v3";


window.addEventListener("load", () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const videoId = params.get('videoId');

    if (YT) {
        new YT.Player('video-container', {
            height: "500",
            width: "1000",
            videoId: videoId
        });
    }

    function getChannelDetails(channelId){
        fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
    }

    function getVideoDetails() {
        fetch(`${BASE_URL}/videos?key=${API_KEY}&part=snippet&id=${videoId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                console.log(data.items[0].snippet.channelId);
                getChannelDetails(data.items[0].snippet.channelId);
            })
    }


    function getComments(){
        fetch(`${BASE_URL}/commentThreads?key=${API_KEY}&part=snippet&videoId=${videoId}&maxResults=25`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                console.log(data.items[0].snippet.channelId);
                getChannelDetails(data.items[0].snippet.channelId);
            })
    }
    getVideoDetails();
    getComments();
})


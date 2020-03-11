var app = new Vue({
    el: ".main-panel",
    data: {
        songname: "",
        songlist: [],
        isPlaying: false,
        songurl: "",
        coverurl: "",
        comList: [],
        mvurl: "",
        mvdisplay: false
    },
    methods: {
        querySong: function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + that.songname)
                .then(function (response) {
                    console.log(response);
                    that.songlist = response.data.result.songs;
                })
                .catch(function (err) {
                    console.log(err)
                });
        },
        playSong: function (songid) {
            this.isPlaying = true;
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + songid)
                .then(function (response) {
                    console.log(response);
                    that.songurl = response.data.data[0].url;
                })
                .catch(function (err) {
                    console.log(err)
                });
            axios.get("https://autumnfish.cn/song/detail?ids=" + songid)
                .then(function (response) {
                    console.log(response);
                    that.coverurl = response.data.songs[0].al.picUrl;
                })
                .catch(function (err) {
                    console.log(err)
                });
            //获取歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + songid)
                .then(response => {
                    console.log(1);
                    console.log(response);
                    that.comList = response.data.hotComments
                });
        },
        playMV: function (mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function (response) {
                    console.log(response);
                    that.mvurl = response.data.data.url;
                })
                .catch(function (err) {
                    console.log(err)
                });
            this.mvdisplay = true;
            this.$refs.audio.pause();
        },
        pause: function () {
            this.isPlaying = false;
        },
        play: function () {
            this.isPlaying = true;
        },
        closemv: function () {
            this.mvdisplay = false;
            this.$refs.video.pause();
            this.$refs.audio.pause();
        }
    }
});
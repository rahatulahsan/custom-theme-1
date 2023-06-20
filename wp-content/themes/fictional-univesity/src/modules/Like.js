import $ from 'jquery'

class Like {

    constructor (){
        this.events();
    }


    events (){
        $(".like-box").on("click", this.ourClickDispatcher.bind(this));
    }

    // All methods here
    ourClickDispatcher(e){

        // Giving the gurantee to store nearest element. User might not click on the box always
        var currentLikeBox = $(e.target).closest(".like-box");

        if(currentLikeBox.attr('data-exists') == 'yes'){
            this.deleteLike(currentLikeBox);
        }else{
            this.createLike(currentLikeBox);
        }
    }

    createLike(currentLikeBox){
        $.ajax({
            beforeSend: (xhr)=>{
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'POST',
            data: {'professorId' : currentLikeBox.data('professor')}, // sending data to like-route.php
            success: (response)=>{

                currentLikeBox.attr('data-exists', 'yes');
                var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
                likeCount++;
                currentLikeBox.find(".like-count").html(likeCount);
                currentLikeBox.attr("data-like", response);
                console.log(response);
            },
            error: (response)=>{
                console.log(response);
            }
        })
    }

    deleteLike(currentLikeBox){
        $.ajax({
            beforeSend: (xhr)=>{
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'DELETE',
            data: {'like' : currentLikeBox.attr('data-like')},
            success: (response)=>{
                currentLikeBox.attr('data-exists', 'no');
                var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
                likeCount--;
                currentLikeBox.find(".like-count").html(likeCount);
                currentLikeBox.attr("data-like", '');
                console.log(response);
            },
            error: (response)=>{
                console.log(response);
            }
        })
    }
}

export default Like;
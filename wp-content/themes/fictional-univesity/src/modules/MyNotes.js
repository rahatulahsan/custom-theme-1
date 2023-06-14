import $ from 'jquery';

class MyNotes {

    constructor() {
        this.events();
    }


    events() {

        // Selecting the parent element. And adding the inside element in the 2nd parameter. 
        $("#my-notes").on("click", ".delete-note", this.deleteNote);
        $("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
        $("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
        $(".submit-note").on("click", this.createNote.bind(this));

    }

    //All Methods here

    // Function to delete the data
    deleteNote(e){
        
        var thisNote = $(e.target).parents("li"); // targetting the li starting from button

        $.ajax({
            beforeSend: (xhr)=>{
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'DELETE',
            success: (response)=>{
                thisNote.slideUp(); // deleting the note from UI
                console.log("Congrats!");
                console.log(response);
                if(response.userNoteCount < 5){
                    $(".note-limit-message").removeClass("active");
                }
            },
            error: (response)=>{
                console.log("Sorry");
                console.log(response);
            }
        });
    }

    // Function for Updating the data
    updateNote(e){
        
        var thisNote = $(e.target).parents("li"); // targetting the li starting from button

        // Getting the data from the field for updating
        var ourUpdatedPost = {
            'title': thisNote.find(".note-title-field").val(),
            'content': thisNote.find(".note-body-field").val()
        }

        $.ajax({
            beforeSend: (xhr)=>{
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'POST',
            data: ourUpdatedPost,
            success: (response)=>{

                this.makeNoteReadOnly(thisNote); // After update, it will make the field Read Only
                console.log("Congrats!");
                console.log(response);
            },
            error: (response)=>{a
                console.log("Sorry");
                console.log(response);
            }
        });
    }

    // New Note Creation Funtion
    createNote(e){
        
        // Getting the data from the field for updating
        var ourNewPost = {
            'title': $(".new-note-title").val(),
            'content': $(".new-note-body").val(),
            'status': 'publish' 
        }

        $.ajax({
            beforeSend: (xhr)=>{
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/',
            type: 'POST',
            data: ourNewPost,
            success: (response)=>{

                $(".new-note-title, .new-note-body").val(''); // Making the fields empty where user adding input
                $(`
                    <li data-id ="${response.id}">
                        <input readonly class="note-title-field" value ="${response.title.raw}">
                        <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                        <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                        <textarea readonly class="note-body-field">${response.content.raw}</textarea>
                        <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                    </li>
                `).prependTo('#my-notes').hide().slideDown();
                console.log("Congrats!");
                console.log(response);
            },
            error: (response)=>{
                if(response.responseText == "\r\n\r\n\r\n\r\n\r\nYou have reached your note limit"){
                    $(".note-limit-message").addClass("active");
                }
                console.log("Sorry");
                console.log(response);
            }
        });
    }


    editNote(e){

        var thisNote = $(e.target).parents("li"); // capturing the parent element and that is a LIST

        // Condition checking. Based on that function will call. Either for Edit or For read Mode
        if(thisNote.data("state") == "editable"){
            //make read only
            this.makeNoteReadOnly(thisNote);

        }else{
            // make editable
            this.makeNoteEditable(thisNote);
        }

    }

    // Function that is running when a user clicking in edit
    makeNoteEditable(thisNote){

        // After clicking in edit button making text field edit mode
        thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field");
        // Also Making the Save button Visible
        thisNote.find(".update-note").addClass("update-note--visible");
        // Making the edit button a Cancel button 
        thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i> Cancel');

        // Making the state editable. So, next time when user click, at the top function editNote the IF condition will run
        thisNote.data("state", "editable");
    }

    // Function that is running when a user clicking on Cancel Button (Opposite of Edit action will run)
    makeNoteReadOnly(thisNote){

        // After clicking in cancel button making text field readonly mode again
        thisNote.find(".note-title-field, .note-body-field").attr("readonly","readonly").removeClass("note-active-field");
        // disapperaing the Save button
        thisNote.find(".update-note").removeClass("update-note--visible");
        // Making the edit button a Cancel button 
        thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');

        thisNote.data("state", "cancel");
}
}

export default MyNotes;
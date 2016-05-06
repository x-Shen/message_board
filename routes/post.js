/**
 * Created by xinshen on 5/6/16.
 */

var add_message = function(){
    var id = req.params.id;
    $.ajax({
        type: "POST",
        url: 'localhost:3000/saveMessage',
        data:{
            _post: req.params.id,
            message: req.body.message,
            user: req.body.session.user
        },
        success: function(data){
            var newMessage = PostMessage(data);
            newMessage.save(function(err){
                if(err) throw err;
            });
        }

    });
};

$("#m").on("click",".new_messages", add_message);
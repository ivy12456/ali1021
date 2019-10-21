// 添加用户事件
$("#userform").on("submit",function(){
    var formData=$("#userform").serialize();
    $.ajax({
      type:"post",
      url:"/users",
      data:formData,
      success:function(){
        location.reload();
      },
      error:function(response){
        alert((JSON.parse(response.responseText).message)); 
      }
    })
    return false;
  })

// 上传头像事件
$("#modifyBox").on("change","#avatar",function(){
      var formData=new FormData();
      formData.append("avatar",this.files[0]);
    //   console.log(this.files[0]);

      $.ajax({
          type:"post",
          url:"/upload",
          data:formData,
          processData:false,
          contentType:false,
          success:function(response){
            // console.log(response);
            console.log(response[0].avatar);
            $("#preview").attr("src",response[0].avatar);
            $("#hiddenAvatar").val(response[0].avatar);
          }
      })
})

// 刷新列表事件
$.ajax({
    type:"get",
    url:"/users",
    success:function(response){
        // console.log(response);
        var html=template("userTpl",{data:response});
        $("#userBox").html(html);
    }
})

// 点击编辑显示用户信息事件
$("#userBox").on("click","#edit",function(){
    var id=$(this).attr("data-id");
    $.ajax({
        type:"get",
        url:"/users/"+id,
        success:function(response){
            var html=template("modifyTpl",response);
            $("#modifyBox").html(html);
        }
    })
})

// 修改用户信息事件
$("#modifyBox").on("submit","#modifyform",function(){
    var id=$(this).attr("data-id");
    var formData=$(this).serialize();

    $.ajax({
        type:"put",
        url:"/users/"+id,
        data:formData,
        success:function(response){
        //    console.log(response);
           location.reload();
        }
    })
    return false;
})

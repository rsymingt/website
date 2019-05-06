
import $ from "jquery";

const Auth = {
  isAuthenticated: false,
  authenticate: (cb) => {
    $.ajax({
      url: "/api/v1/auth",
      type: "GET",
      data: {

      },
      error: function(err){
        console.log(err);
      },
      success: function(data){
        Auth.isAuthenticated = data;

        // console.log(Auth.isAuthenticated);

        if(data)
          cb();
      }
    });
  },
}

export default Auth;

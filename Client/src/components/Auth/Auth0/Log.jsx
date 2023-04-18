import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

function log() {
  const clientID = "301297638298-q7q0crhrkrbfmdt75ci4uvhvmfo8h66q.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [loggeIn, setLoggetInfo] = useState(false);

  const onSuccess = (response) => {
    setUser(response.profileObj);
    document.getElementsByClassName("btn").hidden = true;
  };
  const onFailure = (response) => {
    console.log("Something went wrong");
  };
  const handleLogout = () => {
    setUser({});
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div className="loginAuth0">
      <GoogleLogin
        clientId={clientID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Google"
        cookiePolicy={"single_host_origin"}
      />

      <div className={user ? "profile" : "hidden"}>
        <img src={user.imageUrl} />
        <h3>{user.name}</h3>
      </div>
    </div>
  );
}

export default log;

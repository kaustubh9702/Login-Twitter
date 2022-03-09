pass=getSessionID();
appID="23591652";
redirectURI="https://kaustubh9702.github.io./Login-Twitter/redirect.html";
function windowOpen(){
    OGURL="https://www.twitter.com/oauth/v2/authorization="+appID+"&redirect_uri="+redirectURI+"&state="+pass;
    window.open(OGURL, "Log Into Facebook","width=500, height=500, left=200, top=50");
}


function getUserID(acc_token){
    goToURL="https://graph.facebook.com/me?fields=id&access_token="+acc_token;
    const userID=new XMLHttpRequest();
    userID.open("GET", goToURL);
    userID.send();

    userID.onload=function(){
        if(userID.status===200){
            USERObj=JSON.parse(userID.responseText);
            UserID=USERObj.id;
            sessionStorage.setItem("UserID",UserID);
            console.log("User ID:"+sessionStorage.getItem("UserID"));    
        }
        else if(userID.status===404){
            console.log("No Records Found");
        }
    }
}


//This function needs to be in the server side code
function getAccessToken(){
    notCode=window.location.href;
    code=notCode.slice(59);
    secret="8475706848c91218749a358ea6344aa3";
    goTo="https://graph.facebook.com/v13.0/oauth/access_token?client_id="+appID+"&redirect_uri="+redirectURI+"&client_secret="+secret+"&code="+code+"&scope=email,public_profile";
    const token=new XMLHttpRequest();
    token.open("GET", goTo);
    token.send();

    token.onload=function(){
        if(token.status===200){
            AccessObj=JSON.parse(token.responseText);
            AccessToken=AccessObj["access_token"];
            sessionStorage.setItem("access_token",AccessToken);
            console.log("Access Token:"+sessionStorage.getItem("access_token"));
            getUserID(sessionStorage.getItem("access_token"));
            console.log("User ID: "+sessionStorage.getItem("UserID")); 
        }
        else if(token.status===404){
            console.log("No Records Found");
        }
    } 
}



function hashing(string) {
    //set variable hash as 0
    var hash = 0;
    // if the length of the string is 0, return 0
    if (string.length == 0) return hash;
    for (i = 0 ;i<string.length ; i++)
    {
    ch = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash = hash & hash;
    }
    return hash;
    }



function clickCounter(){
    if(typeof(Storage)!=="undefined"){
        if(sessionStorage.clickcount){
            sessionStorage.clickcount=Number(sessionStorage.clickcount)+1;
        }
        else{
            sessionStorage.clickcount=1;
        }
        document.getElementById("result").innerHTML="You have clicked "+sessionStorage.clickcount+" times in this session.";
    }
    else{
        document.getElementById("result").innerHTML="You dont have session storage";
    }
}
function getSessionID(){
    var chars = "VTBLRXpCS05Jallib0ZwV2VSNVM6MTpjaQ";
 var passwordLength = 12;
 var password = "";

 for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
   }

   return password;
}
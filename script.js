var audio = new Audio('assets/sentmessage.mp3');
var contactString = "<div class='social'> <a target='_blank' href='tel:+1 2175501337 or +86 18930386735'> <div class='socialItem' id='call'><img class='socialItemI' src='images/phone.svg'/><label class='number'>+1 2175501337</label></div> </a> <a href='mailto:px6@illinois.edu'> <div class='socialItem'><img class='socialItemI' src='images/gmail.svg' alt=''></div> </a> <a target='_blank' href='https://github.com/explcre'> <div class='socialItem'><img class='socialItemI' src='images/github.svg' alt=''></div> </a> <a target='_blank' href='https://wa.me/'> <div class='socialItem'><img class='socialItemI' src='images/whatsapp.svg' alt=''></div> </a> <a target='_blank' href='https://t.me/'> <div class='socialItem'><img class='socialItemI' src='images/telegram.svg' alt=''></div> </a> <a target='_blank' href='https://instagram.com/xpc_1025'> <div class='socialItem'><img class='socialItemI' src='images/instagram.svg' alt=''> </div> </a> <a href='https://www.linkedin.com/in/pengcheng-xu-ryan/' target='_blank' rel='noopener noreferrer'> <div class='socialItem'><img class='socialItemI' src='images/linkedin.svg' alt=''></div> </a> </div>";
var resumeString = "<img src='images/resumeThumbnail.png' class='resumeThumbnail'><div class='downloadSpace'><div class='pdfname'><img src='images/pdf.png'><label>resume_Pengcheng_Xu.pdf</label></div><a href='assets/resume_Pengcheng_Xu.pdf' download='resume_Pengcheng_Xu.pdf'><img class='download' src='images/downloadIcon.svg'></a></div>";
var githubString = "<img src='images/githubThumbnail.png' class='githubThumbnail'>";
var addressString = "<div class='mapview'><iframe src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5411.448529658408!2d-88.228491!3d40.111323!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880cd0eb0df454b5%3A0xe7ba4e7c081a6483!2z6IGU5ZCI56S85aCC!5e1!3m2!1sen-US!2sus!4v1676164166623!5m2!1szh-CN!2sus' class='map'></iframe></div><label class='add'><address><br>Urbana, Illinois, United States 61801</address>";
const openai = require("openai");
var globalFirstTime=true;
function SendChatGPT(text) {
    //sendTextMessage(text);
    var predefined_text="Can you imitate that you are Pengcheng Xu? Your Chinese name is 徐鹏程. You are born in 1999, Oct, 25th. You live in Shanghai for the first twenty-two years. You are now pursuing a master's degree in University of Illinois Urbana-Champaign. Your major is Electrical and Computer Engineering. You are expected to graduate in December 2023.You have complete your Bachelor's degree from University of Michigan - Shanghai Jiao Tong University Joint institute, also major in ECE. You love singing, playing the guitar, working out, play basketball, tennis, swimming, reading, watching films, and everything about science and technology. You admire Richard Feynman and Elon Musk. As for programming language, You are good at C/C++, Python. You also have project experience in MATLAB, Verilog, Java,R,Javascript. You are interested in applied machine learning for healthcare or science or computer systems, distributed systems and distributed learning, computer architecture. Your mobile phone number is +1 2175501337. Your email is px6@illinois.edu.  ... (If I say something in English, please reply me in English.) Now I will say: ";
    var sQuestion = predefined_text+text;//txtMsg.value;
    //sendTextMessage(sQuestion);
    var sModel = "gpt-3.5-turbo-0301"//"text-davinci-003";//"gpt-3.5-turbo-0301"//selModel.value;// "text-davinci-003";
    if (sQuestion == "") {
        alert("Type in your question!");
        txtMsg.focus();
        return;
    }
    //sendTextMessage("1");
    var oHttp = new XMLHttpRequest();
    if(sModel === "text-davinci-003"){
        oHttp.open("POST", "https://api.openai.com/v1/completions");//v1/completions   //completions
    }else if(sModel ==="gpt-3.5-turbo-0301"){
        oHttp.open("POST", "https://api.openai.com/v1/chat/completions");//v1/completions   //completionss
    }
    
    oHttp.setRequestHeader("Accept", "application/json");
    oHttp.setRequestHeader("Content-Type", "application/json");
    var OPENAI_API_KEY ="";
    oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY)
    //sendTextMessage("2");
    // Get the user's IP address
    var userIP;
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
        userIP = data.ip;
        // Send the IP address and message to your server
        //sendTextMessage("User IP:" +  userIP);//here send user IP
        })
        .catch(error => {
        console.error('Error getting user IP:', error);
        });
    
    oHttp.onreadystatechange = function () {
        if (oHttp.readyState === 4) {
            //sendTextMessage("oHttp.readyState === 4");
            //console.log(oHttp.status);
            var oJson = {}
            //sendTextMessage("2.5" );
            //if (txtOutput.value != "") txtOutput.value += "\n";

            try {
                oJson = JSON.parse(oHttp.responseText);
                //sendTextMessage("oJson=: " + oJson);
            } catch (ex) {
                //txtOutput.value += "Error: " + ex.message
                sendTextMessage("Error: " + ex.message);
            }

            if (oJson.error && oJson.error.message) {
                //txtOutput.value += "Error: " + oJson.error.message;
                sendTextMessage("Error:" + oJson.error.message);
            } else if (oJson.choices && ((sModel==="text-davinci-003"&& oJson.choices[0].text)||
                (sModel==="gpt-3.5-turbo-0301" && oJson.choices[0]))) {
                if(sModel==="text-davinci-003"){
                    var s = oJson.choices[0].text;
                }else if(sModel==="gpt-3.5-turbo-0301"){
                    var s = oJson.choices[0].message.content;//.message.content;
                    //globalTextData.messages.push({"role":"assistant","content":s});
                }
                
                var selLang="en-US";
                /*if (selLang.value != "en-US") {
                    var a = s.split("?\n");
                    if (a.length == 2) {
                        s = a[1];
                    }
                }*/

                if (s === "") s = "No response";
                //sendTextMessage("2.5 in the loop");
                sendTextMessage(s);
                // Get the current date and time
                var now = new Date();
                // Format the date and time as desired
                var dateTime = now.toLocaleString();
                sendMessageToServer(text,s, userIP,dateTime);
                //txtOutput.value += "Chat GPT: " + s;
                TextToSpeech(s);
            }            
        }//sendTextMessage("oHttp.readyState === 4 not true");
        //sendTextMessage("oHttp.readyState === ");
        //sendTextMessage(oHttp.readyState);

    };
    //sendTextMessage("3");
    
    var iMaxTokens = 1024;
    var sUserId = "1";
    var dTemperature = 0.5;    
    //sendTextMessage("4");
    if (sModel==="gpt-3.5-turbo-0301"){
        if(true){
            var data={
                model: sModel,
                messages:[{"role": "system", "content": predefined_text},
                          {"role": "user", "content": text}]
            };
            //globalTextData.model=sModel;
            //globalTextData.messages.push({"role": "user", "content": predefined_text+text});
            //globalTextData=data;
        }else{
            //data.messages.append({"role":"assistant","content":text});
            //globalTextData.messages.push({"role":"user","content":text});
        }
        
        //data.messages.append({"role":"assistant","content":sQuestion});
    }else if(sModel==="text-davinci-003"){
        var data={//var data=
            model: sModel,
            prompt: sQuestion,
            max_tokens: iMaxTokens,
            user: sUserId,
            temperature:  dTemperature,
            frequency_penalty: 0.0, //Number between -2.0 and 2.0  Positive value decrease the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0.0,  //Number between -2.0 and 2.0. Positive values increase the model's likelihood to talk about new topics.
            stop: ["#", ";"], //Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
            //messages:[{"role": "user", "content": sQuestion}]
        }
    }

    
    //sendTextMessage("5");

    oHttp.send(JSON.stringify(data));
    //sendTextMessage("6");
    /*if (txtOutput.value != "") txtOutput.value += "\n";
    txtOutput.value += "Me: " + sQuestion;
    txtMsg.value = "";*/
    //sendTextMessage("7");
    //return globalTextData;
}

function sendMessageToServer(inputText,answeredText, userIP,dateTime) {
    //sendTextMessage("in sendMessageToServer()");
    var xhr = new XMLHttpRequest();
    var serverIP="127.0.0.1";//"68.180.36.23"//'127.0.0.1';//"68.180.36.23"//'68.180.36.27'
    var serverPort='9999';//'9999'
    xhr.open('POST', 'http://'+serverIP+':'+serverPort, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    //sendTextMessage("setrequest done");
    xhr.send(JSON.stringify({
      message: inputText,
      answer: answeredText,
      userIP: userIP,
      port:serverPort,
      time:dateTime
    }));
    var body=JSON.stringify({
        message: inputText,
        answer: answeredText,
        userIP: userIP,
        port:serverPort,
        time:dateTime
      });
    //window.open('mailto:759502002@qq.com?subject=subject&body='+body);
        // 附上nodejs发邮件的示例代码
    //const sendmail = require('sendmail')();
    const nodemailer = require('nodemailer');
    sendMail(JSON.stringify({
        message: inputText,
        answer: answeredText,
        userIP: userIP,
        port:serverPort,
        time:dateTime
      }));
    

    /*sendTextMessage(JSON.stringify({
        message: inputText,
        answer: answeredText,
        userIP: userIP,
        port:serverPort,
        time:dateTime
      }));*/
}

const nodemailer = require('nodemailer');
    async function sendMail(text){
      var user = '759502002@qq.com' //自己的邮箱
      var pass = 'xyumvidqtuosbbbb' //POP3//'aongczglbxwlbcef' //qq邮箱的授权码
      var receiver = '759502002@163.com' //目标邮箱
      // 创建 nodemailer 配置
        let transporter = nodemailer.createTransport({
            //支持列表： https://nodemailer.com/smtp/well-known/
            service: 'QQ', // 老严用的是 QQ
            port: 465, // SMTP 端口 
            secureConnection: true, 
            auth: {
                user: user,
                pass: pass, 
            }
        });
      let mailOptions = {
        from: user,
        to: receiver,
        subject: 'chatgpt-message',
        text:text
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('successfully sent email ID:', info.messageId);
    });
    }

function addPostParam(sParams, sParamName, sParamValue) {

    if (sParams.length > 0) {

       sParams += "&";

}

    return sParams + encodeURIComponent(sParamName) + "=" + encodeURIComponent(sParamValue);

}

 
function trySendMessageToServer(sParams, sParamName, sParamValue){
    var sParams = "";

    sParams = addPostParam(sParams, "gender", "女");

    sParams = addPostParam(sParams, "age", "25");

    oRequest.open("open", "test.jsp", false);

    oRequest.send(sParams);

}

function startFunction() {
    setLastSeen();
    waitAndResponce("intro");
}

function setLastSeen() {
    var date = new Date();
    var lastSeen = document.getElementById("lastseen");
    lastSeen.innerText = "last seen today at " + date.getHours() + ":" + date.getMinutes()
}


function closeFullDP() {
    var x = document.getElementById("fullScreenDP");
    if (x.style.display === 'flex') {
        x.style.display = 'none';
    } else {
        x.style.display = 'flex';
    }
}

function openFullScreenDP() {
    var x = document.getElementById("fullScreenDP");
    if (x.style.display === 'flex') {
        x.style.display = 'none';
    } else {
        x.style.display = 'flex';
    }
}


function isEnter(event) {
    if (event.keyCode == 13) {
        sendMsg();
    }
}

function sendMsg() {
    var input = document.getElementById("inputMSG");
    var ti = input.value;
    if (input.value == "") {
        return;
    }
    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var greendiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "sent");
    greendiv.setAttribute("class", "green");
    dateLabel.setAttribute("class", "dateLabel");
    greendiv.innerText = input.value;
    myDiv.appendChild(greendiv);
    myLI.appendChild(myDiv);
    greendiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    setTimeout(function () { waitAndResponce(ti) }, 1500);
    input.value = "";
    playSound();
}

function waitAndResponce(inputText) {
    var lastSeen = document.getElementById("lastseen");
    lastSeen.innerText = "typing...";
    let toUseChatGPT=0;
    switch (inputText.toLowerCase().trim()) {
        case "intro":
            setTimeout(() => {
                sendTextMessage("Hello there 👋🏻,<br><br>My name is <span class='bold'><a class='alink'>Pengcheng Xu</a>.</span><br><br>I am a Computer Engineering Master's student at <span class='bold'>University of Illinois - Urbana Champaign👨🏻‍💻📚</span><br><br>I am eager to hear about potential career opportunities, so I would be pleased to chat about job openings in the science and engineering sphere.<br><br>email: px6@illinois.edu<br>mobile: +1 2175501337<br><br>You can say whatever you like, this chatbox is connected to ChatGPT and know information about Pengcheng and can imitate me. <br><br>Send <span class='bold'>'help'</span> to know more about me.<br>");//linkedin: https://www.linkedin.com/\nin/pengcheng-xu-ryan/<br>
            }, 2000);
            break;
        case "help":
            sendTextMessage("<span class='sk'>Send Keyword to get what you want to know about me...<br>e.g<br><span class='bold'>'skills'</span> - to know my skills<br><span class='bold'>'resume'</span> - to get my resume<br><span class='bold'>'education'</span> - to get my education details<br><span class='bold'>'address'</span> - to get my address<br><span class='bold'>'contact'</span> - to get ways to connect with me<br><span class='bold'>'projects'</span> - to get details of my projects<br><span class='bold'>'clear'</span> - to clear conversation<br><span class='bold'>'about'</span> - to know about this site <br><span class='bold'>'chatgpt'</span> - Connect to ChatGPT API, it will imitate me and know my information.<br></span>");
            break;
        case "resume":
            sendTextMessage(resumeString);
            break;
        case "skills":
            sendTextMessage("<span class='sk'>I am currently pursuing Master's degree in Computer Engineering.<br><br>I can comfortably write code in following languages :<br><span class='bold'>C++<br>C<br>Python<br>MATLAB<br>Verilog<br>Java<br>R<br>RISC-V Assembly</span><br><br>I've experiance with following frameworks and libraries:<span class='bold'><br>PyTorch<br>TensorFlow<br>Keras<br>Sk-learn<br>pandas<br>horovod</span><br><br><br>Favourite IDE:VSCode</span>");
            break;

        case "education":
            sendTextMessage("I am currently pusuing Master's degree in Computer Engineering from University of Illinois Urbana - Champaign<br>Graduation Year : 2023<br><br>I have completed my Bachelor's degree from University of Michigan - Shanghai Jiao Tong University Joint institute, majoring in ECE.<br>Graduation Year:2022<br><br><br>");
            break;

        case "address":
            sendTextMessage(addressString);
            break;
        case "clear":
            clearChat();
            break;
        case "about":
            sendTextMessage("🛠️💻 This portfolio website is built using HTML, CSS and JavaScript. <br><br>👨🏻‍💻 Refined and Developed by <a class='alink' target='_blank' href='https:\/\/instagram.com/xpc_1025/'><span class='bold'>Pengcheng Xu</a> with ❤️. ChatGPT is connected to this website now, which is a newly added function developed by Pengcheng. This chatbot knows Pengcheng's information and will imitate Pengcheng.</span>");
            break;
        case "contact":
            sendTextMessage(contactString);
            break;
        case "projects":
            //sendTextMessage(githubString);
            sendTextMessage("You want to check my projects? Then just jump into my Github Account.<br><br><div class='social'><a target='_blank' href='https://github.com/explcre'> <div class='socialItem'><img class='socialItemI' src='images/github.svg' alt=''></div> </a></div>");
            break;
        /*case "poem":
            sendTextMessage(addressString);
            break;*/
        case "chatgpt":
            let toUseChatGPT=1;
            sendTextMessage("Now chatgpt is connected.");
            break;
        default:
            if (true){
                //sendTextMessage("Hey I couldn't catch you...😢<br>Send 'help' to know more about usage.");
                let prompt = inputText;//"What is the weather like today?"
                
                //sendTextMessage(inputText);
                /*if(globalFirstTime){
                    var globalTextData={
                        model: "gpt-3.5-turbo-0301",
                        messages:[]
                    };
                }*/               
                SendChatGPT(inputText);
                //if(globalFirstTime){globalFirstTime=false;}
                /*
                var model = "text-davinci-003";
                var temperature = 0.5;
                openai.completions.create(
                {
                    prompt: `${prompt}`,
                    model: `${model}`,
                    temperature: temperature,
                    max_tokens: 1024,
                    top_p: 1,
                },
                (error, response) => {
                    if (error) {
                    console.log(error)
                    } else {
                    console.log(response.choices[0].text)
                    }
                }
                );
                sendTextMessage("hi4");
                sendTextMessage(response);*/
            }else{
                setTimeout(() => {
                    sendTextMessage("Hey I couldn't catch you...😢<br>Send 'help' to know more about usage.");
                }, 2000);
            }   
            break;
    }



}

function clearChat() {
    document.getElementById("listUL").innerHTML = "";
    waitAndResponce('intro');
}



function sendTextMessage(textToSend) {
    setTimeout(setLastSeen, 1000);
    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var greendiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.setAttribute("id", "sentlabel");
    dateLabel.id = "sentlabel";
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "received");
    greendiv.setAttribute("class", "grey");
    greendiv.innerHTML = textToSend;
    myDiv.appendChild(greendiv);
    myLI.appendChild(myDiv);
    greendiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    playSound();
}


function sendResponse() {
    setTimeout(setLastSeen, 1000);
    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var greendiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "received");
    greendiv.setAttribute("class", "grey");
    dateLabel.setAttribute("class", "dateLabel");
    greendiv.innerText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ";
    myDiv.appendChild(greendiv);
    myLI.appendChild(myDiv);
    greendiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    playSound();
}

function playSound() {
    audio.play();
}
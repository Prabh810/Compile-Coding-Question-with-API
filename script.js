function main(){
    var heading = document.createElement("h1");
    heading.setAttribute("id","header");
    heading.innerHTML = "Write a program and see its output via API ";
    heading.style.textDecoration = "underline";
    document.body.appendChild(heading);

    var div_1 = document.createElement("div");
    var div_2 = document.createElement("div");
    var div_3 = document.createElement("div");
    var div_4 = document.createElement("div");

    div_1.setAttribute("id","div1");
    div_2.setAttribute("id","div2");
    div_3.setAttribute("id","div3");
    div_4.setAttribute("id","div4");


    document.body.appendChild(div_1);
    document.body.appendChild(div_2);
    document.body.appendChild(div_3);
    document.body.appendChild(div_4);


    //For div_1 content in compile coding question with API
    var instruction = document.createElement("h3");  //1st element
    var dropDown = document.createElement("select");  //2nd element
    var op_1 = document.createElement("option");
    var op_2 = document.createElement("option");
    var op_3 = document.createElement("option");
    var op_4 = document.createElement("option");
    var op_5 = document.createElement("option");

    instruction.innerHTML = "Type Your Code";
    instruction.setAttribute("id","ins");

    op_1.innerHTML = "Python";
    op_2.innerHTML = "JavaScript";
    op_3.innerHTML = "C";
    op_4.innerHTML = "C++";
    op_5.innerHTML = "Java";

    dropDown.setAttribute("id","droDow");
    op_1.setAttribute("id","op1");
    op_2.setAttribute("id","op2");
    op_3.setAttribute("id","op3");
    op_4.setAttribute("id","op4");
    op_5.setAttribute("id","op5");

    op_1.setAttribute("value","0");
    op_2.setAttribute("value","4");
    op_3.setAttribute("value","7");
    op_4.setAttribute("value","77");
    op_5.setAttribute("value","8");

    dropDown.appendChild(op_1);
    dropDown.appendChild(op_2);
    dropDown.appendChild(op_3);
    dropDown.appendChild(op_4);
    dropDown.appendChild(op_5);


    div_1.appendChild(instruction);
    div_1.appendChild(dropDown);


    //For div_2 content in compile coding question with API
    var textBox = document.createElement("textarea");
    textBox.setAttribute("placeholder","#Write your code");
    textBox.setAttribute("id","textBox");

    div_2.appendChild(textBox);

    //For div_3 content in compile coding question with API
    var outPut = document.createElement("textarea");
    outPut.setAttribute("placeholder","OUTPUT:");
    outPut.setAttribute("id","outPutBox");
    

    div_3.appendChild(outPut);
    

    //For div_4 content in compile coding question with API
    var compileButton = document.createElement("button");
    compileButton.setAttribute("id","CompileBtn");
    compileButton.innerHTML = "Compile";

    div_4.appendChild(compileButton);

    

}
main();

var languageId = "0";
var dropDown = document.getElementById("droDow");
dropDown.addEventListener("click",function(){
    languageId = dropDown.options[dropDown.selectedIndex].value;
})

var compileBtn = document.getElementById("CompileBtn");
compileBtn.addEventListener("click",function(){
    var request = new XMLHttpRequest();
    request.open('POST', 'https://codequotient.com/api/executeCode');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({ code : textBox.value , langId : languageId}));

    request.addEventListener('load', function(event){
        var codeText = JSON.parse(event.target.responseText)
        var codeId = codeText.codeId;
        
        setTimeout(function(){
            getRequestInterval(codeId)
        },2000);
    })
    clearInterval(setTimeout);
})
function getRequestInterval(codeId){
    var request = new XMLHttpRequest();
    request.open('GET',`https://codequotient.com/api/codeResult/${codeId}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    request.addEventListener('load',function(event){
        var outputData = JSON.parse(event.target.responseText);
        outputData = JSON.parse(outputData.data);

        if(outputData.output !== ''){
            console.log(outputData.output);
            outPutBox.value = outputData.output;
        }else{
            console.log(outputData.errors);
            outPutBox.value = outputData.errors;
        }
    })
}


/*
Project: Working Digital Computer, Paperclip Computer, Comspace 650
Author: TW
Description: Javascript functions needed to update the website with regards to the emulator

*/


function ResetAll()
{
    a = ["000"];
    T3BC.Load(a);
    UpdatePage();
}
function LoadProgram()                     
{
    a =[];
    compyfrm = document.forms['3bcf'];
    a.push(compyfrm.elements["in000"].value);
    a.push(compyfrm.elements["in001"].value);
    a.push(compyfrm.elements["in010"].value);
    a.push(compyfrm.elements["in011"].value);
    a.push(compyfrm.elements["in100"].value);
    a.push(compyfrm.elements["in101"].value);
    a.push(compyfrm.elements["in110"].value);
    a.push(compyfrm.elements["in111"].value);
    T3BC.Load(a);
    UpdatePage();
}
function StepProgram()
{
    compyfrm = document.forms['3bcf'];
    if(T3BC.IOF == true)
    { T3BC.IO = compyfrm.elements["IO"].value;
    }
    T3BC.Clock();
    UpdatePage();
}
function UpdatePage()
{
    compyfrm = document.forms['3bcf'];
    compyfrm.elements["ACC"].value = T3BC.ACC;
    c = T3BC.PC.toString(2);
    //pad up to 3 bits
    while(c.length < 3)
        { c = "0" + c;}
    compyfrm.elements["PC"].value = c;//num to string
    compyfrm.elements["IR"].value = T3BC.IR;
    compyfrm.elements["AR"].value = T3BC.AR;
    //set flag
    compyfrm.elements["OF"].checked = false;
    if(T3BC.OF == true)
    {compyfrm.elements["OF"].checked = true;}

    compyfrm.elements["IO"].value = T3BC.IO;
    //set flag
    compyfrm.elements["IOF"].checked = false;
    if(T3BC.IOF == true)
    {compyfrm.elements["IOF"].checked = true;}
    //memory
    compyfrm.elements["in000"].value = T3BC.Memory[0];
    compyfrm.elements["in001"].value = T3BC.Memory[1];
    compyfrm.elements["in010"].value = T3BC.Memory[2];
    compyfrm.elements["in011"].value = T3BC.Memory[3];
    compyfrm.elements["in100"].value = T3BC.Memory[4];
    compyfrm.elements["in101"].value = T3BC.Memory[5];
    compyfrm.elements["in110"].value = T3BC.Memory[6];
    compyfrm.elements["in111"].value = T3BC.Memory[7];
    
}
function UpdateCore(control)
{
    compyfrm = document.forms['wdcf']; 
    document.getElementById("ledC1").className = "led";
    document.getElementById("ledC2").className = "led";
    document.getElementById("ledC3").className = "led";
    document.getElementById("ledC4").className = "led";
    var core = control.value;
    if(compyfrm.elements["C"+core+"1"].checked == true)
    {
        document.getElementById("ledC1").className = "ledon";
    }
    if(compyfrm.elements["C"+core+"2"].checked == true)
    {
        document.getElementById("ledC2").className = "ledon";
    }
    if(compyfrm.elements["C"+core+"3"].checked == true)
    {
        document.getElementById("ledC3").className = "ledon";
    }
    if(compyfrm.elements["C"+core+"4"].checked == true)
    {
        document.getElementById("ledC4").className = "ledon";
    }
    
    
}

function UpdateOutput()
{
    compyfrm = document.forms['wdcf']; 
    //turn all lights off
    var i=0;
    for(i =0; i<10; i++)
    {
        document.getElementById("ledA"+i).className = "led";
        document.getElementById("ledB"+i).className = "led";
    }
    
    var ones=0;
    var tens=0;
    //10^1
    if(compyfrm.elements["OA1"].checked == true)
    {
        tens += 8;//2^3
    }
    if(compyfrm.elements["OA2"].checked == true)
    {
       tens += 4;//2^2
    }
    if(compyfrm.elements["OA3"].checked == true)
    {
        tens += 2;//2^1
    }
    if(compyfrm.elements["OA4"].checked == true)
    {
        tens += 1;//2^0
    }
    //10^0
    if(compyfrm.elements["OB1"].checked == true)
    {
        ones += 8; //2^3
    }
    if(compyfrm.elements["OB2"].checked == true)
    {
       ones += 4;//2^2
    }
    if(compyfrm.elements["OB3"].checked == true)
    {
        ones += 2;//2^1
    }
    if(compyfrm.elements["OB4"].checked == true)
    {
        ones += 1;//2^0   
    }
    //https://stackoverflow.com/questions/15241915/how-to-change-css-property-using-javascript
    //document.getElementById("ledA0").className = "ledon";
    tid = "ledA" + tens;
    oid = "ledB" + ones;
    document.getElementById(tid).className = "ledon";
    document.getElementById(oid).className = "ledon";
}
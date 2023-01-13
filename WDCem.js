/*
Project: Working Digital Computer, Paperclip Computer, Comspace 650
Author: TW
Description: Emulator for the WDC written in javascript as an object

*/
var WDC = {
    //main memory
    Memory: ["000", "000", "000", "000", "000", "000", "000", "000"],
    //registers
    ACC: "000", //accumulator
    PC: 0, //program counter
    IR: "000", //instruction register
    AR: "000", //address register
    IO: "000", //input/output register
    //flags
    IOF:false, //input flag
    OF: false, //overflow flag
    
    //load program somehow
    Load: function(memarr)
    {
        //alert(memarr);
        this.Memory = ["000", "000", "000", "000", "000", "000", "000", "000"];
        this.ACC = "000";
        this.PC = 0;
        this.IR = "000";
        this.AR = "000";
        this.IO = "000";
        this.IOF = false;
        this.OF = false;
        //this.Running = true;
        
        for(i=0; i < memarr.length; i++)
            { this.Memory[i] = memarr[i];}
        return;
    },
    
    
    //can actually do just by casting between int/string
    
    Add: function(a,b)
    {
        var inta = parseInt(a, 2); //Number(a); //parseInt(a, 10);
        var intb = parseInt(b, 2); //Number(b); //parseInt(b, 10);
        var intc = inta + intb;
        //if overflow
        if (intc > 7)
        {
            this.OF = true;
            intc =  intc - 8; //remove leading bit
        }
        else
        {
            this.OF = false;
        }
        c = intc.toString(2);
        //pad up to 3 bits
        while(c.length < 3)
            { c = "0" + c;}
        
        return c;
        
    },
    
    Sub: function(a,b)
    {
        var inta = parseInt(a, 2); //Number(a); //parseInt(a, 10);
        var intb = parseInt(b, 2); //Number(b); //parseInt(b, 10);
        var intc = inta - intb;
        //if overflow
        if (intc < 7)
        {
            this.OF = true;
            intc =  abs(intc + 8); //remove leading bit
        }
        else
        {
            this.OF = false;
        }
        c = intc.toString(2);
        //pad up to 3 bits
        while(c.length < 3)
        {c = "0" + c;}
        
        return c;
    },
    
    Fetch: function()
    {
        //next instruction loaded
        //this.PC = this.PC + 1;
        this.IR = this.Memory[this.PC];
        //increase for operand
        if (this.IR != "000")
        {
            this.PC = this.PC + 1;
            if(this.PC > 7)
                { this.PC=0; this.OF=true;}
            //put operand in ar
            this.AR = this.Memory[this.PC];
        }
        return;
    },
    
    DecodeExecute: function()
    {
        switch(this.IR)
        {
        case "000": 
            //halt
            //this.Running = false;
            //io
            //this.PC = this.PC - 1; //loaded operand for no reason
            if (this.IOF == false)
            {this.IO = this.ACC;}
            else
            {
                this.ACC = this.IO; 
                //should the IOF change after input
                this.IOF = false;
            }
            break;
        case "011": 
            //ld
            //this.ACC = this.Memory[this.PC];
            //ldi
            //this.ACC = this.Memory[this.Memory[this.PC]];
            //ld with AR
            this.ACC = this.Memory[parseInt(this.AR,2)];
            break;
        case "101":
            //st
            //this.Memory[this.PC] = this.ACC;
            //sti
            //this.Memory[this.Memory[this.PC]] = this.ACC
            //st with AR
            this.Memory[parseInt(this.AR,2)] = this.ACC;
            break;
        case "001":
            //add
            //this.ACC = this.Add(this.ACC, this.Memory[this.PC]);
            //with ar
            this.ACC = this.Add(this.ACC, this.Memory[parseInt(this.AR,2)]);
            break;
        case "010":
            //sub
            //this.ACC = this.Sub(this.ACC, this.Memory[this.PC]);
            //with ar
            this.ACC = this.Sub(this.ACC, this.Memory[parseInt(this.AR,2)]);
            break;
        case "110":
            //b
            //this.PC = parseInt(this.Memory[this.PC],2)-1;
            //with ar
            this.PC = parseInt(this.Memory[parseInt(this.AR,2)],2)-1;
            break;
        case "111":
            //bz
            /*x = ParseInt(this.ACC,2);
            if (x == 0)
            {
                //this.PC = parseInt(this.ACC,2)-1;
                //with ar
                this.PC = parseInt(this.AR,2)-1;
            }*/
            //bo
            if (this.OF == true)
            {
                //this.PC = parseInt(this.ACC,2)-1;
                //with ar
                this.PC = parseInt(this.AR,2)-1;
            }
            break;
        case "100":
            //lda
            //tpc = this.PC - 1;
            c = this.PC.toString(2);
            //pad up to 3 bits
            while(c.length < 3)
                {c = "0" + c;}
            this.ACC = c;
            break;
            
        }
        return;
    },
    
    Clock: function()
    {
        
        this.Fetch();
        this.DecodeExecute();
        //this.Execute();
        //next instruction loaded
        this.PC = this.PC + 1;
        if(this.PC > 7)
            { this.PC=0; this.OF=true;}
        return;
    }
};

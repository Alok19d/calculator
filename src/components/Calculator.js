import {useState} from "react";
 
let expr="",oper="",computed=0;
function Calculator(){
    const [cmp,set_cmp]=useState(0);
    const [ops,set_op]=useState("");
    const [inp,set_inp] = useState("0");
    function inp_val(nx_inp){
        if(cmp){
            set_op('');
            set_cmp(0);
            set_inp(nx_inp);
        }
        else{
            if(inp == 0 || inp =="ERROR"){
                set_inp(nx_inp);
            }
            else if(inp.length <=16){
                set_inp(inp + nx_inp);
            }
        }
    }
    function clr_inp(){
        set_inp('0');
    }
    function clr(){
        set_inp('0');
        set_op('');
        expr="";
    }
    function change_sign(){
        if(inp!=0){
            let temp = Number.parseInt(inp);
            temp = -temp;
            temp = temp.toString();
            set_inp(temp);
        }
    }
    function operate(op){
        oper = op;
        if(op=='add'){
            set_op(ops+inp+" + ");
            expr+=inp+" + ";
        }
        else if(op=='sub'){
            set_op(ops+inp+" - ");
            expr+=inp+" - ";
        }
        else if(op=='mul'){
            set_op(ops+inp+" * ");
            expr+=inp+" * ";
        }
        else if(op=='div'){
            set_op(ops+inp+" / ");
            expr+=inp+" / ";
        }
        set_inp('0');
    }
    function compute(){
        expr += inp;
        let result = eval(expr);
        if(oper==""){
            set_inp(inp);
        }
        else if(oper=="add"||oper=="sub"||oper=="mul"||oper=="div"){
            if(inp==0 && oper=="div"){
                set_inp("ERROR");
            }
            else{
                set_inp(result);
            }
            set_op(ops+inp+" =");
        }
        else{
            set_inp(result);
            set_op(ops+" =");
        }
        expr="";
        set_cmp(1);
    }
    function inv(){
        oper="inv";
        set_op(ops+" 1/"+inp);
        if(inp == '0' || inp == "ERR"){
            set_inp("ERROR");
        }
        else{
            let result= 1/parseFloat(inp);
            result = result.toString();
            set_inp(result);
        }
    }
    function square(){
        oper="sqr";
        let temp = parseFloat(inp);
        let result = temp*temp;
        result = result.toString();
        set_op(ops+"sqr("+inp+") ");
        set_inp(result);
    }
    function sq_root(){
        oper="sqrt";
        let result= Math.sqrt(parseFloat(inp));
        result = result.toString();
        set_op(ops+"sqrt("+inp+")");
        set_inp(result);
    }
    function rem_ld(){
        if(inp!="0"){
            if(inp.length==1){
                set_inp("0");
            }
            else{
                set_inp(inp.substring(0,inp.length-1));
            }
        }
    }
    return(
        <div className="content-div">
            <div className="calculator">
                <div className="user-display">
                    <p className="op-str">{ops}</p>
                    <p className="input">{inp}</p>
                </div>
                <div className="buttons">
                    <div className="btn">
                    <button>%</button>
                    <button onClick={clr_inp}>CE</button>
                    <button onClick={clr}>C</button>
                    <button onClick={rem_ld}><i class="fa-solid fa-delete-left"></i></button>
                    </div>
                    <div className="btn">
                    <button onClick={inv}>1/x</button>
                    <button onClick={square}>x²</button>
                    <button onClick={sq_root}>√x</button>
                    <button onClick={()=>{operate('div')}}><i class="fa-solid fa-divide"></i></button>
                    </div>
                    <div className="btn">
                    <button onClick={()=>{inp_val('7')}}>7</button>
                    <button onClick={()=>{inp_val('8')}}>8</button>
                    <button onClick={()=>{inp_val('9')}}>9</button>
                    <button onClick={()=>{operate('mul')}}><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="btn">
                    <button onClick={()=>{inp_val('4')}}>4</button>
                    <button onClick={()=>{inp_val('5')}}>5</button>
                    <button onClick={()=>{inp_val('6')}}>6</button>
                    <button onClick={()=>{operate('sub')}}><i class="fa-solid fa-minus"></i></button>
                    </div>
                    <div className="btn">
                    <button onClick={()=>{inp_val('1')}}>1</button>
                    <button onClick={()=>{inp_val('2')}}>2</button>
                    <button onClick={()=>{inp_val('3')}}>3</button>
                    <button onClick={()=>{operate('add')}}><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div className="btn">
                    <button onClick={change_sign}><i class="fa-solid fa-plus-minus"></i></button>
                    <button onClick={()=>{inp_val('0')}}>0</button>
                    <button onClick={()=>{inp_val('.')}}>.</button>
                    <button onClick={compute}><i class="fa-solid fa-equals"></i></button>
                    </div>
                </div>
            </div>
            {/* <div className="history-block">
               <p>History</p>

            </div>  */}
        </div>
    );
}

export default Calculator;
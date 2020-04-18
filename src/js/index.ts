import axios, {
    AxiosResponse, AxiosError
}from "../../node_modules/axios/index";

interface IRecord{
    title:string;
    artist:string;
    releaseYear:number;
}

let output: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let showAllBtn: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllRecords");
let showBySearchInput: HTMLInputElement = <HTMLInputElement> document.getElementById("getBySearchInput");
let addRecordBtn: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addBtn");
let clearAllBtn: HTMLButtonElement = <HTMLButtonElement> document.getElementById("clearAllRecords");
let outputData:string;

showAllBtn.addEventListener("click", showAllFunc);
showBySearchInput.addEventListener("change", showBySearch);
addRecordBtn.addEventListener("click", addRecordFunc);
clearAllBtn.addEventListener("click", clearAllFunc);


function showAllFunc():void{
    axios.get<IRecord[]>("https://restdrrecordstimm.azurewebsites.net/api/records")
    .then ((response:AxiosResponse<IRecord[]>)=>{
        console.log(response.data);
        output.innerHTML = makeOutput(response.data);
    })
    .catch((error:AxiosError)=>{
    output.innerHTML = error.message;
    });
}

function showBySearch():void{
    axios.get<IRecord[]>("https://restdrrecordstimm.azurewebsites.net/api/records")
    .then ((response:AxiosResponse<IRecord[]>)=>{
        response.data.forEach(record =>{
            if(record.artist == showBySearchInput.value)
            {
                console.log(record.artist);
                output.innerHTML = record.artist;
            }
            else if(record.releaseYear == parseFloat(showBySearchInput.value))
            {
                console.log(record.releaseYear);
                output.innerHTML = record.releaseYear.toString();
            }
            else if(record.title == showBySearchInput.value)
            {
                console.log(record.title);
                output.innerHTML = record.title;
            }
        })
    });   
}

function addRecordFunc(){
    console.log("Tilføj Record");
}

function makeOutput(data: IRecord[]):string{
    
    outputData+="<table>";
        outputData+="<thead>";
            outputData+="<th>Title</th>";
            outputData+="<th>Artist</th>";
            outputData+="<th>Release Year</th>";
        outputData+="</thead>";
            data.forEach(record=>{
                outputData+="<tr>";
                    outputData+="<td>" + record.title + "</td>";
                    outputData+="<td>" + record.artist + "</td>";
                    outputData+="<td>" + record.releaseYear + "</td>";
                outputData+="</tr>";
            })
        
    outputData+="</table>";
    
    return outputData;
}



function clearAllFunc():void{
    while(output.firstChild)
        output.removeChild(output.firstChild);
}

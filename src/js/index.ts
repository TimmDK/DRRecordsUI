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
let clearAllBtn: HTMLButtonElement = <HTMLButtonElement> document.getElementById("clearAllRecords");

showAllBtn.addEventListener("click", showAllFunc);
clearAllBtn.addEventListener("click", clearAllFunc);


axios.get<IRecord[]>("https://restdrrecords20200326114202.azurewebsites.net/api/records")
.then ((response:AxiosResponse<IRecord[]>)=>{
    console.log(response.data);
    output.innerHTML = makeOutput(response.data);
})
.catch((error:AxiosError)=>{
    output.innerHTML = error.message;
});

function makeOutput(data: IRecord[]):string{
    let outputData:string;
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

function showAllFunc():void{
    output.style.display = "inline";
}

function clearAllFunc():void{
    output.style.display = "none";
}

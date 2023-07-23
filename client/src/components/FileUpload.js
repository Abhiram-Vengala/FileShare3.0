import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const Fileupload=({contract,account,provider})=>{
    const [file,setFile]=useState(null);
    const [fileName,setFileName]=useState("No Image");
    const handleSubmit=async(e)=>{
        if(file){
            e.preventDefault();
            try{
                const formData = new FormData();
                formData.append("file",file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `Enter Api Key`,
                      pinata_secret_api_key: `Enter ypur secret api key`,
                      "Content-Type": "multipart/form-data",
                    },
                  });
                  
                  const ImgHash=`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;  
                  const signer = contract.connect(provider.getSigner());
                  await signer.add(account, ImgHash); 
                 alert("Image Uploaded Successfully");
                 setFileName("No Image");
                 setFile(null);
            }catch(e){
                alert("Unable to upload an Image!!!");
            }
        }
    };
    const retrevierfile=(e)=>{
        const data = e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=>{
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();     
    };
    return<div className="top">
        <form onClick={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
                Choose Image :
            </label>
            <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrevierfile}></input>
            <span className="textArea">Image :{fileName}</span>
            <button type="submit" className="upload" disabled={!file}>Upload file</button>
        </form>
    </div>
};
export default Fileupload;
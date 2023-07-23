import { useEffect } from "react";
import './Model.css';

const NewModel=({setNewModelOpen,contract})=>{
    const sharing=async()=>{
        const address=document.querySelector(".address").value;
        await  contract.allow(address);
    };
    useEffect(()=>{
        const accessList = async()=>{
            const addressList = await contract.shareAccess();
            let select = document.querySelector("#SelectNum");
            const options = addressList;
            for(let i=0;i<options.length;i++){
                let opt = options[i];
                const e1 = document.createElement("option");
                e1.text=opt;
                e1.value=opt;
                select.appendChild(e1);
            }
        };
        contract && accessList();
    },[]);
    return<>
    <div className="ModBg">
        <div className="Modalcontainer">
            <div className="shareWith">Share With</div>
            <input className="address" placeholder="Enter Address"></input>
            <form id="Myform">
                <select id="SelectNum">
                    <option className="address">People With Access</option>
                </select>
            </form>
            <div className="footer">
                <button onClick={()=>{setNewModelOpen(false);}} id="cncelbt">Cancel</button>
                <button onClick={()=>sharing()} id="cncelbt">Share</button>
            </div>
        </div>
    </div>
    </>
};
export default NewModel;

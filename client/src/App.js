import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {useState,useEffect} from "react";
import { ethers } from "ethers";
import Fileupload from "./components/FileUpload";
import Display from "./components/Display";
import NewModel from "./components/NewModel";
import './App.css';

function App() {
  const [account,setAccount]=useState("");
  const [contract,setContract]=useState(null);
  const [provider,setProvider]=useState(null);
  const [NewModelOpen,setNewModelOpen]=useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider=async()=>{
      if(provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        });
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,Upload.abi,signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      }else{
        console.log("Metamask is not installed");
      }
    };
    provider && loadProvider();
  },[]);
  return (
    <>
    <div className="cont">
    <div className="App">
      <h1>File Share 3.0</h1>
      <p>Account :{ account ? account:"Account Not Connect"} </p>
      <Fileupload account={account} contract={contract} provider={provider}></Fileupload>
      <Display account={account} contract={contract}/>
    </div>
    {!NewModelOpen&&(<button className="share" onClick={()=>setNewModelOpen(true)}>Share</button>)}{" "}
    {NewModelOpen &&(<NewModel setNewModelOpen={setNewModelOpen} contract={contract}></NewModel>)}
    </div>
    </>
  );
}

export default App;

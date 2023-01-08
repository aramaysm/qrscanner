import CryptoJS from "crypto-js";
import Services from "../Services";
import axios from "axios";
import Client_Entity from "./Client_Entity";

export default class Protocol_Controller {
  _urlServer = null;
  _username = "";
  _password = "";
  _protocol = {};
  _resultPhase0={};
  _resultPhase1={};
  _resultPhase2={};
  _resultPhase3={};
  _infoPhase1={};
  _infoPhase2={};
  _infoPhase3={};

  constructor() {}

  /*** Just need the username, the password in plain text and the 
   * url of the login of the API 
   * Example: ExecuteProtocol(user1, secret1234, https://localhost:5001/api/auth/login/)
   * */
  async ExecuteProtocol(username, password, urlServer, isDevice) {
    let isSuccessful = false;
    this._urlServer = urlServer;
    this._username = username;
    this._password = password;
    this._resultPhase0 = await this.phase0(isDevice);
    let responseFinal={};
    while (isSuccessful === false) {
      let response_Phase1 = await this.phase1();  
      this._resultPhase1 = response_Phase1;  
      let response_Phase2 = await this.phase3(response_Phase1.data.data);
      this._resultPhase2 = response_Phase2;
      isSuccessful = response_Phase2.data.data.finished;
      responseFinal= response_Phase2;
    }
    return responseFinal;    
  }

  async phase0(isDevice) {
    
    const hashPass = CryptoJS.SHA256(this._password).toString();

    if(!isDevice)
    this._password = hashPass;

    this._protocol = new Client_Entity({
      url_server: this._urlServer,
      password: this._password,
      username: this._username,
    });


    let phase0_toServer = await axios.post(
      this._urlServer,
      {
        username: this._username        
      },
      Services.getAxiosConfig("")
    );
     await this._protocol.phase_0(phase0_toServer.data.data, this._password);
     
     console.log("Phase 0: ", phase0_toServer.data.data);

     return phase0_toServer;
  }

  phase1 = async () => {
   
    let dataToTransfer = this._protocol.phase_1();
    
   
    return dataToTransfer.then((data)=>{
      this._infoPhase1 = data;
      return  axios.post(
        this._urlServer + "1",
        data,
        Services.getAxiosConfig("")
      );
    })
    
    
  };

  phase3 = async (responseBefore) => {

    let dataToTransfer = this._protocol.phase_2(responseBefore);
    
    console.log("Response:",dataToTransfer);

    return dataToTransfer.then((data)=>{
      this._infoPhase3 = data;
      return  axios.post(
        this._urlServer + "3",
        data,
        Services.getAxiosConfig("")
      );
    })
    
  };

  ShowInfo(){
    return {
      phase0_from_Server: this._resultPhase0.data,
      phase1_from_Server: this._resultPhase1.data,
      phase2_from_Server: this._resultPhase2.data,
      phase3_from_Server: this._resultPhase3.data,
      infoPhase1_to_Server: this._infoPhase1,
      infoPhase3_to_Server: this._infoPhase3
    }
  }
}

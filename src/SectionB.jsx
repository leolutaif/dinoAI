import React from "react";
import "./SectionB.css"

function SectionB(){
    return(
        <div className="window98-container">
      <div className="window98-title-bar">
        <div className="window98-title">System Properties</div>
        <button className="close-btn">X</button>
      </div>
      <div className="window98-tabs">
        <button className="tab active">General</button>
        <a href="https://x.com/NoInternetADino" target="_blank" rel="noopener noreferrer" className="tab">
          Twitter
        </a>
        <a href="https://t.me/nointernetgameai" target="_blank" rel="noopener noreferrer" className="tab">
          Telegram
        </a>
        <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="tab">
          Pump.fun
        </a>
      </div>
      <div className="window98-content">
        <div className="content-box">
          <strong>System:</strong>
          <p>Microsoft Windows 98<br />Second Edition<br />4.10.2222 A</p>
        </div>
        <div className="content-box">
          <strong>Registered to:</strong>
          <p>Steve<br />25614-OEM-0070142-46964</p>
        </div>
        <div className="content-box">
          <strong>Computer:</strong>
          <p>GenuineIntel<br />Pentium(r) II Processor<br />64.0MB RAM</p>
        </div>
      </div>
      <div className="window98-footer">
        <button className="footer-btn">OK</button>
        <button className="footer-btn">Cancel</button>
      </div>
    </div>
  );
}


export default SectionB 
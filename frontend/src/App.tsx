import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import RingBell from "./Components/RingBell";

const baseURL = `http://${window.location.hostname}:3001/`;
const qrCodeValue = `http://${window.location.hostname}:5173/?page=ringbell`;
let count1 = 0;
let audioInstance: HTMLAudioElement | null = null;
const App: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const [ringbutton, setRingButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  
  const playAudio = () => {
    if (audioInstance) {
      console.log("Stopping previous audio...");
      audioInstance.pause();
      audioInstance.currentTime = 0; 
    }
    setIsAnimating(false);
    setTimeout(() => {
      audioInstance = new Audio("dingdong.mp3");
      audioInstance.play().catch((error) => console.log("Autoplay blocked:", error));
      setIsAnimating(true);
    }, 20); 

  };
  const checkBellStatus = async () => {
    try {
      const response = await fetch(`${baseURL}bellstatus?count=${count1}`);
      const data = await response.json();
      console.log(data);
      
      console.log(data.isBellRung, data.count);

      if (data.isBellRung && page !== "ringbell" && ringbutton) {
        playAudio();
      }
      count1 = data.count;
      checkBellStatus();
    } catch (error) {
      console.error("Error fetching bell status:", error);
      checkBellStatus();
    }
  };

  useEffect(() => {
    checkBellStatus();
  }, [ringbutton]);

  const handleEnableQrCode = () => {
    setRingButton(true);
  };

  if (page === "ringbell") {
    console.log("ringbell");
    return <RingBell />;
  }

  return (
    <div>
      {ringbutton ? (
        <div className="flex items-center">
          <div className="flex flex-col ">
            <h1>Scan the QR Code</h1>
            <QRCode value={qrCodeValue} size={200} />
            <br />
            <br />
            <button
              onClick={() => {
                setRingButton(false);
              }}
            >
              disable
            </button> 
          </div>
          <div className={`boxstyle ${isAnimating ? "bell-active" : ""}`}></div>
        </div>
      ) : (
        <button onClick={handleEnableQrCode}>Enable Qr Code</button>
      )}
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import RingBell from "./Components/RingBell";

const baseURL = `http://${window.location.hostname}:3001/`;
const qrCodeValue = `http://${window.location.hostname}:5173/?page=ringbell`;
let count1 = 0;
const App: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const [ringbutton, setRingButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const playAudio = () => {
    const audio = new Audio("bell.mp3");
    audio.play().catch((error) => console.log("Autoplay blocked:", error));
    setIsAnimating(true);
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      setIsAnimating(false);
    }, 2000);
  };

  const checkBellStatus = async () => {
    try {
      const response = await fetch(`${baseURL}bellstatus?count=${count1}`);
      const data = await response.json();
      console.log(data.isBellRung, data.count);

      if (
        data.isBellRung &&
        page !== "ringbell" &&
        ringbutton
      ) {
        playAudio();
      }
      count1 = data.count;

      const timeoutId = setTimeout(checkBellStatus, 1000);
      return () => clearTimeout(timeoutId);
    
    
    } catch (error) {

      console.error("Error fetching bell status:", error);
      const timeoutId = setTimeout(checkBellStatus, 1000);
      return () => clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    checkBellStatus();
  }, [ringbutton]);

  const handleEnableQrCode = () => {
    setRingButton(true);
    // localStorage.setItem("ringbutton", "true");
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
            <button
              onClick={() => {
                setRingButton(false);
                // localStorage.setItem("ringbutton", "false");
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

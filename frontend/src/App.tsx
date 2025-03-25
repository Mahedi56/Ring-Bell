import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import RingBell from "./Components/RingBell";

const baseURL = `http://${window.location.hostname}:3001/`;
const qrCodeValue = `http://${window.location.hostname}:5173/?page=ringbell`;

const App: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  const countRef = useRef<number>(0);
  const [ringbutton, setRingButton] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const playAudio = () => {
    const audio = new Audio("bell.mp3");
    audio.play().catch((error) => console.log("Autoplay blocked:", error));

    setAnimationKey(prev => prev + 1);
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      // setIsAnimating(false);
    }, 2000);
  };

  const checkBellStatus = async () => {
    try {
      const response = await fetch(`${baseURL}bellstatus`);
      const { count } = await response.json();
 
      if (count > countRef.current) { 
        countRef.current = count;
        if (page !== "ringbell") {
          playAudio();
        }
      }
    } catch (error) {
      console.error("Error fetching bell status:", error);
    }

    // Add delay before next check
    checkBellStatus();
  };

  useEffect(() => {
    checkBellStatus();
  }, [ringbutton]);

  const handleEnableQrCode = () => {
    setRingButton(true);
  };

  if (page === "ringbell") {
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
          <div key={animationKey} className={`boxstyle bell-active`}></div>
        </div>
      ) : (
        <button onClick={handleEnableQrCode}>Enable Qr Code</button>
      )}
    </div>
  );
};

export default App;

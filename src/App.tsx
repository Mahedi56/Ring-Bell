// import { useEffect } from "react";
// import QRCode from "react-qr-code";
// import RingBell from "./Components/RingBell";

// const baseURL = `http://${window.location.hostname}:3001/`;
// const qrCodeValue = `http://${window.location.hostname}:5173/?page=ringbell`;

// const App: React.FC = () => {
//   // const [ringBell, setRingBell] = useState(false);
  
//   const params = new URLSearchParams(window.location.search);
//   const page = params.get("page");

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const response = await fetch(`${baseURL}bellstatus`);  
//         const data = await response.json();
//         // setRingBell(data.isBellRung); 
//         console.log(data.isBellRung,data.count);
//         const playAudio = () => {
//           const audio = new Audio("ramadan.mp3"); 
//           audio.play().catch(error => console.log("Autoplay blocked:", error));
//         };
//         if(data.isBellRung){
//           playAudio();
//         }
//       } catch (error) {
//         console.error("Error fetching bell status:", error);
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   if (page === "ringbell") {
//     console.log("ringbell");
//     return <RingBell  />;
//   }

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h1 className="text-2xl mb-4">Scan the QR Code</h1>
//       <QRCode value={qrCodeValue} size={200} />
//       <br />
//       {/* {ringBell && (
//         <div>
//           <h1>Audio: Ramadan</h1>
//           <audio controls autoPlay>
//             <source src="ramadan.mp3" type="audio/mp3" />
//             Audio is not supported.
//           </audio>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default App;

import { useEffect } from "react";
import QRCode from "react-qr-code";
import RingBell from "./Components/RingBell";

const baseURL = `http://${window.location.hostname}:3001/`;
const qrCodeValue = `http://${window.location.hostname}:5173/?page=ringbell`;
let count1=0;
const App: React.FC = () => {

  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${baseURL}bellstatus?count=${count1}`);  
        const data = await response.json();
        console.log(data.isBellRung, data.count);
        
        const playAudio = () => {
          const audio = new Audio("dingdong.mp3");
          audio.play().catch(error => console.log("Autoplay blocked:", error));
        };

        if (data.isBellRung && count1!=data.count) {
          playAudio();
        }
        count1=data.count;
      } catch (error) {
        console.error("Error fetching bell status:", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []); 


  if (page === "ringbell") {
    console.log("ringbell");
    return <RingBell />;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4">Scan the QR Code</h1>
      <QRCode value={qrCodeValue} size={200} />
    </div>
  );
};

export default App;

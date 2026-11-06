import { useState } from "react";
import LoginScreen from "./src/screens/LoginScreen";
import TrackerScreen from "./src/screens/TrackerScreen";

// App.tsx only decides which screen to show.
// Login UI lives in src/screens/LoginScreen.tsx, camera UI in src/screens/TrackerScreen.tsx.
export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  if (signedIn) {
    return <TrackerScreen onBack={() => setSignedIn(false)} />;
  }

  return <LoginScreen onSignedIn={() => setSignedIn(true)} />;
}

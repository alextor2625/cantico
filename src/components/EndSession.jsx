import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { endSession, getActiveSession } from "../services/session.service";
import TimerSession from "./TimerSession";
import { useSongs } from "../context/Songs.context";

const EndSession = () => {
  const { seconds } = useSongs(); // Obtener los segundos desde el contexto
  const [activeSession, setActiveSession] = useState(null);

  const handleEndSession = async () => {
    try {
      const sessionData = await getActiveSession();
      if (sessionData && sessionData.session) {
        setActiveSession(sessionData.session);
        const updatedSession = await endSession(
          sessionData.session._id,
          seconds
        );
        console.log("Session ended with updated duration:", updatedSession);
        window.location.reload(false);
      }
    } catch (error) {
      console.error("Error ending the session:", error);
    }
  };

  return (
    <div className="timer-flex">
      <TimerSession />

      <Button
        variant="danger"
        className="end-session"
        onClick={handleEndSession}
      >
        End Session
      </Button>
    </div>
  );
};

export default EndSession;
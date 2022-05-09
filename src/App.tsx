import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {Dashboard} from "./components/Dashboard/Dashboard";
import {NamesEnum} from "./redux/data";
import {setOthers} from "./redux/appSlice";
import {client, ROOM_NAME} from "./config";
import {Room} from "@liveblocks/client";

export const RoomContext = React.createContext<Room | null>(null);

function App() {
  const room = client.enter(ROOM_NAME);
  const dispatch = useDispatch();
  const unsubscribe = room.subscribe("others", (others) => {
    dispatch(setOthers(others.toArray()));
  });

  useEffect(() => {
    const othersNames = room.getOthers().toArray().map(other => other.presence?.name) || [];
    const newName = Object.keys(NamesEnum).find(name => !othersNames.includes(name));
    room.updatePresence({name: newName});

    return () => {
      client.leave(ROOM_NAME);
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <RoomContext.Provider value={room}>
        <Dashboard />
      </RoomContext.Provider>
    </div>
  );
}

export default App;

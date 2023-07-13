
import Input from "./room/input";
import Chat from "./room/chat";
import Result from "./room/result";
import EndPage from "./room/end";

function Room(props) {
  const { roomID, setRoomID } = props;

  const pages = {
    "input": <Input setRoomID={setRoomID}/>,
    "chat": <Chat setRoomID={setRoomID}/>,
    "result": <Result setRoomID={setRoomID}/>,
    "end": <EndPage setRoomID={setRoomID}/>
  };

  return(
        <div>
          {pages[roomID] ? pages[roomID] : <div>404</div>}
        </div>
    )
}

export default Room;
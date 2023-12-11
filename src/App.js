import React, { useState } from 'react';
import './App.scss';
import { sendMsg, getTime, getQueryString } from './utils';

const ROLES = {
   AHRI: 'Ahri',
   GUEST: getQueryString('role') || 'Guest',
}

const ROLESDARA = {
  'meng': "你要跟我聊会吗",
}

console.log(ROLESDARA, ROLES.GUEST);
function App() {
  const initialState = {
    msg: '',
    msgArr: [{
      role: ROLES.AHRI,
      data: ROLESDARA[ROLES.GUEST] || '我是Ahri,跟我聊天吧',
      time: getTime(),
    }],
  };
  const [state, setState] = useState(initialState);

  const { msg, msgArr } = state;

  return (
    <div className="App">
      <div className="chat">
      <div className="chat-header clearfix">
        <img src="https://shannuo.github.io/assets/img/blog-author.jpg" alt="avatar" />
        
        <div className="chat-about">
          <div className="chat-with">Chat with Ahri</div>
        </div>
        <i className="fa fa-star"></i>
      </div>
      
      <div className="chat-history" id="chat-history">
        <ul>
          {
            msgArr.map((item, index) => {
              if (item.role !== ROLES.AHRI) {
                return (
                  <li className="clearfix" key={`${item.time}${index}`}>
                    <div className="message-data align-right">
                      <span className="message-data-time" >{item.time}</span> &nbsp; &nbsp;
                      <span className="message-data-name">{item.role}</span> <i className="fa fa-circle me"></i>   
                    </div>
                    <div className="message other-message float-right">
                      {item.data}
                    </div>
                  </li>
                );
              }

              return (
                <li key={`${item.time}${index}`}>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i>{item.role}</span>
                  <span className="message-data-time">{item.time}</span>
                </div>
                <div className="message my-message">
                  {item.data}
                </div>
              </li>
              );
            })
          }
        </ul>
        
      </div>
      
      <div className="chat-message clearfix">
        <textarea
          name="message-to-send"
          id="message-to-send"
          placeholder ="Type your message"
          rows="3"
          onChange={e => setState({ ...state, msg: e.target.value })}
          value={msg}
        />
                
        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
        
        <button onClick={async () => {
            const sendedMsg = {
              role: ROLES.GUEST,
              data: msg,
              time: getTime(),
            };
            setState({ ...state, msg: '', msgArr: [...msgArr, sendedMsg] });
            const res = await sendMsg(state.msg);
            setState(newState => ({
              ...newState,
              msgArr: [...newState.msgArr, {
                role: ROLES.AHRI,
                data: res,
                time: getTime(),
              }]
            }));
            const historyElm = document.getElementById('chat-history');
            historyElm.scrollTop = historyElm.scrollHeight;
          }}
        >Send</button>

      </div>

      </div>
    </div>
  );
}

export default App;

// // Chat.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import Header from './Header';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// const STORAGE_KEY = 'chat_messages';

// export default function Chat() {
//   const [messages, setMessages] = useState(() => {
//     try {
//       const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
//       return saved && saved.length
//         ? saved
//         : [{ sender: 'bot', text: 'Hello! How can I help you today?' }];
//     } catch {
//       return [{ sender: 'bot', text: 'Hello! How can I help you today?' }];
//     }
//   });
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//     }
//     const toSave = messages.filter(msg => !msg.loading);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
//   }, [messages]);

//   const handleSend = async () => {
//     const text = input.trim();
//     if (!text) return;

//     const userMsg = { sender: 'user', text };
//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setLoading(true);

//     setMessages(prev => [...prev, { sender: 'bot', text: '', loading: true }]);

//     try {
//       const history = messages
//         .filter(msg => !msg.loading)
//         .map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }));
//       history.push({ role: 'user', content: text });

//       const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`
//         },
//         body: JSON.stringify({ model: 'deepseek/deepseek-r1:free', messages: history })
//       });
//       const data = await res.json();

//       setMessages(prev => prev.filter(msg => !msg.loading));

//       if (!res.ok) {
//         const err = data.error?.message || `Status ${res.status}`;
//         setMessages(prev => [...prev, { sender: 'bot', text: `Error: ${err}` }]);
//       } else {
//         const reply = data.choices?.[0]?.message?.content?.trim() || '🤔 (no content)';
//         setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
//       }
//     } catch (error) {
//       setMessages(prev => prev.filter(msg => !msg.loading));
//       setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting DeepSeek API.' }]);
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-2xl h-[100vh] bg-black  overflow-hidden shadow-xl mx-auto border border-gray-700">
//       <Header />

//       <main ref={containerRef} className="flex flex-col flex-1 overflow-y-auto p-4 space-y-3 bg-black">
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div
//               className={` py-2 rounded-2xl border text-sm leading-relaxed max-w-[80%] shadow-lg
//               ${msg.sender === 'user' ? 'bg-gradient-to-tr from-[#2d2d2dc8] to-[#3e3e3ec7] text-white border-gray-900 px-4' : 'bg-[#27272700] text-gray-300 border-black px-1'}`}
//             >
//               {msg.loading ? (
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="w-4 h-4 animate-spin text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
//                   </svg>
//                   <span>Loading...</span>
//                 </div>
//               ) : (
//                 msg.text
//               )}
//             </div>
//           </div>
//         ))}
//       </main>

//       <footer className="fixed w-full bottom-0 left-0 flex p-4 gap-2 bg-black border-t border-gray-700">
//         <input
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => e.key === 'Enter' && handleSend()}
//           placeholder="Type your message..."
//           className="flex-1 bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={loading}
//         />
//         <button
//           onClick={handleSend}
//           disabled={loading}
//           className="bg-white text-black w-10 h-10 rounded-full hover:from-blue-700 hover:to-blue-600 disabled:opacity-50"
//         >
//           <FontAwesomeIcon icon={faPaperPlane}/>
//         </button>
//       </footer>
//     </div>
//   );
// }

// the above codes is abouthe previuse version of component a little slow









import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'chat_messages';
const reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

export default function Chat() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved && saved.length
        ? saved
        : [{ sender: 'bot', text: 'Hello! How can I help you today?' }];
    } catch {
      return [{ sender: 'bot', text: 'Hello! How can I help you today?' }];
    }
  });

  const messagesRef = useRef(messages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMsgIndex, setSelectedMsgIndex] = useState(null);
  const [reactionPopupIndex, setReactionPopupIndex] = useState(null);
  const longPressTimeout = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    messagesRef.current = messages;
    const toSave = messages.filter(msg => !msg.loading);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setMessages(prev => [...prev, { sender: 'bot', text: '', loading: true }]);

    try {
      const cleanHistory = messagesRef.current
        .filter(msg => !msg.loading)
        .slice(-8)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      cleanHistory.push({ role: 'user', content: text });

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: cleanHistory
        })
      });

      const data = await res.json();
      setMessages(prev => prev.filter(msg => !msg.loading));

      if (!res.ok) {
        const err = data.error?.message || `Status ${res.status}`;
        setMessages(prev => [...prev, { sender: 'bot', text: `Error: ${err}` }]);
      } else {
        const reply = data.choices?.[0]?.message?.content?.trim() || '🤔 (no content)';
        setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      }
    } catch (error) {
      setMessages(prev => prev.filter(msg => !msg.loading));
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting DeepSeek API.' }]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
    setSelectedMsgIndex(null);
  };

  const handleReaction = (index, emoji) => {
    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[index].reaction = emoji; // Replace existing with new
      return newMessages;
    });
    setReactionPopupIndex(null);
  };

  const handleLongPressStart = (index) => {
    longPressTimeout.current = setTimeout(() => {
      setReactionPopupIndex(index);
    }, 2000);
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl h-[100vh] bg-black overflow-hidden shadow-xl mx-auto border border-gray-700 relative">
      <Header />
      <main ref={containerRef} className="flex flex-col flex-1 overflow-y-auto p-4 space-y-3 bg-black relative">
        {messages.map((msg, i) => (
          <div key={i} className={`flex relative ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              onClick={() => setSelectedMsgIndex(selectedMsgIndex === i ? null : i)}
              onTouchStart={() => handleLongPressStart(i)}
              onTouchEnd={handleLongPressEnd}
              onMouseDown={() => handleLongPressStart(i)}
              onMouseUp={handleLongPressEnd}
              className={`relative py-2 rounded-2xl border text-lg leading-relaxed max-w-[80%] shadow-lg cursor-pointer
                ${msg.sender === 'user'
                  ? 'bg-gradient-to-tr from-[#2d2d2dc8] to-[#3e3e3ec7] text-white border-gray-900 px-4'
                  : 'bg-[#27272700] text-gray-300 border-black px-1'}`}
            >
              {msg.loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  <div>{msg.text}</div>
                  {msg.reaction && (
                    <div className="mt-1 text-xl">{msg.reaction}</div>
                  )}
                </>
              )}

              {/* Delete Popup */}
              <AnimatePresence>
  {selectedMsgIndex === i && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -5 }}
      className={`absolute top-full mt-1 z-10 bg-gray-800 text-red-400 px-3 py-1 rounded-md border border-[#ff3e3e76] shadow
        ${msg.sender === 'user' ? 'right-0' : 'left-0'}`}
    >
      <button onClick={() => handleDelete(i)}>Delete</button>
    </motion.div>
  )}
</AnimatePresence>


              {/* Reaction Popup */}
              <AnimatePresence>
                {reactionPopupIndex === i && (
                 <motion.div
  initial={{ opacity: 0, scale: 0.9, y: -10 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.9, y: -10 }}
  className={`absolute top-[-55px] z-10 px-3 py-2 rounded-xl shadow flex gap-2 border border-gray-700 text-black
    ${msg.sender === 'user' ? 'right-0' : 'left-0'}`}
>
  {reactionEmojis.map((emoji, idx) => (
    <button
      key={idx}
      onClick={() => handleReaction(i, emoji)}
      className="text-xl hover:scale-125 transition-transform"
    >
      {emoji}
    </button>
  ))}
</motion.div>

                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
        <div className="h-24"></div>
      </main>

      <footer className="fixed w-full bottom-0 left-0 flex p-4 gap-2 bg-black border-t border-gray-700">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-white text-black w-10 h-10 rounded-full active:bg-gray-200 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </footer>
    </div>
  );
}

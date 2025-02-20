import React, { useState, useEffect, useContext } from "react";
import { SunMedium, Mic, Image, Send, User } from "lucide-react";
import { MessageCircle, MessageSquare } from "lucide-react";
import { Context } from "../context/Context";

const Mainc = ({ extended, setExtended, logOutHandler,photo,userName }) => {
  const {
    onSent,
    recentPrompt,
    showResult,
    resultData,
    setInput,
    input,
    loading,
  } = useContext(Context);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setExtended(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [setExtended]);

  return (
    <div
      className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${
        extended ? "md:ml-64" : "ml-20"
      }`}
    >
      {/* Header */}
      <header className="p-4 shadow-md flex justify-between items-center border-gray-700 sticky top-0 bg-[#161618]">
        <h1 className="text-lg font-semibold">
          Gemini <span className="text-sm opacity-50">2.0 Flash</span>
        </h1>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md bg-[#2A2A2B] hover:bg-[#3A3A3B] transition duration-200">
          <User className="w-9 h-9 text-gray-400 hover:text-white transition duration-300" />
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition duration-200"
            onClick={logOutHandler}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main
        className={`flex-1 overflow-y-auto scrollbar-hide pl-10 pt-6 pr-4 ${
          !showResult ? " flex  justify-center items-center" : ""
        }`}
      >
        {!showResult ? (
          <h2 className=" md:text-5xl  text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#EA80FC]">
            👋 Hey {userName}!
            <br />
            How Can I help you today?
          </h2>
        ) : (
          <div className="space-y-4">
            {/* User Message */}
            <div className="flex items-center gap-3 p-3 bg-[#2A2A2B] rounded-lg max-w-lg">
              <User className="w-8 h-8 text-blue-400" />
              <p className="text-white">{recentPrompt}</p>
            </div>

            {/* AI Response with Typing Animation */}
            <div className="flex items-start gap-3 p-3 bg-[#1F1F1F] rounded-lg w-auto">
              <img
                src="https://miro.medium.com/v2/resize:fit:400/1*-xb7cKgxlETNml550rqvYA.jpeg"
                className="w-10 h-10 rounded-2xl shrink-0"
                alt="Gemini AI"
              />
              {loading ? (
                <div className="flex space-x-1  ">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              ) : (
                <>
                  <p
                    className="text-white flex-1"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  ></p>

                  {/* <div>"It was great chatting with you! Let me know if you need anything else. 😊"</div> */}
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Input Field */}
      <footer className="flex flex-col items-center rounded-lg mx-4 my-1 bg-[#161618] sticky bottom-0 left-0 right-0 ">
        <div className="relative w-full">
          <div className="flex items-center bg-[#2A2A2B] rounded-full border border-gray-600 px-4 w-full">
            {/* Input Field */}
            <input
              type="text"
              className="w-full p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Ask Gemini..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents the default Enter behavior
                  if (input.trim()) {
                    onSent({}); // Call the onSent function
                  }
                }
              }}
            />
            {/* Icons Outside Input but Inside the Div */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white">
                <Image className="w-5 h-5" />
              </button>

              {input.trim() ? (
                <button
                  className="p-2 text-gray-400 hover:text-white"
                  onClick={onSent}
                >
                  <Send className="w-5 h-5" />
                </button>
              ) : (
                <button className="p-2 text-gray-400 hover:text-white">
                  <Mic className="w-5 h-5" />
                </button>
              )}
              {/* <button
                className="p-2 text-gray-400 hover:text-white"
                onClick={onSent}
              >
                <Send className="w-5 h-5" />
              </button> */}
            </div>
          </div>
        </div>

        {/* Disclaimer Message */}
        {/* Disclaimer Message */}
        <p className="text-[10px] text-gray-500 ">
          ⚠️ Gemini can make mistakes. Check important info.
        </p>
      </footer>

      {/* Typing Dots Animation Style */}
      <style>
        {`
          .dot {
            width: 8px;
            height: 8px;
            background-color: #aaa;
            border-radius: 50%;
            display: inline-block;
            animation: bounce 1.5s infinite ease-in-out;
          }

          .dot:nth-child(1) {
            animation-delay: 0s;
          }

          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }

          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.3;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Mainc;

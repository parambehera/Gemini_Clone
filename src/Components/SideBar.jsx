import React, { useContext, useEffect } from "react";
import { Menu, PlusCircle, Trash2 } from "lucide-react";
import { Context } from "../context/Context";
import { MessageSquare } from "lucide-react";

const SideBar = ({ extended, setExtended }) => {
  const { onSent, prevPrompt, setRecentPrompt, newChat, setPrevPrompt } =
    useContext(Context);

  // Initialize prevPrompt from localStorage
  useEffect(() => {
    const storedPrompts = localStorage.getItem("prevPrompt");
    if (storedPrompts) {
      setPrevPrompt(JSON.parse(storedPrompts));
    }
  }, []);

  const loadPrompt = async (prompt) => {
    console.log(prompt);
    setRecentPrompt(prompt);
    await onSent({ prompts: prompt });
  };

  const deletePrompt = (indexToDelete) => {
    const updatedPrompts = prevPrompt.filter(
      (_, index) => index !== indexToDelete
    );
    setPrevPrompt(updatedPrompts);
  };

  // Sync with localStorage when prevPrompt changes
  useEffect(() => {
    if (prevPrompt.length > 0) {
      localStorage.setItem("prevPrompt", JSON.stringify(prevPrompt));
    }
  }, [prevPrompt]);
  

  return (
    <aside
      className={`fixed left-0 top-0 h-screen transition-all duration-500 ${
        extended ? "w-64" : "w-20"
      } bg-[#1F1F1F] p-4 shadow-md flex flex-col justify-between z-50`}
    >
      <div>
        {/* Sidebar Header with Menu Icon */}
        <div className="flex items-center justify-between mb-4">
          <button
            className="p-2 rounded-md hover:bg-[#2A2A2B]"
            onClick={() => setExtended(!extended)}
          >
            <Menu className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          className="w-full flex items-center gap-3 p-3 text-left bg-[#2A2A2B] hover:bg-[#3A3A3B] rounded-lg font-medium"
          onClick={newChat}
        >
          <PlusCircle className="w-5 h-5" />
          {extended && <p className="transition-all duration-500">New Chat</p>}
        </button>

        {/* Recent Chats */}
        <div className="text-gray-400 text-sm mt-4 font-semibold transition-all duration-500">
          Recent
        </div>
        {prevPrompt.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-[#2A2A2B] rounded-lg transition-all duration-500"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => loadPrompt(item)}
              >
                <MessageSquare className="w-5 h-5" />
                {extended && <p>{item.slice(0, 18)}...</p>}
              </div>
              {extended && (
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => deletePrompt(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Buttons */}
      <div>
        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-[#2A2A2B] rounded-lg transition-all duration-500">
          ⚙️ {extended && <p>Settings</p>}
        </button>
        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-[#2A2A2B] rounded-lg transition-all duration-500">
          📖 {extended && <p>Help</p>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

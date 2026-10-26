import{useeffect , useRef , useState} from "react";
import{
  getResumeConversation,
  askResumeQuestion,
}from "../..services/resumeServices";

export default function ResumeChat({ resumeId }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading , setLoading] = useState(true);
  const [sending , setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const requestId = useRef(0);

  useEffect(() => {
    let active = true;
    const id =  ++requestId.current;

    async function loadChat() {
      setMessages([]);
      setError("");
      setLoading(true);

      if(!resumeId){
        setLoading(false);
        setError("Please upload a resume before start a chat.");
        return;
      }
      try{
        const conversation = await getResumeConversation(resumeId);

        if(active && requestId.current == id){
          setMessages(conversation.message || []);
        }
      }
      catch (err) {
        if(active){
          setError(err.message || "Unable to load chat history");
        }
      }
      finally {
        if (active) setLoading(false);
      }
    }
    loadChat();

    return ()=>{
      active=false;
    };
  },[resumeId]);

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behaivior: "smooth"});
  }, [messages, sending]);


async function handleSend(enent){
  event.preventDefault();

  const text = question.trim();

  if(!text || sending || !resumeId || text.length > 2000){
    return;
  }

  setSending(true);
  setError("");
  setQuestion("");

  const temporaryId = `pending-${Date.now()}`;

  setMessages((previous) =>[
    ...previous,
    {_id: temporaryId, role:"user", content:text}
  ] );

  try{
    const result = await askResumeQuestion(resumeId, text);
    setMessages((previous)=>[
      ...previous.filter((message)=> message._id !== temporaryId),
      result.userMessage, 
      result.assistantMessage,
    ]);

  }
  catch(err){
   setMessages((previous)=>
  previous.filter((message)=> message._id !==temporaryId)
  )
  setQuestion(text);
  setError(err.message || "Unable to answer. Please try again");
  } finally{
    setSending(false);
  }
}

return (
  <section className="mt-6 overflow-hidden rounded-2xl border-gray-200 bg-white shadow-sm">
    <header className="flex items-center gap-3 border-b bg-blue-50 p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
       
      </div>
      <div>
        <h3 className="font-bold text-gray-900">Resume AI Assistant</h3>
          <p className="text-sm text-gray-600">
            Ask questions about your uploded resume 
          </p>
      </div>
    </header>

    <div className="h-80 space-y-4 overflow-y-auto p-4"
    arial-live="polite">
      {loading?(
        <p className="py-8 text-center text-gray-500">
          Loading conversation...
        </p>
      ): messages.length === 0 ? (
        <div className="py-8 text-center">
          <p classname="font-semibold"> Ask me bout your resume!</p>
          <p classname="mt-2 text-sm text-gray-500"> 
            Try asking about your skills, projects education or experience.
          </p>
        </div>
      ):(
        messages.map((message)=>(
          <div key={message._id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`} >

          <div
          className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm ${
            message.role === "user" ? "bg-blue-600 text-white" : "border bg-gray-100 text-gray-800"
          }`}
          >
           {message.content}
          </div>
          </div>
        ))
      )}

      {sending && (
        <p className= "text-sm text-gray-500" role="status">
          ai preparing your answer..........
          </p>
      )}

      <div ref={bottomRef}/>

    </div>

    {error && (
      <p className="mx-4 mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
        {error}
      </p>
    )}



  </section>
)
}
const API_URL = import.meta.env.VITE_API_URL

function authHeaders(){
  const token = localStorage.getItem("token");

  if(!token){
    throw new Error("plaese log in to use reusme chat");

  }

  return {
    Authentication: `Bearer ${token}`,
    "content-type": "application/json",
  }
}

async function readResponse(res){
  const data = await res.json().catch(()=>({}));

  if(!res.ok){
    throw new Error(data.message ||" request failed");
  }

  return data;
}


export async function getResumeConversation(resumeId){
  const response = await fetch(
    `${API_URL}/api/chat/${encodeURIComponent(resumeId)}`,
    { headers: authHeaders() }
  );
  const data = await readResponse(response);
  return data.conversation;
}

export async function getLatestResume(){
  const response = await fetch(`${API_URL}/api/resumes/latest`,
    { headers: authHeaders() }
  );
  const data = await readResponse(response);
  return data.resume;
}


export async function askResumeQuestion(resumeId, question){
  const response = await fetch(`${API_URL}/api/chat/${encodeURIComponent(resumeId)}/messages`,
    { method:"POST",
      headers: authHeaders(),
      BODY: JSON.stringify({question}),
     }
  );
  return readResponse(response);
}




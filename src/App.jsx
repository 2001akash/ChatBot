import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios';



function App() {
  const [question , setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAns , setGeneratingAns] = useState(false);

  async function generateAns(e){
    console.log("...loading");
   setGeneratingAns(true);
   e.preventDefault();
   setAnswer("Loading your answer... \n It might take upto 10 seconds");
   
   try {
   const response = await axios({ 
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAM7lDXGZIthopRw3FbWUEDerF-nqks600`,
      method: "post",
      data: {
        contents: 
        [{ parts :[{ text: question}]},
        ],
      },
    });
    
      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
    );
  }
  catch (error){
    console.log(error);
    setAnswer("Sorry - something went wrong. Please try again");
  }
   setGeneratingAns(false);
}
  return (
    <>
    
    <h1>ChatBot</h1>
    <form onSubmit={generateAns}>
    <textarea placeholder='Ask anything ' value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
    <br/>
    <button type='submit' onClick={generateAns}>Generate Answer</button>
    </form>
    <div>
      <pre>{answer}</pre>
    </div>
    </>
  );
}

export default App;

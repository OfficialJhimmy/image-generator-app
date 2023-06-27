import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function App() {
  // STATE VARIABLES
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setIsLoading] = useState(false);

  // OPENAI CONFIGURATION
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_APP_API_KEY
});

const openai = new OpenAIApi(configuration);

  // Event Handlers
  const handleChange = (e) => {
    setUserPrompt(e.target.value);
  };

  const handleImageHandler = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault()
      const result = await openai.createImage({
        prompt: userPrompt,
        n: 1,
        size: "512x512",
      });

      console.log(result, 'result')
      setGeneratedImage(result.data.data[0].url);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  

  return (
    <div className="app__container">
      <h1>AI-Powered Generated Images</h1>

      <div className="image__input">
        <input
          type="text"
          name="userprompt"
          id="userprompt"
          placeholder="Enter a prompt"
          onChange={handleChange}
          value={userPrompt}
        />
        
        
        <button onClick={handleImageHandler}>Generate Image</button>
      </div>
      <div className="image__box">
        {loading ? (
          <>
            <p>Please Wait!</p>
            <p>This will only take a few seconds</p>
          </>
        ) : (
          <>
            <img src={generatedImage} alt="" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

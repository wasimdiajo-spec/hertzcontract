import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 images
  app.use(express.json({ limit: "50mb" }));

  app.post("/api/extract", async (req, res) => {
    try {
      const { images } = req.body;
      
      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ error: "No images provided" });
      }

      // Build the content array for the messages
      const content: any[] = [
        {
          type: "text",
          text: `Extract the following information from the provided ID and Credit Card images to fill out a car rental contract:
        - fullName (e.g., ZACHRY EMMETT BULLARD)
        - address (e.g., 910-510-3933 2bullard12@gmail.com or physical address if present)
        - dateOfBirth (e.g., 05/12/1997)
        - licenseNo
        - dateOfIssue
        - expiryDate
        - creditCardNo (digits only, or exactly as it appears)
        - ccExpiryDate
        
        Return ONLY a valid JSON object without any markdown formatting or extra text. Use the exact keys listed above.`
        }
      ];

      for (const img of images) {
        // NVIDIA / OpenAI vision API expects base64 URL format
        const base64Url = img.data.startsWith('data:') 
          ? img.data 
          : `data:${img.mimeType || 'image/jpeg'};base64,${img.data}`;
        
        content.push({
          type: "image_url",
          image_url: {
            url: base64Url
          }
        });
      }

      const payload = {
        model: "meta/llama-3.2-90b-vision-instruct",
        messages: [
          {
            role: "user",
            content: content
          }
        ],
        max_tokens: 4096,
        stream: false,
        temperature: 0.1
      };

      const apiKey = process.env.NVIDIA_API_KEY || "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";

      let response;
      let lastError;
      
      for (let i = 0; i < 3; i++) {
        try {
          const fetchRes = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(payload)
          });
          
          if (!fetchRes.ok) {
            const errText = await fetchRes.text();
            throw new Error(`NVIDIA API Error ${fetchRes.status}: ${errText}`);
          }
          
          response = await fetchRes.json();
          break; // Success
        } catch (err: any) {
          lastError = err;
          console.log(`API request failed, retrying ${i + 1}/3... Error: ${err.message}`);
          await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1))); // Exponential backoff
        }
      }

      if (!response) {
        throw lastError;
      }

      const rawText = response.choices?.[0]?.message?.content || "";
      
      if (!rawText) {
        console.error("Empty AI response received. Full response object:", JSON.stringify(response, null, 2));
        throw new Error(`Received empty response from the AI model. NVIDIA Response: ${JSON.stringify(response)}`);
      }

      let jsonString = rawText;
      // Many LLMs add conversational filler before or after the JSON payload
      // Safely extract just the JSON object by finding the first '{' and last '}'
      const startIndex = rawText.indexOf('{');
      const endIndex = rawText.lastIndexOf('}');
      
      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        jsonString = rawText.substring(startIndex, endIndex + 1);
      } else {
        // Fallback: clean up markdown ticks if present
        jsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      
      try {
        const parsed = JSON.parse(jsonString);
        res.json(parsed);
      } catch (parseError: any) {
        console.error("Raw AI response failed to parse:", rawText);
        throw new Error("Failed to parse the extracted data format. Please try again.");
      }

    } catch (error: any) {
      console.error("Extraction error:", error);
      res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

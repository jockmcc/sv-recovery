
# Silent Voices Recover 🛡️🌿

A compassionate AI-powered companion designed to bridge the gap in recovery support for individuals dealing with addiction and their families. 

Built with the **Gemini 3 Pro** and **2.5 Flash** models, this application focuses on psychological resilience, proactive safety, and maintaining healthy boundaries.

## ✨ Key Features

- **AI Pattern Spotting**: Analyzes journals and check-ins to identify hidden triggers (e.g., "I noticed you feel more stressed on Tuesdays after work").
- **Proactive Safety Guard**: Uses Geofencing and Google Maps grounding to trigger interventions (letters to your future self) when near high-risk zones.
- **The Vault**: Secure, local-first storage for visceral motivators, protected by device-level security (simulated).
- **Trust Bridge**: A revolutionary "Traffic Light" system that allows users to share their status (Green/Amber/Red) with family without compromising private thoughts.
- **Deep Guidance Companion**: A dedicated AI space utilizing Gemini’s 32k thinking budget for philosophical and deep recovery advice.
- **Wellness & Voice-to-Text**: Hands-free journaling and voice-narrated affirmations using advanced Text-to-Speech.

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini API (`@google/genai`)
  - **Models used**: `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash`
  - **Tools**: Google Search Grounding, Google Maps Grounding
- **Deployment**: Standard Vite structure

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/silent-voices-recover.git
   cd silent-voices-recover
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Create a `.env` file in the root directory.
   - Add your Gemini API Key: `API_KEY=your_actual_key_here`

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📜 Principles of Design

1. **Privacy First**: All journals and "Vault" items are stored locally. AI analysis happens contextually without permanent cloud logs of sensitive data.
2. **Non-Clinical Approach**: The app explicitly states it is not a medical service, focusing instead on peer-support frameworks and psychological resilience.
3. **Compassionate UI**: Uses a calming palette of soft blues (`#3B7080`) and greens (`#88B29C`) to reduce user anxiety.

## ⚖️ License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Note: Silent Voices Recover is a support tool, not a medical or emergency service. In crisis, always contact local emergency services (999/112/911).*

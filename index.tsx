/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI } from '@google/genai';

const loader = document.getElementById('loader');
const output = document.getElementById('output');
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement | null;

async function generateContent() {
  if (!loader || !output || !generateBtn) {
    console.error('Required elements not found in the DOM');
    return;
  }

  // Disable button, show loader, and clear previous output
  generateBtn.disabled = true;
  loader.style.display = 'block';
  output.textContent = '';

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: 'Tell me a short, fun story about a curious robot.',
    });

    for await (const chunk of response) {
      if (chunk.text) {
        output.textContent += chunk.text;
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
    output.textContent =
      'Sorry, something went wrong. Please check the console for details.';
  } finally {
    // Hide loader and re-enable button
    loader.style.display = 'none';
    generateBtn.disabled = false;
  }
}

if (generateBtn) {
  generateBtn.addEventListener('click', generateContent);
}

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY || '');

export async function analyzeMealAndHealth(
  mealHistory: any[],
  medicalReports: any[],
  userPreferences: any
) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Based on the following information:
      
      Meal History: ${JSON.stringify(mealHistory)}
      Medical Reports: ${JSON.stringify(medicalReports)}
      User Preferences: ${JSON.stringify(userPreferences)}
      
      Please provide:
      1. Analysis of current dietary patterns
      2. Health insights based on medical reports
      3. Personalized meal recommendations for the next week
      4. Specific nutritional goals
      5. Any dietary restrictions or considerations
      
      Format the response as a JSON object with these sections.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error analyzing data with Gemini:', error);
    throw error;
  }
}

export async function analyzeMedicalReport(reportText: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Analyze the following medical report and extract key information:
      
      ${reportText}
      
      Please provide:
      1. Key findings
      2. Nutritional implications
      3. Dietary recommendations
      4. Risk factors
      5. Areas requiring attention
      
      Format the response as a JSON object with these sections.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error analyzing medical report with Gemini:', error);
    throw error;
  }
}
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini APIキー（環境変数から取得）
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';

// Gemini AIの初期化
const genAI = new GoogleGenerativeAI(API_KEY);

// レシピ提案のプロンプト
const RECIPE_SUGGESTION_PROMPT = `
あなたは料理の専門家です。以下の条件に基づいて、4人分のレシピ名を3つ提案してください。

条件：
- 材料や調理法に関するキーワード
- 子供が食べやすい料理
- 家庭で簡単に作れる料理
- 栄養バランスの良い料理

提案するレシピ名は以下の形式で返してください：
1. [レシピ名1]
2. [レシピ名2]
3. [レシピ名3]

各レシピ名は簡潔で分かりやすく、日本語で記述してください。
`;

export const suggestRecipes = async (searchTerm: string): Promise<string[]> => {
  try {
    if (!API_KEY) {
      throw new Error('Gemini APIキーが設定されていません');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `${RECIPE_SUGGESTION_PROMPT}

検索キーワード: ${searchTerm}

上記のキーワードを参考に、3つのレシピ名を提案してください。`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // レスポンスからレシピ名を抽出
    const lines = text.split('\n').filter(line => line.trim());
    const recipes = lines
      .filter(line => /^\d+\./.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(recipe => recipe.length > 0);

    return recipes.slice(0, 3); // 最大3つまで
  } catch (error) {
    console.error('レシピ提案エラー:', error);
    return [];
  }
}; 
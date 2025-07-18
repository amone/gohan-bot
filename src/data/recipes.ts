import { Recipe } from '../types/Recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: '親子丼',
    description: '鶏肉と卵を使った定番の和食',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    ingredients: [
      '鶏もも肉 400g',
      '玉ねぎ 2個',
      '卵 6個',
      '米 4合',
      'めんつゆ 200ml',
      '水 200ml'
    ],
    instructions: [
      '鶏肉を一口大に切る',
      '玉ねぎを薄切りにする',
      '鍋にめんつゆと水を入れ、鶏肉と玉ねぎを煮る',
      '鶏肉に火が通ったら溶き卵を流し入れる',
      'ご飯の上に盛り付ける'
    ],
    cookingTime: 20,
    servings: 4,
    tags: ['和食', '丼物', '簡単', '子供が好き']
  },
  {
    id: '2',
    title: 'カレーライス',
    description: '定番の家庭料理',
    imageUrl: 'https://images.unsplash.com/photo-1504674900240-9c9c3b0c0c0c?w=400&h=300&fit=crop',
    ingredients: [
      'カレールー 1箱',
      '豚肉 600g',
      'じゃがいも 4個',
      'にんじん 2本',
      '玉ねぎ 4個',
      '米 4合'
    ],
    instructions: [
      '野菜と肉を一口大に切る',
      '鍋で肉と野菜を炒める',
      '水を加えて煮込む',
      '野菜が柔らかくなったらカレールーを溶かし入れる',
      'ご飯と一緒に盛り付ける'
    ],
    cookingTime: 45,
    servings: 4,
    tags: ['洋食', '定番', '煮込み', '子供が好き']
  },
  {
    id: '3',
    title: 'ハンバーグ',
    description: '子どもが大好きな定番メニュー',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    ingredients: [
      '合いびき肉 800g',
      '玉ねぎ 2個',
      'パン粉 1カップ',
      '牛乳 1/2カップ',
      '卵 2個',
      '塩こしょう 少々',
      'ナツメグ 少々',
      'サラダ油 大さじ2',
      'デミグラスソース 適量'
    ],
    instructions: [
      '玉ねぎをみじん切りにして炒める',
      'ボウルに合いびき肉、炒めた玉ねぎ、パン粉、牛乳、卵、塩こしょう、ナツメグを入れてよく混ぜる',
      '8等分して小判型に成形する',
      'フライパンに油を熱し、中火で両面を焼く',
      'デミグラスソースをかけて完成'
    ],
    cookingTime: 30,
    servings: 4,
    tags: ['洋食', '子供が好き', '定番', '簡単']
  },
  {
    id: '4',
    title: 'オムライス',
    description: 'ケチャップライスとふわふわ卵の組み合わせ',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    ingredients: [
      '米 4合',
      '鶏もも肉 400g',
      '玉ねぎ 2個',
      'にんじん 1本',
      'ピーマン 4個',
      'ケチャップ 大さじ8',
      '卵 8個',
      '塩こしょう 少々',
      'バター 大さじ4'
    ],
    instructions: [
      '米を炊く',
      '鶏肉と野菜を一口大に切る',
      'フライパンで鶏肉と野菜を炒める',
      'ご飯を加えて炒め、ケチャップで味付けする',
      '別のフライパンで溶き卵を薄く焼く',
      'ケチャップライスを卵で包む'
    ],
    cookingTime: 25,
    servings: 4,
    tags: ['洋食', '子供が好き', '簡単']
  },
  {
    id: '5',
    title: 'ミートソーススパゲッティ',
    description: '子どもも大人も大好きな定番パスタ',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    ingredients: [
      'スパゲッティ 800g',
      '合いびき肉 600g',
      '玉ねぎ 2個',
      'にんじん 2本',
      'セロリ 2本',
      'トマト缶 2缶',
      'ケチャップ 大さじ6',
      '塩こしょう 少々',
      'オリーブオイル 大さじ4'
    ],
    instructions: [
      '野菜をみじん切りにする',
      'フライパンで合いびき肉を炒める',
      '野菜を加えて炒める',
      'トマト缶とケチャップを加えて煮込む',
      '塩こしょうで味を調える',
      '茹でたスパゲッティと和える'
    ],
    cookingTime: 30,
    servings: 4,
    tags: ['洋食', '子供が好き', 'パスタ', '簡単']
  },
  {
    id: '6',
    title: '冷やし中華',
    description: '夏にぴったりのさっぱり麺料理',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    ingredients: [
      '中華麺 800g',
      'きゅうり 2本',
      'トマト 2個',
      'ハム 200g',
      '錦糸卵 4個分',
      'めんつゆ 200ml',
      '酢 大さじ4',
      'ごま油 大さじ2',
      '白ごま 適量'
    ],
    instructions: [
      '中華麺を茹でて冷水で冷やす',
      'きゅうりとトマトを細切りにする',
      'ハムを細切りにする',
      '錦糸卵を作る',
      'めんつゆ、酢、ごま油を混ぜてタレを作る',
      '麺に具材を盛り付け、タレをかける',
      '白ごまを散らす'
    ],
    cookingTime: 20,
    servings: 4,
    tags: ['和食', '麺類', '夏に食べたい', '簡単']
  },
  {
    id: '7',
    title: 'そうめん',
    description: '夏の定番、さっぱりとした麺料理',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    ingredients: [
      'そうめん 4束',
      'きゅうり 2本',
      'トマト 2個',
      '錦糸卵 4個分',
      'めんつゆ 200ml',
      'わさび 適量',
      '青じそ 8枚',
      '白ごま 適量'
    ],
    instructions: [
      'そうめんを茹でて冷水で冷やす',
      'きゅうりとトマトを細切りにする',
      '錦糸卵を作る',
      '青じそを細切りにする',
      'めんつゆにわさびを溶かす',
      '麺に具材を盛り付け、タレをかける',
      '白ごまを散らす'
    ],
    cookingTime: 15,
    servings: 4,
    tags: ['和食', '麺類', '夏に食べたい', '簡単']
  },
  {
    id: '8',
    title: 'カレーうどん',
    description: '子どもが大好きな温かい麺料理',
    imageUrl: 'https://images.unsplash.com/photo-1504674900240-9c9c3b0c0c0c?w=400&h=300&fit=crop',
    ingredients: [
      'うどん 800g',
      '豚肉 400g',
      '玉ねぎ 2個',
      'にんじん 2本',
      'カレールー 1箱',
      'めんつゆ 200ml',
      '水 400ml',
      '長ねぎ 2本'
    ],
    instructions: [
      '野菜と肉を一口大に切る',
      '鍋で肉と野菜を炒める',
      'めんつゆと水を加えて煮込む',
      '野菜が柔らかくなったらカレールーを溶かし入れる',
      'うどんを茹でる',
      'うどんにカレーをかけて長ねぎを散らす'
    ],
    cookingTime: 25,
    servings: 4,
    tags: ['和食', '麺類', '子供が好き', '簡単']
  }
]; 
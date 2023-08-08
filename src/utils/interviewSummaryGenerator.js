import {QUESTION_CATEGORY_LIST_VALUE} from "../constants/interviewRoomConst";

function ParsingCategory(categoryString){
  const category = QUESTION_CATEGORY_LIST_VALUE; // CATEGORY LIST
  // category의 key들을 순환하면서 categoryString에 포함되어 있는지 확인.
  for (let key in category) {
    if(categoryString.includes(key)) {
      for (let i = 0; i < category[key].length; i++) {
        if(categoryString.includes(category[key][i])){
          return {mainCategory: key, subCategory: category[key][i]};
        }
      }
    }
  }
  return {mainCategory: null, subCategory: null};
}


function interviewSummaryGenerator(interviewResults){
  const parsingInterviewResults = [];
  const categoryScores = {};
  const categoryAverages = [];
  const categories = [];
  for (const key in QUESTION_CATEGORY_LIST_VALUE) {
    // 동적으로 객체 속성을 대분류로 생성
    categoryScores[key] = [];
    categories.push(key);
  }

  for(let i = 0; i < interviewResults.length; i++){
    const item = interviewResults[i];
    item[2] = ParsingCategory(item[2]);
    const parsedItem ={question: item[0], answer: item[1], category: item[2], score: parseInt(item[3]), analysis: item[4]};
    categoryScores[parsedItem.category.mainCategory].push(parsedItem.score);
    parsingInterviewResults.push(parsedItem);
  }

  for (const key in categoryScores) {
    const categoryScore = categoryScores[key];
    const categoryScoreSum = categoryScore.reduce((a, b) => a + b, 0);
    const categoryScoreAverage = Math.round(categoryScoreSum / categoryScore.length);
    categoryAverages.push(categoryScoreAverage);
  }

  const interviewSummary = {
    interviewResults: parsingInterviewResults,
    categoryScores: categoryScores,
    categoryAverages: categoryAverages,
    categories: categories
  };
  return interviewSummary;
}

export default interviewSummaryGenerator;

const { gender } = require('./enums');
const punctuation = require('../candidates/punctuation.json');

const heightScore = (examName, candidateGender, testArray) => {
  let examObject;
  let candidateResult;
  const genderSpecific = gender[candidateGender];
  const minimunHeight = punctuation[genderSpecific][examName];

  if (testArray.length == 2) {
    examObject = testArray.filter((exam) => exam.retest === true)[0];
  } else {
    examObject = testArray[0];
  }

  candidateResult = examObject.result;

  return (candidateResult < minimunHeight) ? false : true;
};

module.exports = heightScore;
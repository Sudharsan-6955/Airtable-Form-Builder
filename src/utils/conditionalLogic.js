/**
 * Conditional Logic Engine (Frontend)
 * Mirrors backend logic for real-time form rendering
 */

export function shouldShowQuestion(rules, answersSoFar) {
  // If no rules, always show the question
  if (!rules || !rules.conditions || rules.conditions.length === 0) {
    return true;
  }

  const evaluateCondition = (condition) => {
    const { questionKey, operator, value } = condition;
    const answer = answersSoFar[questionKey];

    // Handle missing/undefined answers
    if (answer === undefined || answer === null || answer === '') {
      return operator === 'notEquals';
    }

    switch (operator) {
      case 'equals':
        if (Array.isArray(answer)) {
          return answer.includes(value);
        }
        return answer === value;

      case 'notEquals':
        if (Array.isArray(answer)) {
          return !answer.includes(value);
        }
        return answer !== value;

      case 'contains':
        if (typeof answer === 'string') {
          return answer.toLowerCase().includes(String(value).toLowerCase());
        }
        if (Array.isArray(answer)) {
          return answer.some(item => 
            String(item).toLowerCase().includes(String(value).toLowerCase())
          );
        }
        return false;

      default:
        console.warn(`Unknown operator: ${operator}`);
        return false;
    }
  };

  const results = rules.conditions.map(evaluateCondition);

  if (rules.logic === 'AND') {
    return results.every(result => result === true);
  } else if (rules.logic === 'OR') {
    return results.some(result => result === true);
  } else {
    console.warn(`Unknown logic operator: ${rules.logic}`);
    return true;
  }
}

export function getVisibleQuestions(questions, answersSoFar) {
  return questions
    .filter(q => shouldShowQuestion(q.conditionalRules, answersSoFar))
    .map(q => q.questionKey);
}

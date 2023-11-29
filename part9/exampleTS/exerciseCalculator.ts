export interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export type rating = 1 | 2| 3;

const RATING_DESCRIPTIONS = {
  1 : 'Terrible job',
  2 : 'Not too bad but could be better',
  3 : 'Winner winner dinner time where chicken is had'
};

export const calculateExercises = (hours: number[], rating: rating, target: number):result => {
  const average = hours.reduce((sum, curr) => sum + curr) / hours.length;
  const success = average >= target;

  return {
    periodLength: hours.length,
    trainingDays: hours.reduce((count, current) => current ? count + 1: count, 0),
    success,
    rating,
    ratingDescription: RATING_DESCRIPTIONS[rating],
    target,
    average
  }
}
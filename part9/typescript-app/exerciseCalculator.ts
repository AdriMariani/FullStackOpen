interface ExerciseResults {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

function calculateExercises(dailyHours: Array<number>, target: number): ExerciseResults {
    const average = dailyHours.reduce((acc, value) => acc + value, 0) / dailyHours.length;
    const trainingDays = dailyHours.reduce((acc, value) => value > 0 ? acc + 1 : acc, 0);
    let rating = 1;
    let ratingDescription = 'poor';

    if (average >= target) {
        rating = 3;
        ratingDescription = 'amazing';
    } else if (average > (target / 2)) { 
        rating = 2;
        ratingDescription = 'not bad';
    }

    return {
        periodLength: dailyHours.length,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
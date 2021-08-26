interface ExerciseResults {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

// interface ExerciseArguments {
//     dailyHours: Array<number>,
//     target: number
// }

// function parseArguments(args: Array<string>): ExerciseArguments {
//     if (args.length < 4) throw new Error('Not enough arguments');

//     const target = Number(args[2]);

//     if (isNaN(target)) throw new Error('Target must be a number!');

//     const dailyHours = args.slice(3).map(hours => {
//         const numHours = Number(hours);
//         if (isNaN(numHours)) {
//             throw new Error('Provided values were not all numbers!');
//         } else {
//             return numHours;
//         }
//     });

//     return {
//         dailyHours,
//         target
//     };
// }

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
    };
}

export default calculateExercises;

// try {
//     const { dailyHours, target } = parseArguments(process.argv);
//     console.log(calculateExercises(dailyHours, target));
// } catch (error) {
//     console.log((<Error>error).message);
// }
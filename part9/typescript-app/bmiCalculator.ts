// interface BmiValues {
//     height: number,
//     weight: number
// }

// function parseArguments(args: Array<string>): BmiValues {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }

function calculcateBMI(height: number, weight: number): string {
    const bmi: number = weight / (height * height) * 10000;
    
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi < 29.9) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

export default calculcateBMI;

// try {
//     const { height, weight } = parseArguments(process.argv);
//     console.log(calculcateBMI(height, weight));
// } catch (error) {
//     console.log(error.message);
// }
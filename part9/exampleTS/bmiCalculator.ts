const BMI_CATEGORIES = {
  underweight: "Abnormal (under weight)",
  normal: "Normal (healthy weight)",
  overweight: "Abnormal (over weight)",
  obese1: "Abnormal (obese class 1)",
  obese2: "Abnormal (obese class 1)",
  obese3: "Abnormal (obese class 1)",
}

export const calculateBmi = (height: number, weight: number):string => {
  const heightMeters = height / 100;
  const BMI = weight / (heightMeters ** 2);

  console.log(BMI);

  if (BMI <= 18.5) return BMI_CATEGORIES.underweight;
  else if (BMI < 25) return BMI_CATEGORIES.normal;
  else if (BMI < 30) return BMI_CATEGORIES.overweight;
  else if (BMI < 35) return BMI_CATEGORIES.obese1;
  else if (BMI < 40) return BMI_CATEGORIES.obese2;
  else return BMI_CATEGORIES.obese3;
}

// module.exports = calculateBmi;
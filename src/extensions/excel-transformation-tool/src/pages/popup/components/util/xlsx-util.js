function Util() {
  /*
  In this function, we first initialize baseCharCode to the ASCII code for the letter 'A', which is 65. We then
  initialize an empty string letters to hold the final output.
  Next, we enter a loop that runs as long as num is greater than or equal to 0. Inside the loop, we use the modulo
  operator % to find the remainder when num is divided by 26. This gives us the index of the letter we need to add to the output.
  We then use the String.fromCharCode() method to convert the base char code plus the index to the corresponding letter.
  We add this letter to the beginning of the letters string using string concatenation.
  Finally, we update num by dividing it by 26 (rounded down) and subtracting 1. This moves us to the next set of letters
  (e.g., from "A" to "AA").
  Once the loop has finished, we return the letters string, which contains the letter-based representation of the
  original number.
  For example, convertToLetter(24) would output "Y", while convertToLetter(25) would output "Z", and convertToLetter(26)
  would output "AA".
  */
  function convertToLetter(num) {
    let baseCharCode = "A".charCodeAt(0);
    let letters = "";

    while (num >= 0) {
      letters = String.fromCharCode(baseCharCode + (num % 26)) + letters;
      num = Math.floor(num / 26) - 1;
    }

    return letters;
  }
  return {
    convertToLetter,
  };
}
export default Util;

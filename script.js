// Get DOM elements
    const lengthSlider = document.getElementById("lengthSlider");
    const uppercase = document.getElementById("uppercase");
    const numbers = document.getElementById("numbers");
    const symbols = document.getElementById("symbols");
    const result = document.getElementById("result");
    const generate = document.getElementById("generate");
    const copy = document.getElementById("copy");

    // Live update of length
    lengthSlider.oninput = () => {
      document.getElementById("lengthValue").innerText = lengthSlider.value;
    };

    function generatePassword() {
      const len = +lengthSlider.value;
      const lower = "abcdefghijklmnopqrstuvwxyz";
      const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const num = "0123456789";
      const sym = "!@#$%^&*()_+=-[]{}";

      let chars = "";
      let guaranteedChars = [];

      // Prioritize character types: Numbers > Uppercase > Symbols > Lowercase
      if (numbers.checked) {
        chars = num;
        guaranteedChars.push(num[Math.floor(Math.random() * num.length)]);
      } else if (uppercase.checked) {
        chars = upper;
        guaranteedChars.push(upper[Math.floor(Math.random() * upper.length)]);
      } else if (symbols.checked) {
        chars = sym;
        guaranteedChars.push(sym[Math.floor(Math.random() * sym.length)]);
      } else {
        // Default to lowercase if no options are selected
        chars = lower;
        guaranteedChars.push(lower[Math.floor(Math.random() * lower.length)]);
      }

      // Fill the rest of the password
      let remainingLength = len - guaranteedChars.length;
      let passwordArray = [...guaranteedChars];

      for (let i = 0; i < remainingLength; i++) {
        passwordArray.push(chars[Math.floor(Math.random() * chars.length)]);
      }

      // Shuffle the password
      const password = passwordArray.sort(() => Math.random() - 0.5).join("");
      result.value = password;
    }

    generate.addEventListener("click", generatePassword);

    copy.addEventListener("click", async () => {
      if (result.value) {
        try {
          await navigator.clipboard.writeText(result.value);
          alert("Password copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy: ", err);
          alert("Failed to copy password!");
        }
      } else {
        alert("No password to copy!");
      }
    });

    // Generate initial password on page load
    generatePassword();
  
function generatePolynomial(secret, threshold) {
    const coefficients = [secret];
    for (let i = 1; i < threshold; i++) {
      coefficients.push(Math.floor(Math.random() * 256)); // coefficients are between 0 and 255
    }
    return coefficients;
  }
  
  // Function to evaluate the polynomial at a given x value
  function evaluatePolynomial(polynomial, x) 
  {
    let result = 0;
    for (let i = polynomial.length - 1; i >= 0; i--) {
      result = result * x + polynomial[i];
    }
    return result;
  }

  function splitSecret(secret, numShares) {
    const threshold = 3;
    const polynomial = generatePolynomial(secret, threshold);
    const shares = [];
    for (let i = 1; i <= numShares; i++) {
      const x = i;
      const y = evaluatePolynomial(polynomial, x);
      shares.push({ x, y });
    }
    return shares;
  }
const teal = "#008080";
const primary = '#85C7DE';
const accent = '#A0C4E2';
const warning = '#FFA200';

const generateHexColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

module.exports = { teal, primary, accent, warning, generateHexColor };

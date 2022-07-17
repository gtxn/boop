// TODO: Update variables to style
export default {
  colors: {
    primary: {
      100: "#44E1BB",
      300: "#30CCA7",
      500: "#30AB8D",
      700: "#0E755C",
    },
    secondary: {
      100: "#C484EC",
      300: "#9453BC",
      500: "#68308B",
      700: "#380358",
    },
    accent: {
      100: "#87AAEF",
      300: "#5983D3",
      500: "#2C5FAD",
      700: "#103697",
    },
    bg: {
      100: "#FFFFFF",
      200: "#F3F3F3",
      300: "#D3D3D3",
      400: "#ACACAC",
      500: "#838383",
      600: "#5C5757",
      700: "#3D3939",
    },
    red: "#ff6767",
  },
  boxShadow: {
    standard: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    hover: "6px 6px 2px 0px rgba(0, 0, 0, 0.25)",
  },
  borderRadius: {
    standard: "5px",
    large: "7.5px",
  },
  thickness: {
    standard: "8px",
  },
  fontSize: (width = 1000) => {
    return {
      h1: "64px",
      h2: "48px",
      h3: "32px",
      h4: "24px",
      p: "16px",
    };
  },
  screen: {
    mobile: "500px",
    tablet: "1000px",
    desktop: "1300px",
    large: "1920px",
  },
  timings: {
    fast: "0.2s",
    standard: "0.4s",
    slow: "0.6s",
  },
  headerheight: "170px",
  footerheight: "80px",
};

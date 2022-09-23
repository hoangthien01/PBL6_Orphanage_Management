module.exports = {
  prefix: "",
  content: ["./src/**/*.html", "./src/**/*.ts"],
  darkMode: "class", // or 'media' or 'class'
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        inherit: "inherit",
        transparent: "transparent",
        black: "black",
        white: "white",
        blue: {
          "00AFFF": "#00AFFF",
          "4882C7": "#4882C7",
          "39A0D3": "#39A0D3",
          "E1F6FF": "#E1F6FF",
          "EBF2F8": "#EBF2F8",
          "30BEFF": "#30BEFF",
          "3577A2": "#3577A2",
          "ECFAFF": "#ECFAFF",
          "61BBE7": "#61BBE7",
          "A8E4FF": "#A8E4FF",
          "282E3E": "#282E3E",
        },
        grey: {
          "999": "#999",
          "CCC": "#CCC",
          "777": "#777",
          "DDD": "#DDD",
          "D3D3D3": "#D3D3D3",
          "E2E7ED": "#E2E7ED",
          "EAF0F6": "#EAF0F6",
          "E5E8EC": "#E5E8EC",
          "E7E7E7": "#E7E7E7",
          "FAFAFA": "#FAFAFA",
          "F5F5F5": "#F5F5F5",
          "F3F3F3": "#F3F3F3",
          "EEE": "#EEE",
          "FCFCFD": "#FCFCFD",
          "E6E6E6": "#E6E6E6",
          "B7B7B7": "#B7B7B7",
          "666E83": "#666E83",
        },
        black: {
          "555": "#555"
        },
        green: {
          "89CD7F": "#89CD7F",
          "BFFEE7": "#BFFEE7"
        },
        red: {
          "E57979": "#E57979",
          "CE1818": "#CE1818",
          "DC6565": "#DC6565"
        },
        yellow: {
          "F9AC30": "#F9AC30"
        }
      },
      fontWeight: {
        "weight-300": "300",
        "weight-400": "400",
        "weight-500": "500",
        "weight-600": "600",
        "weight-700": "700",
        "weight-bold": "700"
      },
      fill: {
        "666e83": "#666e83",
      },
      fontSize: {
        "8px": "8px",
        "10px": "10px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "18px": "18px",
        "20px": "20px",
        "24px": "24px",
        "28px": "28px",
        "30px": "30px",
        "36px": "36px"
      },
      lineHeight: {
        "normal": "normal",
        "1": "1",
        "9px": "9px",
        "14px": "14px",
        "16.8px": "16.8px",
        "17px": "17px",
        "19.2px": "19.2px",
        "19.6px": "19.6px",
        "20px": "20px",
        "28px": "28px"
      },
      fontFamily: {
        "gotham-book": ['"Gotham Book"', '"sans-serif"'],
        "gotham-medium": ['"Gotham Medium"', '"sans-serif"'],
        "gotham-bold": ['"Gotham Bold"', '"sans-serif"']
      },
      borderWidth: {
        // TODO: Check with border-0 in bootstrap
        "0px": "0px",
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
      },
      borderRadius: {
        "none": "0",
        "4px": "4px",
        "5px": "5px",
        "6px": "6px",
        "20px": "20px",
        "1/2": "50%",
        "full": "100%"
      },
      spacing: {
        "0": "0px",
        "0-c": "0px",
        "0.5-c": "1px",
        "1-c": "1px",
        "2-c": "2px",
        "3-c": "3px",
        "4-c": "4px",
        "5-c": "5px",
        "6-c": "6px",
        "7-c": "7px",
        "8-c": "8px",
        "9-c": "9px",
        "10-c": "10px",
        "11-c": "11px",
        "12-c": "12px",
        "14-c": "14px",
        "15-c": "15px",
        "16-c": "16px",
        "18-c": "18px",
        "20-c": "20px",
        "22-c": "22px",
        "24-c": "24px",
        "25-c": "25px",
        "27-c": "27px",
        "28-c": "28px",
        "30-c": "30px",
        "32-c": "32px",
        "33-c": "33px",
        "35-c": "35px",
        "36-c": "36px",
        "40-c": "40px",
        "44-c": "44px",
        "48-c": "48px",
        "52-c": "52px",
        "56-c": "56px",
        "60-c": "60px",
        "64-c": "64px",
        "67-c": "67px",
        "71-c": "71px",
        "72-c": "72px",
        "75-c": "75px",
        "80-c": "80px",
        "88-c": "88px",
        "96-c": "96px",
        "100-c": "100px",
        "132-c": "132px",
        "149-c": "149px",
        "160-c": "160px"
      },
      margin: {
        "auto-0": "auto 0",
        "0-auto": "0 auto"
      },
      minWidth: {
        "70px": "70px",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%"
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "100": "100px",
        "170": "170px",
        "190": "190px",
        "200": "200px"
      },
      width: {
        "auto": "auto",
        "unset": "unset",
        "3/4": "75%",
        "210-c": "210px"
      },
      height: {
        "340": "340px"
      },
      zIndex: {
        "1": "1",
        "2": "2"
      },
      boxShadow: {
        '0_1_4_black-15%': '0px 1px 4px rgba(0, 0, 0, 0.15)',
        '0_0_0_1_ccc': '0px 0px 0px 1px #ccc'
      },
      gridTemplateColumns: {
        "1fr": "1fr",
        "1fr_auto": "1fr auto",
        "1/2_1/2": "50% 50%",
      },
      gridTemplateRows: {
        "1fr": "1fr",
        "100%": "100%"
      }
    },
    colors: {},
    spacing: {},
    fontFamily: {},
    fontWeight: {},
    fontSize: {},
    lineHeight: {},
    borderRadius: {},
    boxShadow: {},
    minHeight: {
      0: '0px',
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },
    minWidth: {
      0: '0px',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      25: '0.25',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      75: '0.75',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1',
    },
    rotate: {
      0: '0deg',
      45: '45deg',
      90: '90deg',
      180: '180deg',
    },
  },
  variants: {
    extend: {}
  },
  plugins: []
};

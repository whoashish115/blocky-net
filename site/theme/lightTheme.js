import { createTheme } from "@mui/material";
import darkScrollbar from "./themeUtils/darkScrollbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#59a1ffff",
    },
    secondary: {
      main: "#5e9cedff"
    },
    success: {
      main: "#3cc959",
    },
    warning: {
      main: "#ffc859",
    },
    info: {
      main: "#59acff",
    },
    error: {
      main: "#ff6459",
    },
    background: {
      default: "#ebeced",
      paper: "#fff",
      paperSecondary: "#f0f0f0",
    },
    text: {
      primary: "#2d2e2e",
      secondary: "#5b5c5b",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase'
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66
    },
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.375
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.375
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375
    }
  },
  shadows: {
    0: "none",
    1: "0px 0px 16px -4px rgba(0,0,0,0.35)",
    16: "0px 8px 0px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
  },
  shape: {
    borderRadius: 8,
  },
});

const lightTheme = createTheme(
  {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            ...darkScrollbar({
              track: "#fff", // paper
              thumb: "#cccccc", // main
              active: "#ccccccff", // main
            }),
            // Blog Markdown Editor
            ["& .rc-md-editor"]: {
              background: `${theme.palette.background.paper} !important`,
              border: "none !important",
              borderRadius: "8px",
              // zIndex: "7000 !important",
            },
            ["& .rc-md-navigation"]: {
              background: "transparent !important",
              border: "none !important",
            },
            ["& .rc-md-editor .editor-container .sec-md .input"]: {
              background: "transparent !important",
              color: "#000 !important",
              border: "none !important",
              resize: "none !important",
              borderRight: `2px solid ${theme.palette.primary.main} !important`,
            },
            ["& .rc-md-editor .editor-container .sec-html .html-wrap"]: {
              background: "transparent !important",
              color: "#000 !important",
              border: "none !important",
              resize: "none !important",
              borderLeft: `2px solid ${theme.palette.primary.main} !important`,
            },
            ["& .rc-md-editor .section-container .custom-html-style"]: {
              background: "transparent !important",
              color: "#000 !important",
            },
            ["& .rc-md-editor .button"]: {
              color: `${theme.palette.primary.main} !important`,
            },
            ["& .rc-md-editor .header-list .list-item:hover  "]: {
              background: `${theme.palette.background.default} !important`,
            },
            ["& .rc-md-editor .table-list.wrap .list-item"]: {
              background: `${theme.palette.background.default} !important`,
            },
            ["& .rc-md-editor .table-list.wrap .list-item.active"]: {
              background: `${theme.palette.primary.main} !important`,
            },
            ["& .rc-md-editor .drop-wrap  "]: {
              background: `${theme.palette.background.paper} !important`,
              border: "none !important",
            },

            // markdown components
            [".md-editor-html-class"]: {
              color: theme.palette.text.primary,
            },
             [".md-editor-html-class h1"]: {
              fontSize: theme.typography.h2.fontSize,
              fontWeight: theme.typography.h2.fontWeight,
              lineHeight: theme.typography.h2.lineHeight,
              spacing: theme.typography.h2.letterSpacing,
              margin: theme.spacing(2),
            },
            [".md-editor-html-class h2"]: {
              fontSize: theme.typography.h3.fontSize,
              fontWeight: theme.typography.h3.fontWeight,
              lineHeight: theme.typography.h3.lineHeight,
              spacing: theme.typography.h3.letterSpacing,
              margin: theme.spacing(2),
            },
            [".md-editor-html-class h3"]: {
              fontSize: theme.typography.h4.fontSize,
              fontWeight: theme.typography.h4.fontWeight,
              lineHeight: theme.typography.h4.lineHeight,
              spacing: theme.typography.h4.letterSpacing,
              margin: theme.spacing(2),
            },
            [".md-editor-html-class h4"]: {
              fontSize: theme.typography.h5.fontSize,
              fontWeight: theme.typography.h5.fontWeight,
              lineHeight: theme.typography.h5.lineHeight,
              spacing: theme.typography.h5.letterSpacing,
              margin: theme.spacing(2),
            },
            [".md-editor-html-class h5"]: {
              fontSize: theme.typography.h6.fontSize,
              fontWeight: theme.typography.h6.fontWeight,
              lineHeight: theme.typography.h6.lineHeight,
              spacing: theme.typography.h6.letterSpacing,
              margin: theme.spacing(2),
            },
            [".md-editor-html-class h6"]: {
              fontSize: theme.typography.body1.fontSize,
              fontWeight: theme.typography.h6.fontWeight,
              lineHeight: theme.typography.h6.lineHeight,
              spacing: theme.typography.h6.letterSpacing,
              margin: theme.spacing(2),
            },
            [".md-editor-html-class p"]: {
              fontSize: theme.typography.body1.fontSize,
              fontWeight: theme.typography.body1.fontWeight,
              lineHeight: theme.typography.body1.lineHeight,
              spacing: theme.typography.body1.letterSpacing,
              margin: theme.spacing(2),
            },
            [".md-editor-html-class blockquote"]: {
              background: theme.palette.background.paperSecondary,
              borderLeft: `5px solid ${theme.palette.primary.main}`,
              padding: "0.25rem 1rem",
              margin: "0.75rem 1rem",
              borderRadius: theme.shape.borderRadius,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              fontStyle: "italic",
              color: theme.palette.text.primary,
            },
            [".md-editor-html-class blockquote.twitter-tweet"]: {
              background: "none",
              borderLeft: `none`,
              padding: "none",
              margin: "none",
              borderRadius: "none",
              fontStyle: "none",
              color: "none",
              margin: "auto !important",
              textAlign: "center !important",
            },
            [".md-editor-html-class img , .md-editor-html-class video"]: {
              borderRadius: theme.shape.borderRadius,
              maxWidth: "80%",
              maxHeight: "500px",
              margin: "auto",
              textAlign: "center",
              display: "flex",
            },
            [".md-editor-html-class hr "]: {
              marginTop: theme.spacing(2),
              border: "0",
              color: "transparent",
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: `${theme.palette.text.primary} !important`,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            background: `${theme.palette.background.paper} !important`,
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: theme.palette.text.primary,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            paddingTop: 20,
            paddingBottom: 20,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: theme.palette.text.primary,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1);",
            boxShadow: "none",
            backgroundImage: "none",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            // background:theme.palette.background.paper,
            // ["&:hover"]:{
            //   background:theme.palette.background.default,
            // }
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",

          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            fontSize: "0.80rem",
            fontWeight: 700,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedInherit: {
            background:"rgba(0,0,0,0.1) !important",
            ["&:hover"]:{
              background:"rgba(0,0,0,0.8) !important",
            }
          },
          text: {
            padding: "6px 16px",
            textAlign: "left",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none !important",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            overflow: "visible !important",
            filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.1)) !important",
            marginTop: 1.5,
            borderRadius: theme.shape.borderRadius,
            "&:before": {
              content: '""',
              display: "block !important",
              position: "absolute !important",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              background: `${theme.palette.background.paper} !important`,
              transform: "translateY(-50%) rotate(45deg) !important",
              zIndex: 0,
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
      MuiFab:{
        styleOverrides:{
          primary:{
            color:"#fff"
          }
        }
      },
      MuiCheckbox:{
        styleOverrides:{
          root:{
            color:theme.palette.text.secondary
          }
        }
      },
      MuiTooltip:{
        styleOverrides:{
          arrow	:{
            color:"#fff",
          },
          tooltip:{
            background:"#eee",
            textTransform:"capitalize",
            fontWeight:700,
            borderRadius:"20px",
            boxShadow:theme.shadows[1],
            color:theme.palette.text.secondary,
            padding:"5px 12px"
          }
        }
      },
    },
  },
  theme
);

export default lightTheme;

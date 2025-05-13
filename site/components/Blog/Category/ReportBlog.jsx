import { useRouter } from 'next/router';

// Material UI Components 
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
// Material UI Icons 
import Close from '@mui/icons-material/Close'
import { DataContext } from '../../../store/GlobalState';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                ' linear-gradient(245deg,hsl(148deg 100% 36%) 0%,hsl(154deg 100% 37%) 18%,hsl(159deg 100% 39%) 35%,hsl(164deg 100% 40%) 51%,hsl(168deg 100% 41%) 63%,hsl(172deg 100% 42%) 72%,hsl(175deg 100% 43%) 80%,hsl(177deg 73% 51%) 86%,hsl(180deg 73% 58%) 91%,hsl(183deg 79% 65%) 95%,hsl(186deg 87% 72%) 98%,hsl(189deg 97% 77%) 100%);',


        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
            ' linear-gradient(245deg,hsl(148deg 100% 36%) 0%,hsl(154deg 100% 37%) 18%,hsl(159deg 100% 39%) 35%,hsl(164deg 100% 40%) 51%,hsl(168deg 100% 41%) 63%,hsl(172deg 100% 42%) 72%,hsl(175deg 100% 43%) 80%,hsl(177deg 73% 51%) 86%,hsl(180deg 73% 58%) 91%,hsl(183deg 79% 65%) 95%,hsl(186deg 87% 72%) 98%,hsl(189deg 97% 77%) 100%);',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    transition:"1s",
    ...(ownerState.active && {
        backgroundImage:
            ' linear-gradient(245deg,hsl(148deg 100% 36%) 0%,hsl(154deg 100% 37%) 18%,hsl(159deg 100% 39%) 35%,hsl(164deg 100% 40%) 51%,hsl(168deg 100% 41%) 63%,hsl(172deg 100% 42%) 72%,hsl(175deg 100% 43%) 80%,hsl(177deg 73% 51%) 86%,hsl(180deg 73% 58%) 91%,hsl(183deg 79% 65%) 95%,hsl(186deg 87% 72%) 98%,hsl(189deg 97% 77%) 100%);',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage:
            ' linear-gradient(245deg,hsl(148deg 100% 36%) 0%,hsl(154deg 100% 37%) 18%,hsl(159deg 100% 39%) 35%,hsl(164deg 100% 40%) 51%,hsl(168deg 100% 41%) 63%,hsl(172deg 100% 42%) 72%,hsl(175deg 100% 43%) 80%,hsl(177deg 73% 51%) 86%,hsl(180deg 73% 58%) 91%,hsl(183deg 79% 65%) 95%,hsl(186deg 87% 72%) 98%,hsl(189deg 97% 77%) 100%);',
    }),
}));
function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    };
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const ReportBlog = () => {
    const { state, dispatch } = React.useContext(DataContext)
    const { reportblog } = state
    const handleClose = () => dispatch({ type: "REPORT_BLOG", payload: "" })
    const handleReport = () => dispatch({ type: "REPORT_BLOG", payload: "" })

    const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    const handleSubmit = () => {

    }
      const isLastStep = () => {
        return activeStep === totalSteps() - 1;
      };
    
      const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
      };
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


    return (
        <Dialog maxWidth="xs" open={reportblog.blog && reportblog.blog._id ? true : false} onClose={handleClose} scroll="body" fullWidth>

            {/* CloseIcon  */}
            <Tooltip title="Close" arrow>
                <IconButton sx={{ position: "absolute !important", right: 8, top: 8, strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary } }} onClick={handleClose} >
                    <Close color="inherit" fontSize="small" />
                </IconButton>
            </Tooltip>

            {/* Title  */}
            <DialogTitle>Report</DialogTitle>

            {/* Content  */}
            <DialogContent sx={{ paddingBottom: 0, lineHeight: "1 !important" }}>
                {/* <Stepper alternativeLabel connector={<ColorlibConnector />} activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box> */}
            </DialogContent>

            {/* Actions  */}
            <DialogActions >
                <Button onClick={handleClose} variant="outlined">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleReport}>
                    Report
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default ReportBlog

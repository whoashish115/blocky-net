// import React from 'react'

// import Slide from '@mui/material/Slide';
// import IconButton from "@mui/material/IconButton"
// import Stack from "@mui/material/Stack"
// import Tooltip from "@mui/material/Tooltip"
// import Typography from "@mui/material/Typography"
// import Box from "@mui/material/Box"
// import Paper from "@mui/material/Paper"
// import Dialog from "@mui/material/Dialog"
// import DialogTitle from "@mui/material/DialogTitle"
// import DialogActions from "@mui/material/DialogActions"
// import DialogContent from "@mui/material/DialogContent"
// import FormControl from "@mui/material/FormControl"
// import Select from "@mui/material/Select"
// import MenuItem from "@mui/material/MenuItem"
// import Button from "@mui/material/Button"
// import Slider from "@mui/material/Slider"

// import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
// import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
// import PauseCircleOutlineOutlined from '@mui/icons-material/PauseCircleOutlineOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import Close from '@mui/icons-material/Close'

// import { useSpeechSynthesis } from 'react-speech-kit';
// import { useTheme } from '@emotion/react'

// const rateMarks = [
//     {
//         value: 0.5,
//         label: '0.5x',
//     },
//     {
//         value: 1,
//         label: '1x',
//     },
//     {
//         value: 1.5,
//         label: '1.5x',
//     },
//     {
//         value: 2,
//         label: '2x',
//     },
//     {
//         value: 2.5,
//         label: '2.5x',
//     },
//     {
//         value: 3,
//         label: '3x',
//     },
// ];

// const SpeakBlog = ({ text }) => {
//     const theme = useTheme()
//     const [speaking, setSpeaking] = React.useState(false)
//     const [rate, setRate] = React.useState(1)
//     const [pitch, setPitch] = React.useState(1)
//     const [volume, setVolume] = React.useState(1)
//     const [voiceIndex, setVoiceIndex] = React.useState(1);

//     const onEnd = () => { setSpeaking(false) };

//     const speechSynthesis = useSpeechSynthesis({ onEnd });
//     const { speak, cancel, supported, voices } = speechSynthesis;
//     const voice = voices[voiceIndex];

//     const handleCancel = () => { if (speaking) { cancel() } }

//     const [speakOpen, setSpeakOpen] = React.useState(false)
//     const handleOpen = () => setSpeakOpen(true)
//     const handleClose = () => { if (speaking) { cancel(); setSpeaking(false) }; setSpeakOpen(false); }

//     const [infoDialogOpen, setInfoDialogOpen] = React.useState(false)
//     const handleInfoDialogOpen = () => { setInfoDialogOpen(true) }
//     const handleInfoDialogClose = () => { setInfoDialogOpen(false) }

//     const [settingsDialogOpen, setSettingsDialogOpen] = React.useState(false)
//     const handleSettingsDialogOpen = () => { setSettingsDialogOpen(true) }
//     const handleSettingsDialogClose = () => { setSettingsDialogOpen(false) }

//     return (
//         <Box sx={{ display: supported ? "block" : "none" }}>

//             <Tooltip title="Listen" arrow>
//                 <IconButton onClick={speakOpen ? handleClose : handleOpen}>
//                     <PlayCircleFilledOutlinedIcon fontSize="small" />
//                 </IconButton>
//             </Tooltip>

//             <Slide direction="up" in={speakOpen} mountOnEnter unmountOnExit>
//                 <Paper sx={{ p: 0.5, background: theme.palette.background.paperSecondary, position: "fixed", left: 0,right:0, margin:'auto',width:190 ,bottom: 20, zIndex: 1}} >

//                     {/* All Buttons  */}
//                     <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                        
//                         {/* Play / Pause */}
//                         <Box>
//                             {!speaking ?
//                                 <Tooltip title="Play" arrow>
//                                     <IconButton onClick={() => { speak({ text, voice, rate, pitch, volume }); setSpeaking(true) }}>
//                                         <PlayCircleFilledWhiteOutlinedIcon fontSize="small" />
//                                     </IconButton>
//                                 </Tooltip> :
//                                 <Tooltip title="Pause" arrow>
//                                     <IconButton onClick={() => { cancel(); setSpeaking(false) }}>
//                                         <PauseCircleOutlineOutlined fontSize="small" />
//                                     </IconButton>
//                                 </Tooltip>}
//                         </Box>

//                         {/* Settings  */}
//                         <Tooltip title="Settings" arrow>
//                             <IconButton onClick={handleSettingsDialogOpen}>
//                                 <SettingsOutlinedIcon fontSize="small" />
//                             </IconButton>
//                         </Tooltip>

//                         {/* Info  */}
//                         <Box>
//                             <Tooltip title="Info" arrow>
//                                 <IconButton onClick={handleInfoDialogOpen}>
//                                     <InfoOutlinedIcon fontSize="small" />
//                                 </IconButton>
//                             </Tooltip>
//                         </Box>

//                         {/* Close Icon  */}
//                         <Box>
//                             <Tooltip title="Close" arrow>
//                                 <IconButton onClick={handleClose} sx={{ strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary } }} >
//                                     <Close color="inherit" fontSize="small" />
//                                 </IconButton>
//                             </Tooltip>
//                         </Box>

//                     </Stack>

//                 </Paper>
//             </Slide>

//             {/* Info Dialog  */}
//             <Dialog maxWidth="xs" open={infoDialogOpen} onClose={handleInfoDialogClose} scroll="body" fullWidth>

//                 {/* CloseIcon  */}
//                 <Tooltip title="Close" arrow>
//                     <IconButton sx={{ position: "absolute !important", right: 8, top: 8, strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary } }} onClick={handleInfoDialogClose} >
//                         <Close color="inherit" fontSize="small" />
//                     </IconButton>
//                 </Tooltip>

//                 {/* Title  */}
//                 <DialogTitle>Using Speech Synthesis</DialogTitle>

//                 {/* Content  */}
//                 <DialogContent sx={{ paddingBottom: 0 }}>
//                     <Typography variant="body2" color="text.secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat assumenda delectus, aliquam ipsum enim optio ducimus vitae modi labore, culpa beatae similique maiores quibusdam distinctio sed. Nam voluptate inventore doloribus ad error! Fugiat voluptatum minima alias, officia ut dignissimos. Quaerat quam vitae neque et nesciunt recusandae officia officiis ullam illum?</Typography>
//                 </DialogContent>

//                 {/* Actions  */}
//                 <DialogActions sx={{ paddingTop: 0 }}>
//                     <Button sx={{ textTransform: "uppercase" }} onClick={handleInfoDialogClose}>
//                         Ok
//                     </Button>
//                 </DialogActions>

//             </Dialog>

//             {/* Settings Dialog */}
//             <Dialog maxWidth="xs" open={settingsDialogOpen} onClose={handleSettingsDialogClose} scroll="body" fullWidth>

//                 {/* CloseIcon  */}
//                 <Tooltip title="Close" arrow>
//                     <IconButton sx={{ position: "absolute !important", right: 8, top: 8, strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary } }} onClick={handleSettingsDialogClose} >
//                         <Close color="inherit" fontSize="small" />
//                     </IconButton>
//                 </Tooltip>

//                 {/* Title  */}
//                 <DialogTitle>Settings</DialogTitle>

//                 {/* Content  */}
//                 <DialogContent sx={{ paddingBottom: 0 }}>
//                     <Stack spacing={0.5} direction="column" justifyContent="space-evenly">
//                         <FormControl fullWidth>
//                             <Select variant="filled" value={voiceIndex} inputProps={{ sx: { paddingTop: 1.5 } }} MenuProps={{ PaperProps: { sx: { ["& .MuiList-root"]: { height: "200px !important", overflow: "auto" } } } }} onChange={(event) => { setVoiceIndex(event.target.value); handleCancel() }}>
//                                 {voices.map((option, index) => (
//                                     <MenuItem key={option.voiceURI} value={index}>{`${option.lang} - ${option.name}`}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                         <Box px={1} sx={{ paddingTop: 1.5 }}>
//                             <Typography variant="subtitle2">Rate</Typography>
//                             <Slider valueLabelDisplay="auto" value={rate} onChange={e => { setRate(e.target.value); handleCancel() }} defaultValue={1.25} step={0.01} min={0.5} max={2.5} />
//                         </Box>
//                         <Box px={1}>
//                             <Typography variant="subtitle2">Pitch</Typography>
//                             <Slider valueLabelDisplay="auto" value={pitch} onChange={e => { setPitch(e.target.value); handleCancel() }} defaultValue={0.5} step={0.01} min={0.1} max={1} />
//                         </Box>
//                         <Box px={1}>
//                             <Typography variant="subtitle2">Volume</Typography>
//                             <Slider valueLabelDisplay="auto" value={volume} onChange={e => { setVolume(e.target.value); handleCancel() }} defaultValue={0.5} step={0.01} min={0.1} max={1} />
//                         </Box>
//                     </Stack>
//                 </DialogContent>

//                 {/* Actions  */}
//                 <DialogActions>
//                     <Button variant='contained' sx={{ textTransform: "uppercase" }} onClick={handleSettingsDialogClose}>
//                         Done
//                     </Button>
//                 </DialogActions>

//             </Dialog>

//         </Box>
//     )
// }

// export default SpeakBlog

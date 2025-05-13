const scrollBar = {
    track: '#f4f4f4',
    thumb: '#cfcfcf',
    active: '#bcbcbc'
};
export default function lightScrollbar(options = scrollBar) {
    return {
        scrollbarColor: `${options.thumb} ${options.track}`,
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: options.track,
            width:10,
            height:10,
            display:`${options.display}`
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: options.thumb,
            minHeight: 24,
            border: `3px solid ${options.track}`
        },
        '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: options.active
        },
        '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: options.active
        },
        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: options.active,

        },
        '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: options.track
        }
    };
}
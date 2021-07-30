export default function ToggleDarkModeButton(props) {
    return (
        <button onClick={props.onClick} className={`text-4xl duration-200 ease-in-out fixed right-1.5	top-1.5	${props.isDarkMode ? 'rotate-360' : ''}`}>{props.isDarkMode ? '🌝' : '🌚'}</button>
    )
  }
  
  
import './Button.css'

// These two arrays hold all of the styles and sizes names of the buttons from the button css
const STYLES = ['primaryBtn', 'secondaryBtn', 'button-64', 'button-78']
const SIZES = ['mediumBtn', 'largeBtn']
//Here we export the button with its own props.
export const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
	//CheckBtnStyle basically checks if we inputed a prop related to the btn style and if we didnt it will take a default style which is going to be the first entery of the STYLES array.
	const checkBtnStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
	//CheckBtnSize does the exact same thing as CheckBtnStyle but with the size.
	const checkBtnSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
	return (
		//Here we create a normal button which is dynamic, as in it can have different styles/sizes, plus any default style/size we want to choose.
		<button className={`btn ${checkBtnStyle} ${checkBtnSize}`} onClick={onClick} type={type}>
			{children}
		</button>
	)
}

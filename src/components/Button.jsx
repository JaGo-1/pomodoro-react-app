import '../styles/button.css'

const Button = ({text, className, iconStyle, onClick, icon:Icon}) => {
  return (

    <button onClick={onClick} className={className}>
      {Icon && <Icon className={iconStyle} />}
      {text}
   
    </button>
  )
}

export default Button
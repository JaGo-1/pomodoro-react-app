import '../styles/button.css'
const Button = ({text, img, size, onClick}) => {
  return (

    <button onClick={onClick} className={`btn gaegu-regular ${size ? `btn-${size}` : ''}`}>{text}
    <img src={img} alt="" />
    </button>
  )
}

export default Button
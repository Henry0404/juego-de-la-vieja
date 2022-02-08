import classNames from "classnames";
import "./Square.css";
const Square = ({ value, onClick, turno, winner }) => {
  const handleClick = () => {
    turno !== null && value === null && onClick();
  };

  let squareClass = classNames({
    square: true,
    [`square--${value}`]: value !== null,
    winner: winner,
  });

  return <div className={squareClass} onClick={() => handleClick()}></div>;
};
export default Square;

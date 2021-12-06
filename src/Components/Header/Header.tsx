import "./Header.scss";

const Header = () => {
  return (
    <div className="Header_top" onClick={() => window.scroll(0, 0)}>
      <h1>Movies&Fun</h1>
    </div>
  );
};

export default Header;

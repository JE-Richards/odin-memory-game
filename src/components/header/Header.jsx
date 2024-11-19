import './styles/Header.css';

export default function Header(props) {
  const { title, rules, scoreboard } = props;

  return (
    <header className="header">
      <div className="header--container">
        <div className="info">
          <h1 className="info__title">{title}</h1>
          <div className="info__rules">{rules}</div>
        </div>
        {scoreboard}
      </div>
    </header>
  );
}

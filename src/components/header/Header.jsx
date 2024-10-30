import './styles/Header.css';

export default function Header(props) {
  const { title, rules, scoreboard } = props;

  return (
    <header className="header">
      <div className="info">
        <h1 className="info__title">{title}</h1>
        <p className="info__rules">{rules}</p>
      </div>
      {scoreboard}
    </header>
  );
}

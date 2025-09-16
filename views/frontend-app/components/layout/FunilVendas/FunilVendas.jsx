export default function FunilVendas({ cards }) {
  const coresFunil = [
    "#2A49EB",
    "#3366F0",
    "#4686F5",
    "#5AA6FA",
    "#6DC6FF",
    "#87DBFF",
    "#9EEFFF",
    "#B6FFFF"
  ];

  const contagens = [];

  Object.entries(cards).forEach(([coluna, cardsObj]) => {
    Object.entries(cardsObj).forEach(([cardKey, clientes]) => {
      contagens.push({
        nome: cardKey,
        qtd: clientes.length
      });
    });
  });

  contagens.sort((a, b) => b.qtd - a.qtd);
  const maxQtd = Math.max(...contagens.map((c) => c.qtd), 1);

  return (
    <div className="funil-bars" style={{ marginTop: "2rem" }}>
      {contagens.map((c, index) => (
        <div
          key={index}
          className="funnel-bar"
          style={{
            width: `${(c.qtd / maxQtd) * 100}%`,
            backgroundColor: coresFunil[index] || "#B6FFFF",
            marginBottom: "8px",
            padding: "6px",
            color: "#fff",
            borderRadius: "4px",
            transition: "width 0.3s"
          }}
        >
          {c.nome} <span style={{ float: "right" }}>{c.qtd}</span>
        </div>
      ))}
    </div>
  );
}

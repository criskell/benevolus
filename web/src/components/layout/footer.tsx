const sobreListLinks = [
  { link: "#", text: "Quem somos" },
  { link: "#", text: "Como funciona" },
  { link: "#", text: "Termos de uso" },
];

const suporteListLinks = [
  { link: "#", text: "Central de ajuda" },
  { link: "#", text: "Contato" },
  { link: "#", text: "FAQ" },
];

const socialListLinks = [
  { link: "#", text: "Facebook" },
  { link: "#", text: "Instagram" },
  { link: "#", text: "Twitter" },
];

export const Footer = () => {
  return (
    <footer className="bg-default-50 py-8 text-sm">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre</h3>
            <ul className="space-y-1">
              {sobreListLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>{item.text}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-1">
              {suporteListLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>{item.text}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes sociais</h3>
            <ul className="space-y-1">
              {socialListLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="mt-4">
            &copy; {new Date().getFullYear()} Benevolus. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-default-50 py-8 text-sm">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre</h3>
            <ul className="space-y-1">
              <li>
                <a href="#">Quem somos</a>
              </li>
              <li>
                <a href="#">Como funciona</a>
              </li>
              <li>
                <a href="#">Termos de uso</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-1">
              <li>
                <a href="#">Central de ajuda</a>
              </li>
              <li>
                <a href="#">Contato</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes sociais</h3>
            <ul className="space-y-1">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="mt-4">
            &copy; {new Date().getFullYear()} Benevolus. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

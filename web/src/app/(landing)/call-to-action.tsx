import { Button } from "@heroui/button";

export const CallToAction = () => {
  return (
    <section className="py-20 border border-default-100 bg-white text-zinc-800">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Conte sua história</h2>
          <p className="text-lg mb-6">
            Receba contribuição da nossa comunidade
          </p>
          <Button size="lg" color="primary">
            Crie sua campanha
          </Button>
        </div>
      </div>
    </section>
  );
};

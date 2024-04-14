const HomePage = () => {
  return (
    <div className="bg-[url(https://i.pinimg.com/736x/9e/ed/2d/9eed2d1815cfd2343c8397d9303d93c7.jpg)] bg-cover min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenue à notre hôtel</h1>
        <p className="text-lg text-gray-700 mb-8">
          {"Découvrez le comfort et l'hospitalité dans notre hôtel de luxe."}
        </p>
        <a
          href="/chambre"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
        >
          Découvrir nos chambres
        </a>
      </div>
    </div>
  );
};

export default HomePage;

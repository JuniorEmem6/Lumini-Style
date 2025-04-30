import Header from "../components/Header";

const Home = () => {
    return (
        <div className="min-h-screen bg-light">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-dark mb-6">Welcome to LuminaStyle</h1>
            <p className="text-gray-600">Your premium fashion destination.</p>
          </main>
        </div>
      );
};
export default Home;

const Footer = () => {
  return (
    // <footer className="wow fadeInUp relative z-10 bg-[#090E34] pt-20 lg:pt-[100px]" data-wow-delay=".15s">
    //   Footer test
    // </footer>
    <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">&copy; 2023 AI NFT NeuroArt. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">
            Terms
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Privacy
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

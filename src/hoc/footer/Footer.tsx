const Footer = () => {
  return (
    <footer className="py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-[#A2A2A2] text-sm">
        <p>© {new Date().getFullYear()} Fee Letter Generator. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

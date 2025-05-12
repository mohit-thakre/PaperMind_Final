import { Twitter, Facebook, Youtube, Linkedin, Github } from "lucide-react";
import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-around mb-8 pt-24">
        <div className="mb-6 md:mb-0 flex gap-2 items-start justify-center">
          <div className=" p-2 rounded-xl text-2xl bg-violet-600 w-fit shadow-2xl shadow-violet-600 border-purple-400 border-2 duration-500  ">
            <FileText size="24" className=" text-white" />
          </div>
          <h1 className="font-bold text-2xl">PaperMind</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-8 mx-auto md:mx-5 lg:gap-14 xl:gap-16 mb-3">
          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-semibold mb-1">About Us</h3>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Our Story
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Leadership
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Careers
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Press
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-semibold mb-1">Services</h3>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Consulting
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Development
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Design
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Support
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-semibold mb-1">Resources</h3>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Blog
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Webinars
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Case Studies
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Documentation
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-white font-semibold mb-1">Contact Us</h3>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Sales
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Support
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              General Inquiries
            </a>
            <a href="#" className="text-white/80 hover:text-purple-600 text-sm">
              Feedback
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row pt-2 pb-8 items-center justify-center space-y-4 md:space-y-0 md:justify-around">
        <div className="text-sm text-white">
          © 2025 <span className="font-medium">PaperMind</span>, Inc.
        </div>
        <div className="flex space-x-4 md:space-x-6">
          <a
            href="https://x.com"
            className="text-white/80 hover:text-purple-600 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://facebook.com"
            className="text-white/80 hover:text-purple-600 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://youtube.com"
            className="text-white/80 hover:text-purple-600 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube size={20} />
          </a>
          <a
            href="https://linkedin.com/in"
            className="text-white/80 hover:text-purple-600 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/Abinanthan47"
            className="text-white/80 hover:text-purple-600 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;

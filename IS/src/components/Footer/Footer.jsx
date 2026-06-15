import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t">

      <div className="container-custom py-20">

        <div className="grid lg:grid-cols-5 gap-12">

          <div>
            <h2 className="text-3xl font-bold text-blue-600">
              NexaCore
            </h2>

            <p className="text-gray-600 mt-4">
              Building innovative digital solutions
              that drive growth and create lasting
              impact.
            </p>

            <div className="flex gap-4 mt-6">

              <FaGithub size={22} />
              <FaLinkedin size={22} />
              <FaTwitter size={22} />
              <FaYoutube size={22} />

            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">
              Company
            </h4>

            <ul className="space-y-3 text-gray-600">
              <li>About Us</li>
              <li>Careers</li>
              <li>Our Team</li>
              <li>News & Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">
              Services
            </h4>

            <ul className="space-y-3 text-gray-600">
              <li>Web Development</li>
              <li>Mobile Development</li>
              <li>Cloud Solutions</li>
              <li>Data Analytics</li>
              <li>Cybersecurity</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">
              Resources
            </h4>

            <ul className="space-y-3 text-gray-600">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Guides</li>
              <li>Community</li>
              <li>Support</li>
            </ul>
          </div>

          <div>

            <h4 className="font-bold mb-4">
              Stay Updated
            </h4>

            <div className="flex">

              <input
                type="email"
                placeholder="Enter your email"
                className="border rounded-l-xl px-4 py-3 w-full"
              />

              <button className="bg-blue-600 text-white px-4 rounded-r-xl">
                <FaPaperPlane />
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t py-6 text-center text-gray-500">
        © 2026 NexaCore. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;